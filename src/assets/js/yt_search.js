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
        request(
            `https://www.youtube.com/results?search_query=${search_query}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
            (err, res, dat) => {
                if (err) lambda();
                else callback(getIDs(dat));
            }
        ).on("error", (err) => {})
        
        function lambda() {
            request(
                `https://refracturemusic.netlify.com/.netlify/functions/yt_search?search=${search_query}`,
                (err, res, dat) => {
                    if (err) console.warn(err);
                    else callback(JSON.parse(dat).results); // Lambda Script has copy of getLinks employed
                }
            )
        }
    }
}

function getIDs(data) {
    let ids = [];
    let content = JSON.parse(data)[1].body.content; // Path to Results HTML YouTube API gives to renderer
    let find_links = content.split("/watch?v=").slice(1) // Finds watch links, slice 1 removes initial HTML in front of first link
    for (let link of find_links) { // skips first set of HTML until first id
        let id = link.split('"')[0]; // split on '"' skips HTML between
        if (id.length === 11 && !ids.includes(id)) ids.push(id); // length lock rats out playlists & anything that gets through, includes removes duplicates
    }
    return ids;
}