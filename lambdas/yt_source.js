const http = require("http");
const {
  URLSearchParams
} = require('url');
global.URLSearchParams = URLSearchParams;

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    http.get(
      `http://www.youtube.com/get_video_info?html5=1&video_id=${event.queryStringParameters.id}&el=detailpage`, {},
      (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        let foo = false;
        if (foo) {
          reject("foo bar");
        }
        res.on('end', () => {
          if (res.complete) {
            const bodyParams = new URLSearchParams(data);
            let links = getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats);
            resolve(
              {
                statusCode: 200,
                body: JSON.stringify({
                  title: bodyParams.get("title"),
                  channel: bodyParams.get("author"),
                  thumb: bodyParams.get("thumbnail_url"),
                  links: links
                })
              }
            );
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  })
}

function getLinks(adapt_formats) {
    let srcs = [],
        i = 0;
    for (; i < adapt_formats.length; i++)
        if (adapt_formats[i].mimeType.split(';')[0].split('/')[0] === 'audio') srcs.push(adapt_formats[i]);
    srcs.sort((a, b) => {
        return parseInt(b.contentLength) - parseInt(a.contentLength);
    });
    return srcs;
}