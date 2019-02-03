import MobileDetect from "mobile-detect";
let device = new MobileDetect;
const request = require("request");
const br = (opts, c) => request(opts, (err, r, body) => {
  if (e !== null) throw e;
  c(body)
})

export default (id, callback) => {
  /*  if (device.phone() == null) {
      br({
        method: 'GET',
        qs: {
          html5: '1',
          video_id: id
        },
        url: 'http://www.youtube.com/get_video_info',
        jar: 'JAR'
      }, body => {
        console.warn(error)
        callback(link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(body)[1])))[0].streamingData.adaptiveFormats)
      });
    } else */
  cordova.plugin.http.sendRequest("http://www.youtube.com/get_video_info?html5=1&video_id=ojCkgU5XGdg", {
    method: 'get'
  }, r => {
    console.log(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(r.data)[1])))
    const l = link(JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(r.data)[1])).streamingData.adaptiveFormats)
    console.log(l)
    callback(l);
  }, (r) => {
    console.error(r.error);
  });
}

function link(ᴀᴅᴀᴩᴛɪᴠᴇ) {
  let ᴀᴅᴀᴩᴛɪᴠᴇᴀᴜᴅɪᴏ = [],
    i = 0;
  for (; i < ᴀᴅᴀᴩᴛɪᴠᴇ.length; i++) {
    const mimeType = ᴀᴅᴀᴩᴛɪᴠᴇ[i].mimeType.split(';')[0].split('/');
    if (mimeType[0] === 'audio' && mimeType[1] === "webm") {
      ᴀᴅᴀᴩᴛɪᴠᴇᴀᴜᴅɪᴏ.push(ᴀᴅᴀᴩᴛɪᴠᴇ[i]);
      console.log(ᴀᴅᴀᴩᴛɪᴠᴇᴀᴜᴅɪᴏ)
    }
  }
  ᴀᴅᴀᴩᴛɪᴠᴇᴀᴜᴅɪᴏ.sort((a, b) => {
    return parseInt(b.contentLength) - parseInt(a.contentLength);
  });
  return ᴀᴅᴀᴩᴛɪᴠᴇᴀᴜᴅɪᴏ;
}
