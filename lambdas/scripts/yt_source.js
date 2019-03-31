const request = require("request");
const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        request(
            `http://www.youtube.com/get_video_info?html5=1&video_id=${event.queryStringParameters.vid}&el=detailpage`,
            (err, res, dat) => {
                if (!err) {
                    console.log(dat);
                    const bodyParams = new URLSearchParams(dat);
                    let sources = getSources(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats);
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": '*'
                        },
                        body: JSON.stringify({
                            title: bodyParams.get("title"),
                            channel: bodyParams.get("author"),
                            thumb: bodyParams.get("thumbnail_url"),
                            sources: sources
                        })
                    });
                } else {
                    console.log(err.message);
                    reject(err.message);
                }
            }
        ).on("error", (err) => {
            reject(err.message);
        });
    })
}

function getSources(formats) {
    let sources = [];
    for (let format of formats) {
        let mime = format.mimeType.split('; ') // input ie "audio/webm; codecs=\"opus\""
        let type = mime[0].split('/');
        let codec = mime[1].split('"')[1].replace("mp4a.40.2", 'aac')

        if (type[0] === 'audio') {
            sources.push({
                details: {
                    date: new Date(),
                    bitrate: parseInt(format.bitrate),
                    duration: parseInt(format.approxDurationMs),
                    format: type[1],
                    codec: codec
                },
                url: format.url
            });
        }
    }
    sources.sort((a, b) => {
        return parseInt(b.details.bitrate) - parseInt(a.details.bitrate);
    });
    console.log(sources);
    return sources;
}
