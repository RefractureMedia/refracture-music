const request = require("request");

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