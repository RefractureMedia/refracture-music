const request = require("request");

export default (search_query, callback) => {
    try {
        cordova.plugin.http.sendRequest(
            `https://www.youtube.com/results?search_query=${search_query}&spf=navigate&gl=US&hl=en`,
            {
                method: 'get',
                headers: {
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
                }
            },
            response => { callback(getIDs(response.data)) },
            err => { throw new Error(err.error); }
        );
    } catch (e) {
        request(
            `https://www.youtube.com/results?search_query=${search_query}&spf=navigate&gl=US&hl=en`,
            (err, res, dat) => {
                if (err) console.error(err);
                else callback(getIDs(dat))
            }
        );
    }
}

function getIDs(data) {
    let content = JSON.parse(data)[1].body.content; // Path to HTML YouTube API gives to renderer
    let ids = [];
    let find_link = content.split("/watch?v=") // finds all watch links
    for (let i = 1; i < find_link.length; i++) { // skips first set of HTML until first id
        let id = find_link[i].split('"')[0]; // split on '"' skips HTML between
        if (id.length === 11) ids.push(id); // length lock rats out playlists & anything that gets through
    }
    return ids;
}