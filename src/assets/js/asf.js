import * as request from "request";
export default async function main(ytId) {
  try {
    request.get(`https://www.youtube.com/get_video_info?video_id=${ytId}&el=detailpage`, (e, r, b) => createLinks(parseData(b)))
  } catch (e) {
    console.error(e)
  }
}

function parseData(data) {
  console.log(data)
  const captured = /(?:player_response=)(.*?)(?:&|$)/i.exec(data)[1];
  const json = JSON.parse(decodeURIComponent(captured));
  console.log(json)
  return json;
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
}
