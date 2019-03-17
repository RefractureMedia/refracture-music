const request = require("request");

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
      throw new Error(r.error);
    });
  } catch (e) {
    request(`http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`, function (error, response, body) {
      console.warn(error)
      callback(link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(body)[1])).streamingData.adaptiveFormats))
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