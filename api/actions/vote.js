const isEmpty = value => value === undefined || value === null || value === '';
import r from '../db';

export default function vote(req) {
  return new Promise((resolve, reject) => {
    if (isEmpty(req.body.songname) || isEmpty(req.body.vote)) {
      reject("empty fields");
    }
    let like = 0;
    let dislike = 0;
    if (req.body.vote === 'like') {
      like = 1;
    } else if (req.body.vote === 'dislike') {
      dislike = 1;
    }

    console.log("VOTING FOR: '" + req.body.songname + "' AND VOTE IS: '" + req.body.vote + "'");

    r.table('song_ratings').filter({songname: req.body.songname}).limit(1).run().then((result) =>
    {
      if (result.length > 0) {
        r.table('song_ratings').filter({songname: req.body.songname}).update({
          dislike: r.row('dislike').add(dislike).default(0),
          like: r.row('like').add(like).default(0)
        }).run().then((result) =>
        {
          resolve();
        }).error((err) => {
          console.log(err)
        });
      } else {
        r.table('song_ratings').insert({
          songname: req.body.songname,
          dislike: dislike,
          like: like
        }).run().then((result) => {
          resolve();
        });
      }
    }).error((err) => {
      console.log(err);
    });
  });
}
