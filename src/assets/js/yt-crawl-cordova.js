// foo bar
var cheerio = require('cheerio');
var Promise = require('bluebird');

export default function (query) {
  return new Promise(function (resolve, reject) {
    cordova.plugin.http.sendRequest(`https://www.youtube.com/results?search_query=${query}`, {
      method: 'get',
      headers: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      }
    }, function (res) {
      var data = res;
      var results = [];

      var $ = cheerio.load(data);
      var videos = $('.yt-lockup-video');

      for (i = 0; i < videos.length; i++) {
        var uri = $(videos[i]).find('.yt-uix-sessionlink').attr('href');
        if (!uri.startsWith('/watch')) {
          continue;
        }

        results.push({
          title: $(videos[i]).find('.yt-lockup-title a').text(),
          uri: 'https://youtube.com' + uri
        });
      }

      resolve(results);
    });
  }, (r) => {
    throw new Error(r.error);
  });
};
