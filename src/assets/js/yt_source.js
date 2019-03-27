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
            (err, res, dat) => {
                if (!err) {
                    const bodyParams = new URLSearchParams(dat);
                    callback({
                        title: bodyParams.get("title"),
                        channel: bodyParams.get("author"),
                        thumb: bodyParams.get("thumbnail_url"),
                        links: getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats)
                    });
                } else {
                    runkit();
                }
            }
        ).on("error", (err) => {})

        function runkit() {
            request(
                `https://runkit.io/mulverinex/5c96a410d40f090012f926b5/branches/master?vid=${id}`,
                (err, res, dat) => {
                    if (err) console.warn(err);
                    else callback(JSON.parse(dat).result); // Runkit has copy of getLinks employed
                }
            )
        }
    }
}

exports.handler = (event, context, callback) => {
    request(
        `http://www.youtube.com/get_video_info?html5=1&video_id=${event.queryStringParameters.id}&el=detailpage`,
        (err, res, dat) => {
            if (err) {
                console.log(err);
                callback(null, { statusCode: 404, body: "Failed"})
            }
            else {
                const bodyParams = new URLSearchParams(dat);
                let links = getLinks(JSON.parse(bodyParams.get("player_response")).streamingData.adaptiveFormats);
                callback(null, { statusCode: 200, body: JSON.stringify({
                    title: bodyParams.get("title"),
                    channel: bodyParams.get("author"),
                    thumb: bodyParams.get("thumbnail_url"),
                    links: links
                }) });
                
            }
        }
    )
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