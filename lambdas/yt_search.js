const request = require("request");

exports.handler = (event, context, callback) => {
    request(
        `https://www.youtube.com/results?search_query=${event.queryStringParameters.search}&gl=US&hl=en&spf=navigate&html5=1&el=detailpage`,
        (err, res, dat) => {
            if (err) console.log(err);
            else {
                let ids = getIDs(dat);
                callback(null, { statusCode: 200, body: JSON.stringify({ results: ids }) });
                
            }
        }
    )
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