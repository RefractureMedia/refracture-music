const {
    ipcRenderer
} = require('electron')
document.addEventListener("DOMContentLoaded", (event) => {
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
        const details = json.videoDetails,
            formats = json.streamingData.formats,
            adaptive = json.streamingData.adaptiveFormats,
            adaptiveAudio = [];
        let row, target, i = 0;
        for (; i < adaptive.length; i++) {
            if (adaptive[i].mimeType.split(';')[0].split('/')[0] === 'audio') {
                adaptiveAudio.push(adaptive[i]);
            }
        }
        adaptiveAudio.sort((a, b) => {
            return parseInt(b.contentLength) - parseInt(a.contentLength);
        });
        formats.sort((a, b) => {
            return parseInt(b.contentLength) - parseInt(a.contentLength);
        });
        ipcRenderer.sendToHost(adaptiveAudio)
    }
})