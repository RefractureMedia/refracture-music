const request = require("request");

export default (id, callback) => {
  try {
    cordova.plugin.http.sendRequest(`http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`, {
      method: 'get',
      headers: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      }
    }, response => {
      const bodyParams = new URLSearchParams(response.data);
      callback({
        title: bodyParams.get("title"),
        channel: bodyParams.get("author"),
        thumb: bodyParams.get("thumbnail_url"),
        links: getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
      });
    }, error_response => {
      throw new Error(error_response.error);
    });
  } catch (e) {
    request(`http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`, 
    (err, res, body) => {
      if (err) console.warn(err)
      const bodyParams = new URLSearchParams(body);
      callback({
        title: bodyParams.get("title"),
        channel: bodyParams.get("author"),
        thumb: bodyParams.get("thumbnail_url"),
        links: getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
      });
    });
  }

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