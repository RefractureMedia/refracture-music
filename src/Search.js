import request from "request";
import keys from "./keys.js";

export default function (input, outgoing, page) {
  let output = {
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    youtube: [],
    soundcloud: []
  }
  console.clear();
  if (outgoing) {
    let songsTemp = [];
    request(
      "https://itunes.apple.com/search?&entity=musicTrack&term=" + input,
      (err, res, dat) => {
        let tracks = JSON.parse(dat).results;
        let parsed_songs = [];
        for (let track of tracks) {
          request(
            "https://itunes.apple.com/lookup?id=" + track.collectionId,
            (err, res, dat) => {
              if (err) console.error(err);
              else {
                let collectionArtist = JSON.parse(dat).results[0].artistName;
                console.log(JSON.parse(dat).results);
                console.log(collectionArtist)
                parsed_songs.push({
                  artists: track.artistName.split(/ *[&X,] *| *x +| +x */),
                  title: track.trackName,
                  featuring: [''],
                  tracknum: track.trackNumber,
                  album: {
                    artists: collectionArtist.split(/ *[&X,] *| *x +| +x */),
                    title: track.collectionName,
                    art: [(
                        track.artworkUrl100.replace("100x100bb.jpg", "1000x1000bb.jpg")
                      ) /* Makes the artwork request be 1000px rather than 100*/
                      .toString()
                    ]
                  }
                });
                songsTemp.push(track.trackName);
              }
            }
          );
        }
        console.log(parsed_songs);
        if (err) console.error(err);
        else output.songs = parsed_songs;
      }
    );

    request(
      "https://itunes.apple.com/search?&entity=musicArtist&term=" + input,
      (err, res, dat) => {
        let raw_artists = JSON.parse(dat).results;

        if (err) console.error(err)
        else
          for (let artist of raw_artists)
            if (artistsTemp.includes(artist.name)) {
              request(
                "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
                artist +
                "&api_key=" +
                keys.lastfm +
                "&format=json",
                (err, res, dat) => {
                  let artists = JSON.parse(dat).artist;
                  let parsed_artists = [];
                  for (let artist of artists) {
                    parsed_artists.push({
                      name: artist.name,
                      art: artist.image,
                      description: artist.summary
                    });
                  }
                  console.log(parsed_artists);
                  if (err) console.error(err);
                  else output.artists = parsed_artists;
                }
              );
            }
      }
    );

    request(
      "https://itunes.apple.com/search?&entity=album&term=" + input,
      (err, res, dat) => {
        let albums = JSON.parse(dat).results;
        let parsed_albums = [];
        for (let album of albums) {
          parsed_albums.push({
            artists: album.artistName.split(/ *[&X,] *| *x +| +x */),
            title: album.collectionName,
            art: [(
                album.artworkUrl100.replace("100x100bb.jpg", "1000x1000bb.jpg")
              ) /* Makes the artwork request be 1000px rather than 100*/
              .toString()
            ]
          });
        }
        console.log(parsed_albums);
        if (err) console.error(err);
        else output.albums = parsed_albums;
      }
    );
    return output;
    // do youtube result requesting & filter out `songsTemp.includes(parsed_result.title)` (same thing for soundcloud when we get around to doing soundcloud)
  }
  /*else {
     if (page == "Songs")
       for (let song of this.$data.library.songs) {
         if (song.title.includes(input))
           output.songs.push(song);
       }
     if (page == "Artists")
       for (let artist of this.$data.library.artists) {
         if (artist.name.includes(input))
           output.artists.push(artist);
       }
     if (page == "Albums")
       for (let album of this.$data.library.albums) {
         if (album.title.includes(input))
           output.albums.push(album);
       }
     if (page == "Playlists")
       for (let playlist of this.$data.library.playlist) {
         if (playlist.name.includes(input))
           output.playlists.push(playlist);
       }
   }*/
}
