const request = require("request");
const cordova_request = require("./cordova/request")

export default (id, callback) => {
    try {
        cordova_request(
            `http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`,
            (err, res, dat) => {
                if (err) throw new Error(err);
                else {
                    const bodyParams = new URLSearchParams(dat);
                    callback({
                        title: bodyParams.get("title"),
                        channel: bodyParams.get("author"),
                        thumb: bodyParams.get("thumbnail_url"),
                        links: getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                    });
                }
            }
        );
    } catch (e) {
        request(
            `http://www.youtube.com/get_video_info?html5=1&video_id=${id}&el=detailpage`,
            (err, res, body) => {
                if (err) console.warn(err)
                else {
                    const bodyParams = new URLSearchParams(body);
                    callback({
                        title: bodyParams.get("title"),
                        channel: bodyParams.get("author"),
                        thumb: bodyParams.get("thumbnail_url"),
                        links: getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                    });
                }
            }
        );
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