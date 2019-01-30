var request = require("http").request;

export default function fetch(id) {
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
      const ad = JSON.parse(decodeURIComponent(/(?:player_response=)(.*?)(?:&|$)/i.exec(Buffer.concat(chunks).toString())[1])),
        aa = [];
      for (let i = 0; i < ad.length; i++)
        if (ad[i].mimeType.split(';')[0].split('/')[0] === 'audio') aa.push(ad[i]);
      console.log(aa);
    })
  }).end();
}

fetch('NLaLsNkaEq8')
