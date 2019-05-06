const request = require("request");
const he = require("he");
const cordova_request = require("./cordova/request.js")

export default (search_query, callback) => {
    try {
        cordova_request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) console.log(err);
                else callback(getIDs(dat));
            }
        );
    } catch (e) {
        request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) cors();
                else {
                    console.log(getResults(dat, getIDs(dat), getTitles(dat)));
                    callback(getIDs(dat));
                }
            }
        ).on("error", (err) => {})
        
        function cors() {
            request(
                `https://us-central1-refracture-media.cloudfunctions.net/cors?request=${encodeURIComponent(JSON.stringify({url:`https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`}))}`,
                (err, res, dat) => {
                    if (err) console.warn(err);
                    else callback(getIDs(dat));
                }
            )
        }
    }
}

function getResults(data, ids, titles) {
    let results = []
    let raw_titles = []
    ids.forEach((id, index) => {
        if (titles[index].substring(0,5) != 'Mix -') {
            results.push({
                id: id,
                title: he.decode(titles[index])
            });
            raw_titles.push(titles[index]);
        }
    })
    getMoreInfo(data, raw_titles);
    return results;
}

function getIDs(data) {
    let ids = [];
    let content = JSON.parse(data)[1].body.content; // Path to Results HTML YouTube API gives to renderer
    let find_links = content.split("/watch?v=").slice(1) // Finds watch links, slice 1 removes initial HTML in front of first link
    for (let link of find_links) {
        let id = link.split('"')[0]; // split on '"' skips HTML between
        if (id.length === 11 && !ids.includes(id)) ids.push(id); // length lock rats out playlists & anything that gets through, includes removing duplicates
    }
    return ids;
}

function getTitles(data) {
    let titles = [];
    let content = JSON.parse(data)[1].body.content;
    let find_titles = content.split('"  title="').slice(28);
    for (let title of find_titles) {
        titles.push(title.split('"')[0]);
    }
    return titles;
}

function getMoreInfo(data, titles) {
    let infos = [];
    let content = JSON.parse(data)[1].body.content;
    for (let title of titles) {
        let split_title = content.split(title);
        console.warn('-----')
        let rest = split_title[2].split(' by ').slice(1).join(' by ');
        let channel = rest.split(/ ([0-9][0-9]|[0-9]) (year|month|week|day|hour|minute|second)(s?) ago /)[0];
        let time_text = remove(rest.split(channel)[1],['>','"',',',' ']);
        let length = {};
        let ago = {};
        let captures = ['year','month','week','day','hour','minute','second'];
        for (let capture of captures) {
            for (let add of ['sago','ago','s','']) {
                if (time_text.includes(`${capture}${add}`)) {
                    let number = time_text.split(capture)[0].split(/[a-z]/).slice(-1).pop()
                    if (add.includes('ago')) ago[`${capture}${add}`] = parseInt(number);
                    else length[`${capture}${add}`] = parseInt(number);
                    time_text = time_text.replace(`${number}${capture}${add}`, '');
                }
            }
        }
        console.log({
            channel: channel,
            ...ago,
            length: length,
            views: parseInt(time_text.replace('views', ''))
        });
        //console.log(split_title[1]);
    }
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
    console.log(output.join(''))
    return output.join('');
}