require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import icecast from 'icecast';
import devnull from 'dev-null';
import { initDatabase } from './db';
import schedule from 'node-schedule';

initDatabase();

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'asdkhafu918hjakkjhds8d<F8>a7yshajk',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

app.use((req, res) => {

  const matcher = req.url.split('?')[0].split('/').slice(1);

  let action = false;
  let params = null;
  let apiActions = actions;
  let sliceIndex = 0;


  for (const actionName of matcher) {

    if (apiActions[actionName]) {
      action = apiActions[actionName];
    }

    if (typeof action === 'function') {
      params = matcher.slice(++sliceIndex);
      break;
    }
    apiActions = action;
    ++sliceIndex;
  }

  if (action && typeof action === 'function') {
    action(req, params)
      .then((result) => {
        res.json(result);
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

io.sockets.emit('releaseSite', false);

let onair = false;
var cron = schedule.scheduleJob('*/1 * * * *', function(){


    if(!onair) {
    
      let req = icecast.get('http://40.127.181.21/live', function (res) {

        console.log("STREAM STATUS: " + res.statusCode);

        res.on('metadata', function (metadata) {
          let meta = icecast.parse(metadata);
          if (res.statusCode !== 200) {
            onair = false;
            console.log("OFF AIR");
            io.sockets.emit('playermeta', false);
          }
            io.sockets.emit('playermeta', meta);
          if (Object.keys(meta).length > 0 && res.statusCode === 200) {
            onair = true;
            io.sockets.emit('playermeta', meta);
          } else {
            io.sockets.emit('playermeta', meta);
            onair = false;
          }
        });

        if (res.statusCode === 200) {
          res.pipe(devnull());
          onair = true;
        }

        res.on('error', function(err) {
            onair = false;
        });

      }).on('error', function(err) {
        console.log("STREAM SERVER ERROR: " + err);
        onair = false;
      });

    }
});


if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://localhost:%s', config.apiPort);
  });

  let meta = {};

  io.on('connection', (socket) => {


    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
