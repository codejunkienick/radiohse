const isEmpty = value => value === undefined || value === null || value === '';
import r from '../db';

export default function vote(req) {
  return new Promise((resolve, reject) => {
    console.log(req.body);
    if (isEmpty(req.body.songname) || isEmpty(req.body.vote)) {
      reject("empty fields");
    }

    let vote = 0;
    if (req.body.vote === 'like') {
      vote = 1;
    } else if (req.body.vote === 'dislike') {
      vote = -1;
    }

    console.log("VOTING FOR: '" + req.body.songname + "' AND VOTE IS: '" + req.body.vote + "'");

    r.table('song_ratings').filter({songname: req.body.songname}).limit(1).run().then((result) =>
    {
      if (result.length > 0) {
        r.table('song_ratings').filter({songname: req.body.songname}).update({score: r.row('score').add(vote).default(0)}).run().then((result) =>
        {
          resolve();
        }).error((err) => {
          console.log(err)
        });
      } else {
        r.table('song_ratings').insert({songname: req.body.songname, score: vote}).run().then((result) => {
          resolve();
        });
      }
    }).error((err) => {
      console.log(err);
    });
  });
}
