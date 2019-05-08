const request = require("request");

export default (artist, keys) => {
    document.dispatchEvent(new CustomEvent("open_artist", { detail: { artist: artist} }))
}