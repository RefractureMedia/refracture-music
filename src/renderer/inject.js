const {
  ipcRenderer
} = require('electron')
document.addEventListener("DOMContentLoaded", function (event) {
ipcRenderer.on('ping', () => {
  let currURL = window.location.href,
    prevURL = '';
  setInterval(checkURL, 250);

  function checkURL() {
    // Current URL.
    currURL = window.location.href;
    // Has it changed?
    if (prevURL !== currURL) {
      prevURL = window.location.href;
      main();
    }
  }

  async function main() {
    try {
      const videoID = /(?:\?v=)(.*?)(?:&|$)/i.exec(window.location.search)[1],
        response = await fetch(`https://www.youtube.com/get_video_info?video_id=${videoID}&el=detailpage`, {
          method: 'GET'
        }),
        data = await response.text(),
        json = parseData(data);
      createLinks(json);
    } catch (e) {
      ipcRenderer.sendToHost([])
    }
  }

  function parseData(data) {
    const captured = /(?:player_response=)(.*?)(?:&|$)/i.exec(data)[1],
      json = JSON.parse(decodeURIComponent(captured));

    return json;
  }
  async function createLinks(json) {
    // Store video details.
    const details = json.videoDetails,
      // Store the combined video formats.
      formats = json.streamingData.formats,
      // Store the seperate video & audio formats.
      adaptive = json.streamingData.adaptiveFormats,
      // Store Audio only.
      adaptiveAudio = [];

    let row, target, i = 0;
    // Loops through the adaptive array and stores the audio and video links seperately.
    for (; i < adaptive.length; i++) {
      if (adaptive[i].mimeType.split(';')[0].split('/')[0] === 'audio') {
        // Send to Audio only array.
        adaptiveAudio.push(adaptive[i]);
      }
    }
    // Sorts the "adaptiveAudio" array by content length (filesize)
    adaptiveAudio.sort((a, b) => {
      return parseInt(b.contentLength) - parseInt(a.contentLength);
    });
    ipcRenderer.sendToHost(adaptiveAudio)
    // Sorts the "formats" array by content length (filesize)
    formats.sort((a, b) => {
      return parseInt(b.contentLength) - parseInt(a.contentLength);
    });

    /*
        Loop through the previously made, now sorted arrays and display the required infomation.
    */

  } 

})})