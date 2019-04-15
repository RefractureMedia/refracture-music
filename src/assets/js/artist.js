const request = require("request");

export default (artist, keys) => {
    request(
        "https://itunes.apple.com/search?&entity=musicArtist&term=" + artist,
        (err, res, dat) => {
            let data = JSON.parse(dat);
            let id;
            for (let result of data.results) if (result.artistName == artist) {
                id = result.artistId;
                break;
            }
            request(
                `https://us-central1-refracture-media.cloudfunctions.net/cors?request=${encodeURIComponent(JSON.stringify({ url: `https://itunes.apple.com/lookup?id=${data.results[0].artistId}&entity=song` }))}`,
                (err, res, dat_) => {
                    let data_ = JSON.parse(dat_);
                    let parsed_songs = [];
                    for (let track of data_.results.slice(1)) {
                        request(
                            "https://itunes.apple.com/lookup?id=" + track.collectionId,
                            (err, res, dat__) => {
                                if (err) throw new Error(err);
                                else {
                                    let collectionArtist = JSON.parse(dat__).results[0].artistName;
                                    let song = {
                                        artists: track.artistName.split(/ *[&X,] *| *x +| +x */),
                                        title: track.trackName,
                                        featuring: [''],
                                        tracknum: track.trackNumber,
                                        album: {
                                            artists: collectionArtist.split(/ *[&X,] *| *x +| +x */),
                                            title: track.collectionName,
                                            art: [(
                                                track.artworkUrl100.replace("100x100bb.jpg", "200x200bb.jpg")
                                            ) /* Makes the artwork request be 1000px rather than 100*/
                                                .toString()
                                            ]
                                        }
                                    }
                                    parsed_songs.push(song);
                                    if (parsed_songs.length == data_.results.length - 1) {
                                        document.dispatchEvent(new CustomEvent("open_artist", { detail: { artist: artist, songs: parsed_songs } }))
                                    }
                                }
                            }
                        );
                    }
                }
            )
        }
    )
}