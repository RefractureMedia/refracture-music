const request = require("request");
const br = (opts, c) => request(opts, (err, r, body) => {
  if (e !== null) throw e;
  c(body)
})

export default (id, callback) => {
  try {
    cordova.plugin.http.sendRequest(`http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`, {
      method: 'get',
      headers: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      }
    }, r => {
      const l = link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(r.data)[1])).streamingData.adaptiveFormats)
      callback(l);
    }, (r) => {
      console.error(r.error);
    });
  } catch (e) {
    br({
      method: 'GET',
      qs: {
        html5: '1',
        video_id: id
      },
      url: 'http://www.youtube.com/get_video_info'
    }, body => {
      console.warn(error)
      callback(link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(body)[1])))[0].streamingData.adaptiveFormats)
    });
  }

}

function link(adapt) {
  let srcs = [],
    i = 0;
  for (; i < adapt.length; i++)
    if (adapt[i].mimeType.split(';')[0].split('/')[0] === 'audio') srcs.push(adapt[i]);
  srcs.sort((a, b) => {
    return parseInt(b.contentLength) - parseInt(a.contentLength);
  });
  return srcs;
}
