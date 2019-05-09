const request = require("request");
const he = require("he");
const cordova_request = require("./cordova/request.js")

export default (search_query, callback) => {
    try {
        cordova_request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) console.log(err);
                else callback(getResults(dat));
            }
        );
    } catch (e) {
        request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) console.warn(err);
                else {
                    callback(getResults(dat));
                }
            }
        ).on("error", (err) => {})
    }
}

function getResults(data) {
    let content = JSON.parse(data)[1].body.content; // Path to Results HTML YouTube API gives to renderer
    let results = [];

    for (let id of content.split('data-context-item-id="').slice(1)) {
        let title = content.split(`data-context-item-id="${id.split('"')[0]}"`)[1].split('" rel="spf-prefetch"')[0].split('title="').slice(-1).pop();
        title = title.includes('" aria-describedby="description-id-') ? title.split('" aria-describedby="description-id-')[0] : title;

        results.push({
            id: id.split('"')[0],
            title: he.decode(title),
            ...getMoreInfo(content.split(`title="${title}"`)[1].split('aria-label="')[1].split('"')[0].replace(title,""))
        })
    }
    return results;
}

function getMoreInfo(title) {
    let rest = title.split(' by ').slice(1).join(' by ');
    let channel = rest.split(/ ([0-9][0-9]|[0-9]) (year|month|week|day|hour|minute|second)(s?) ago /)[0];
    rest = rest.replace(channel, '');
    let time_text = remove(rest,['>','"',',',' ']);
    let length = {ms: 0};
    let published = {};
    let captures = [{measure: 'year'},{measure:'month'},{measure:'week', ms: 604800000},{measure:'day', ms:86400000},{measure: 'hour', ms:3600000},{ measure: 'minute', ms:60000},{ measure: 'second', ms: 1000}];
    for (let capture of captures) {
        for (let add of ['sago','ago','s','']) {
            if (time_text.includes(`${capture.measure}${add}`)) {
                let number = time_text.split(capture.measure)[0].split(/[a-z]/).slice(-1).pop()
                if (add.includes('ago')) {
                    published.unit = capture.measure;
                    published.count = parseInt(number);
                }
                else {
                    length[`${capture.measure}${add}`] = parseInt(number);
                    if (capture.ms) length.ms += capture.ms*parseInt(number);
                }
                time_text = time_text.replace(`${number}${capture.measure}${add}`, '');
            }
        }
    }
    return {
        channel: channel,
        published: published,
        length: length,
        views: parseInt(time_text.replace('views', ''))
    };
}

function remove(input, array) {
    let output = []
    let input_ = input.split('');
    for (let in_ of input_) {
        let has = false;
        for (let arr of array) {
            if (in_ == arr) has = true;
        }
        if (!has) output.push(in_);
    }
    return output.join('');
}