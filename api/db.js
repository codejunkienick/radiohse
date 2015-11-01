var r = require("rethinkdbdash")({
  db: 'radiohse',
});

export function initDatabase() {
  r.tableList().run().then((result) => {
    if (result.indexOf('song_ratings') < 0) {
      r.tableCreate('song_ratings').run().then((result) => {
        r.table('song_ratings').indexCreate('songname').run();
      });
    }
  });
}

export default r;
