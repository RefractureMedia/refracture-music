import MobileDetect from "mobile-detect";
let device = new MobileDetect;
export default (id, callback) => {
  if (device.phone() == null) {
    var request = require("request");

    var jar = request.jar();
    jar.setCookie(request.cookie("YSC=7Mn-o8U-ARo"), "http://www.youtube.com/get_video_info");
    jar.setCookie(request.cookie("VISITOR_INFO1_LIVE=cRemP6ZbLlo"), "http://www.youtube.com/get_video_info");

    var options = {
      method: 'GET',
      url: 'http://www.youtube.com/get_video_info',
      qs: {
        html5: '1',
        video_id: id
      },
      jar: 'JAR'
    };

    request(options, function (error, response, body) {
      console.warn(error)
      const ad = JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(body)[1]))
      callback(createLinks(ad)[0])
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
  return adaptiveAudio;
}
