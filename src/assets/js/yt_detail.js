const request = require("request");
const cordova_request = require("./cordova/request")

export default (video_id) => {
    return new Promise((resolve, reject) => {
        try {
            cordova_request(
                `http://www.youtube.com/get_video_info?html5=1&video_id=${video_id}&el=detailpage`,
                (err, res, dat) => {
                    if (!err) {
                        const bodyParams = new URLSearchParams(dat);
                        let rest = {};
                        for (let key of bodyParams.keys()) {
                            if (key == 'player_response') rest[key] = JSON.parse(bodyParams.get(key).toString());
                            else if (key == 'rvs' || key == 'url_encoded_fmt_stream_map' || key == 'fflags' || key == 'adaptive_fmts')
                            rest[key] = all_params(bodyParams.get(key).toString());
                            else if (key == 'fexp') rest[key] = bodyParams.get(key).toString().split(',');
                            else if (!(key == 'title' || key == 'author' || key == 'thumbnail_url')) 
                            rest[key] = bodyParams.get(key).toString();
                        }
                        resolve({
                            title: bodyParams.get("title"),
                            channel: bodyParams.get("author"),
                            thumb: bodyParams.get("thumbnail_url"),
                            rest: rest
                        });
                    } else reject(err);
                }
            );
        } catch (e) {
            request(
                `http://www.youtube.com/get_video_info?html5=1&video_id=${video_id}&el=detailpage`,
                (err, res, dat) => {
                    if (!err) {
                        const bodyParams = new URLSearchParams(dat);
                        let rest = {};
                        for (let key of bodyParams.keys()) {
                            if (key == 'player_response') rest[key] = JSON.parse(bodyParams.get(key).toString());
                            else if (key == 'rvs' || key == 'url_encoded_fmt_stream_map' || key == 'fflags' || key == 'adaptive_fmts')
                            rest[key] = all_params(bodyParams.get(key).toString());
                            else if (key == 'fexp') rest[key] = bodyParams.get(key).toString().split(',');
                            else if (!(key == 'title' || key == 'author' || key == 'thumbnail_url')) 
                            rest[key] = bodyParams.get(key).toString();
                        }
                        resolve({
                            title: bodyParams.get("title"),
                            channel: bodyParams.get("author"),
                            thumb: bodyParams.get("thumbnail_url"),
                            rest: rest
                        });
                    } else reject(err);
                }
            ).on("error", (err) => { reject(err); })
        }
    })
}

function all_params(raw_params) {
    let params = new URLSearchParams(raw_params)
    let output = {};
    for (let key of params.keys()) {
        switch (key) {
            default: {
                output[key] = params.get(key);
            }
        }
    }
    return output;
}