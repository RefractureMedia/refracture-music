const request = require("request");
const cordova_request = require("./cordova/request.js")

export default (search_query, callback) => {
    try {
        cordova_request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) throw new Error(err);
                else callback(getIDs(dat));
            }
        );
    } catch (e) {
        console.log(e.toString(),"font-style: italic","font-style: inherit");
        request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {

                if (err) console.error(err);
                else callback(getIDs(dat));
            }
        );
    }
}

function getIDs(data) {
    let ids = [];
    let content = JSON.parse(data)[1].body.content; // Path to Results HTML YouTube API gives to renderer
    let find_links = content.split("/watch?v=").slice(1) // Finds watch links, slice 1 removes initial HTML in front of first link
    for (let link of find_links) { // skips first set of HTML until first id
        let id = link.split('"')[0]; // split on '"' skips HTML between
        if (id.length === 11) ids.push(id); // length lock rats out playlists & anything that gets through
    }
    return ids;
}