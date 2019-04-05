const zipdir = require("zip-dir");

zipdir('scripts/yt_search', { saveTo: 'yt_search.zip' }, function (err, buffer) {
    // `buffer` is the buffer of the zipped file
    // And the buffer was saved to `~/myzip.zip`
  });

zipdir('scripts/yt_source', { saveTo: 'yt_source.zip' }, function (err, buffer) {
    // `buffer` is the buffer of the zipped file
    // And the buffer was saved to `~/myzip.zip`
  });
zipdir('scripts/cors', { saveTo: 'cors.zip' }, function (err, buffer) {
  // `buffer` is the buffer of the zipped file
  // And the buffer was saved to `~/myzip.zip`
});