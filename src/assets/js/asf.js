const request = require("http").request;

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
    request({
      "method": "GET",
      "hostname": "www.youtube.com",
      "port": null,
      path: "/get_video_info?html5=1&video_id=" + id,
      "headers": {
        "content-length": "0",
        "x-frame-options": "SAMEORIGIN"
      }
    }, res => {
      var chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => {
        callback(link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(body)[1])))[0].streamingData.adaptiveFormats)
      })
    }).end();
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
