const request = require("request");
const cordova_request = require("./cordova/request")

export default (id, callback) => {
    try {
        cordova_request(
            `http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`,
            (err, res, dat) => {
                if (err) console.log(err);
                else {
                    const bodyParams = new URLSearchParams(dat);
                    callback({
                        title: bodyParams.get("title"),
                        channel: bodyParams.get("author"),
                        thumb: bodyParams.get("thumbnail_url"),
                        sources: getSources(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                    });
                }
            }
        );
    } catch (e) {
        request(
            `http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`,
            (err, res, dat) => {
                if (!err) {
                    const bodyParams = new URLSearchParams(dat);
                    callback({
                        title: bodyParams.get("title"),
                        channel: bodyParams.get("author"),
                        thumb: bodyParams.get("thumbnail_url"),
                        sources: getSources(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                    });
                } else {
                    cors();
                }
            }
        ).on("error", (err) => {})

        function cors() {
            request(
                `https://cthh3ab7y4.execute-api.us-east-2.amazonaws.com/default/cors?request=${encodeURIComponent(JSON.stringify({url:`http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`}))}`,
                (err, res, dat) => {
                    if (err) console.warn(err);
                    else {
                        const bodyParams = new URLSearchParams(dat);
                        callback({
                            title: bodyParams.get("title"),
                            channel: bodyParams.get("author"),
                            thumb: bodyParams.get("thumbnail_url"),
                            sources: getSources(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                        });
                    }
                }
            )
        }
    }
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