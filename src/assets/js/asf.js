import MobileDetect from "mobile-detect";
var request = require("http").request;
let device = new MobileDetect;
export default (id) => {
  if (device.phone() == null) {
    request({
      "method": "GET",
      "hostname": "www.youtube.com",
      "port": null,
      path: "/get_video_info?html5=1&video_id=" + id,
      "headers": {
        "content-length": "0",
        "x-frame-options": ""
      }
    }, res => {
      var chunks = [];
    });
  } else cordova.plugin.http.sendRequest("http://www.youtube.com/get_video_info?html5=1&video_id=ojCkgU5XGdg", {
    method: 'get'
  }, (response) => {
    const json = /(?:player_response=)(.*?)(?:&|$)/i.exec(response.data)[1]
    return createLinks(JSON.parse(decodeURIComponent(json)));
  }, (response) => {
    console.error(response.error);
  });
}

function createLinks(json) {
  const adaptive = json.streamingData.adaptiveFormats,
    adaptiveAudio = [];
  let i = 0;
  for (; i < adaptive.length; i++) {
    if (adaptive[i].mimeType.split(';')[0].split('/')[0] === 'audio') {
      adaptiveAudio.push(adaptive[i]);
    }
  }
  adaptiveAudio.sort((a, b) => {
    return parseInt(b.contentLength) - parseInt(a.contentLength);
  });
  console.log(adaptiveAudio)
  return adaptiveAudio;
}
