import request from "request";
import keys from "./keys.js";
//import yt_search from "./assets/js/yt_search.js";
import ytdl from "ytdl-core";

export default function (input, outgoing, page) {
  let output = {
    songs: [],
    artists: [],
    albums: [],
    playlists: [],
    youtube: [],
    soundcloud: []
  }
  if (outgoing) {
    let songsTemp = [];
    request(
      "https://itunes.apple.com/search?&entity=song&term=" + input,
      (err, res, dat) => {
        let tracks = JSON.parse(dat).results,
          parsed_songs = [];
        for (let track of tracks) {
          request(
            "https://itunes.apple.com/lookup?id=" + track.collectionId,
            (err, res, dat) => {
              if (err) throw new Error(err);
              else {
                let collectionArtist = JSON.parse(dat).results[0].artistName;
                let artists = [];
                let album_artists = [];
                for (let foo of track.artistName.split(/ *[&X,] *| *x +| +x */)) artists.push(new artist({name: foo}));
                for (let foo of collectionArtist.split(/ *[&X,] *| *x +| +x */)) album_artists.push(new artist({name: foo}));
                parsed_songs.push(new song(new song_metadata({
                  artists: artists,
                  title: track.trackName,
                  tracknum: track.trackNumber,
                  album: new album({
                    artists: album_artists,
                    title: track.collectionName,
                    art: [(
                        track.artworkUrl100.replace("100x100bb.jpg", "200x200bb.jpg")
                      ) /* Makes the artwork request be 1000px rather than 100*/
                      .toString()
                    ]
                  })
                })));
                songsTemp.push(track.trackName);
              }
            }
          );
        }
        if (err) throw new Error(err);
        else output.songs = parsed_songs;
      }
    );

    let artistsTemp = [];
    let parsed_artists = [];
    request(
      "https://itunes.apple.com/search?&entity=musicArtist&term=" + input,
      (err, res, dat) => {
        let raw_artists = JSON.parse(dat).results;
        if (err) throw new Error(err)
        else {
          for (let bar of raw_artists)
            if (!artistsTemp.includes(artist.artistName)) {
              let foo = new artist({name: bar.artistName});
              artistsTemp.push(bar.artistName);
              foo.avatar(bar.artistLinkUrl).then(() => {
                foo.description().then(() => {
                  console.log(foo);
                  parsed_artists.push(foo);
                })
              });
            }
          output.artists = parsed_artists;
        }
      }
    );

    request(
      "https://itunes.apple.com/search?&entity=album&term=" + input,
      (err, res, dat) => {
        let albums = JSON.parse(dat).results;
        let parsed_albums = [];
        for (let bar of albums) {
          let artists = [];
          for (let foo of bar.artistName.split(/ *[&X,] *| *x +| +x */)) artists.push(new artist({name: foo}));
          parsed_albums.push(new album({
            artists: artists,
            title: bar.collectionName,
            art: [(
              bar.artworkUrl100.replace("100x100bb.jpg", "200x200bb.jpg")
              ) /* Makes the artwork request be 1000px rather than 100*/
              .toString()
            ]
          }));
        }
        if (err) throw new Error(err);
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

class audio_source {
  /**
   * @param {object} input - Audio Source
   * @param {string} input.service - Audio hosting service
   * @param {string} input.url - Audio Source URL
   * @param {string} input.format - Audio Format
   * @param {string} input.codec - Audio Codec
   * @param {object} [input.serialized] - Input Serialized Audio Source
   */
  constructor (input) {
    this.data = input.serialized ? input.serialized.data : {
      service: input.service,
      url: input.url,
      format: input.format,
      codec: input.codec
    }
  }

  /**
   * @description Returns Boolean of whether or not the audio is supported
   * @param {string} user_agent - UA String
   */
  supported (user_agent) {
    // placeholder, will be more complex, the point is for iOS users who can't play vorbis in some situations, along with flac
    if (user_agent.includes('AndroidOS')) return true;
    else return false;
  }
}

class location {
  /**
   * @param {object} input - Location
   * @param {string} input.service - Location's Service
   * @param {song_metadata} input.metadata
   * @param {string|object} [input.data] - Data for Location on Service (ie video id on YouTube)
   * @param {object} [input.serialized] - Input Serialized Location
   */
  constructor (input) {
    this.data = input.serialized ? input.serialized.data : {
      service: input.service,
      metadata: input.metadata.data,
      data: input.data ? input.data : function () {this.match(input.service)}
    }
  }

  /**
   * @param {string} [service] - Service to match a location for the song on
   */
  match (service = 'youtube') {
    switch (service) {
      case "youtube": {
        return new Promise((resolve, reject) => {
          let artists = []
          for (let bar of this.data.metadata.artists) artists.push(bar.data.name);
          yt_search(encodeURIComponent(`${artists.join(' & ')} ${this.data.metadata.title}`),
            (results) => {
              this.data.data = results[0].id;
              resolve(results[0].id);
            }
          )
        })
      }
    }
  }
}

class song {
  /**
   * @param {song_metadata} metadata - Song Metadata
   * @param {object} [preload] - Preload Song With Data
   * @param {(audio_source|audio_source[])} [preload.sources] - Audio Sources
   * @param {(location|location[])} [preload.locations] - Song Location(s)
   */
  constructor (metadata, preload) {
    this.data = {
      metadata: metadata,
      sources: preload ? preload.sources ? preload.sources.length ? preload.sources : [preload.sources] : function () {this.get_sources()} : function () {this.get_sources()},
      locations: preload ? preload.locations ? preload.locations.length ? preload.locations : [preload.locations] : [new location({ service: 'youtube', metadata: metadata })] : [new location({ service: 'youtube', metadata: metadata })]
    }
  }

  get_sources(locations = this.data.locations) {
    return new Promise((resolve, reject) => {
      this.data.locations[0].match().then((id)=>{ytdl(`https://youtube.com/watch?v=${id}`, { range: {start: 0, end: 0} }).on('info', (info) => {
        let sources = [];
        console.log(info);
        for (let format of info.formats) if (format.type.includes('audio')) 
          sources.push(new audio_source({ service: 'youtube', url: format.url, format: 'ogg', codec: 'vorbis' }));
        this.data.sources = sources;
        resolve(sources)
      })})
    })
  }
}

class song_metadata {
  /**
   * @param {object} input - Song Metadata
   * @param {string} input.title - Song Title
   * @param {(artist|artist[])} input.artists - Song Artist(s)
   * @param {album} input.album - Song Album
   * @param {(artist|artist[])} [input.featuring] - Featured Artist(s)
   * @param {number} [input.tracknumber] - Song Track Number
   * @param {object} [input.serialized] - Input Serialized Song
   */
  constructor (input) {
    if (input.serialized) {
      let artists = [];
      for (let foo of input.serialized.data.artists)
        artists.push(new artist({ serialized: foo }));
      let featuring = []
      if (input.serialized.data.featuring)
        for (let foo of input.serialized.data.featuring)
          featuring.push(new artist({ serialized: foo }));
      
      this.data = {
        title: input.serialized.data.title,
        artists: artists,
        album: new album({ serialized: input.serialized.data.album }),
        featuring: featuring,
        tracknumber: input.serialized.data.tracknumber
      }
    } else this.data = {
      title: input.title,
      artists: input.artists.length ? input.artists : [input.artists],
      album: input.album,
      featuring: input.featuring ? input.featuring.length ? input.featuring : [input.featuring] : [],
      tracknumber: input.tracknumber || 0
    }
  }
}

class artist {
  /**
   * @param {object} input - Artist
   * @param {string} input.name - Artist Name
   * @param {object} input.serialized - Serialized Artist
   */
  constructor (input) {
    this.data = input.serialized ? input.serialized.data : {
      name: input.name
    }
  }

  /**
   * @description Returns Artist's iTunes Avatar
   * @param {string} [artist_url] - If you have the artist URL/ID already you can supplement it to reduce requests
   */
  avatar(artist_url = undefined) {
    let foo_bar = this.data;
    return new Promise((resolve, reject) => {
      let art = this.data.art;
      if (this.data.art) resolve(this.data.art);
      else {
        if (!artist_url) request(`https://itunes.apple.com/search?&entity=musicArtist&term=${this.data.name}`,(err, res, dat) => {
          get_image(JSON.parse(dat).results[0].artistLinkUrl);
        })
        else get_image(artist_url)

        function get_image(artist_link) {
          request(
            artist_link.split('?')[0],
            (err, res, dat) => {
              foo_bar.art = [dat.split('<meta property="og:image" content="')[1].split('" id="')[0].split('/').slice(0, -1).join('/') + '/200x200.png'];
              resolve(foo_bar.art);
            }
          )
        }
      }
    })
  }

  /**
   * Returns Artist's Bio from LastFM
   */
  description() {
    return new Promise((resolve, reject) => {
      request(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${this.data.name}&api_key=${keys.lastfm}&format=json`,
        (err, res, dat) => {
          if (err) throw new Error(err)
          else {
            this.data.description = JSON.parse(dat).artist.bio.summary
              .split('<a')[0].slice(0, -1); // Removes stupid links and crap at the end

            /** What This Thing Does:
             * There are at least three artists with this name
             * 1. A popular American rock band
             * 2. A British psychedelic trance producer
             * 3. An underground rapper
             * 
             * Journey is an American rock band formed in San Francisco, California in 1973. 
               The band has gone through several phases since its inception by former members of Santana. 
               The band's greatest commercial success came in the late 1970s through the early 1980s with 
               a series of power ballads and songs such as "Don't Stop Believin'"
             * 
             *  ||
             *  \/
             * 
             * Journey is an American rock band formed in San Francisco, California in 1973. 
               The band has gone through several phases since its inception by former members of Santana. 
               The band's greatest commercial success came in the late 1970s through the early 1980s with 
               a series of power ballads and songs such as "Don't Stop Believin'"
             * 
             * 
             * There are at least three artists with this name
             * 1. A popular American rock band
             * 2. A British psychedelic trance producer
             * 3. An underground rapper
             */
            if (this.data.description.split('\n')[0] == "There are at least three artists with this name") { // aka, "do we need to do all of this?"
              let new_desc = []; // The part you want to read
              let blah_blah = []; // The part you want at the bottom

              for (let line of this.data.description.split('\n')) {
                if (line.charAt(0).toString().match(/^[0-9]+$/) != null) new_desc.push(line); // Makes sure line doesn't start with number
                else blah_blah.push(line);
              }

              this.data.description = [ // Backwards-ish (its weird)
                ...blah_blah.slice(2), // Basic Descriptions of other artists
                '','', // 2 Line Breaks for spacing
                blah_blah[0], // There are at least.... line
                '', // Line Break for spacing
                ...new_desc // Artist Description
              ].join('\n'); // Adds back in the newline formatting
            }

            resolve(this.data.description)
          }
        }
      )
    })
  }

  tracks() {
    return new Promise((resolve, reject) => {
      request(
        `https://itunes.apple.com/search?&entity=musicArtist&term=${this.data.name}`,
        (err, res, dat) => {
          request(
            `https://itunes.apple.com/lookup?id=${JSON.parse(dat).results[0].artistId}&entity=song`,
            (err, res, dat) => {
              let raw_songs = JSON.parse(dat).results.slice(1);
              let parsed_songs = [];
              for (let track of raw_songs) {
                request(
                  "https://itunes.apple.com/lookup?id=" + track.collectionId,
                  (err, res, dat__) => {
                    if (err) throw new Error(err);
                    else {
                      let artists = []
                      for (let foo of track.artistName.split(/ *[&X,] *| *x +| +x */)) artists.push(new artist({ name: foo }));
                      let album_artists = []
                      for (let foo of JSON.parse(dat__).results[0].artistName.split(/ *[&X,] *| *x +| +x */)) album_artists.push(new artist({ name: foo }));
                      parsed_songs.push(new song(
                        new song_metadata({
                          title: track.trackName,
                          artists: artists,
                          album: new album(
                            {
                              title: track.collectionName,
                              artists: album_artists,
                              art: [(track.artworkUrl100.replace("100x100bb.jpg", "200x200bb.jpg")).toString()]
                            }
                          ),
                          tracknumber: track.trackNumber
                        }))
                      );
                      if (parsed_songs.length == raw_songs.length) resolve(parsed_songs);
                    }
                  }
                );
              }
            }
          )
        }
      )
    })
  }
}

class album {
  /**
   * @param {object} input - Album
   * @param {string} input.title - Album Title
   * @param {string[]} input.artists - Album Artist(s)
   * @param {string[]} input.art - Album Art
   * @param {number} input.[year] - Year Published
   * @param {object} [input.serialized] - Input a Serialized Album
   */
  constructor (input) {
    if (input.serialized) this.data = input.serialized.data;
    else this.data = {
      title: input.title,
      artists: input.artists,
      art: input.art,
      year: input.year || undefined
    };
  }
}


const he = require("he");
const cordova_request = require("./assets/js/cordova/request.js")

function yt_search(search_query, callback) {
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
    console.log(results);
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