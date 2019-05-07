<template>
  <div id="app">
    <div :class="'whole animate_' + state">
      <sidebar ref="sidebar" style="overflow: hidden;" :state="state"></sidebar>
      <div class="container">
        <nav-bar />
        <div class="content">
          <div class="shadow"></div>
          <modal :active="modal.active" :type="modal.type" :content="modal.content" />
          <library-search v-if="!modal.active"/>
          <router-view v-if="!modal.active" :library="library" :currentSong="currentSong.meta" :player="player" :results="searchResults" :search="search"></router-view>
        </div>
        <media-bar ref="mediabar"></media-bar>
      </div>
    </div>
    <v-style>
      .whole-overlay::before {
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url({{ currentSong.song.data.metadata.data.album.data.art[currentSong.song.data.metadata.data.album.data.art.length-1] }});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </v-style>
    <div v-if="false" class="whole-overlay">
      <media-bar style="background: transparent !important; align-self: end; margin-bottom: 5vh;"></media-bar>
    </div>
  </div>
</template>

<script>
import MediaBar from "./components/layout/MediaBar/MediaBar.vue"
import Sidebar from "./components/layout/Sidebar.vue"
import NavBar from "./components/layout/NavBar.vue"
import Modal from "./components/Modal.vue"
import MobileStyles from "./MobileStyles.css"
import LibrarySearch from "./components/layout/LibrarySearch"
import router from "vue-router"
import { getTimesFromMs, getTimestamp } from "./assets/js/time_stamp.js"
import AppData from "./appData.js"
import keys from "./keys.js";
import path from "path"
import ytSource from "./assets/js/yt_source.js"
import ytSearch from "./assets/js/yt_search.js"
import request from "request"
import { setTimeout } from "timers"
import MobileDetect from "mobile-detect"
import Search from "./Search.js"
import htmlToJson from "html-to-json"
import ytdl from "ytdl-core"
import chunker from "stream-chunker";
import toBlobURL from "stream-to-blob-url";
import from2 from "from2";
import yt_search from './assets/js/yt_search.js';

export default {
  name: "refracture-music",
  components: {
    MediaBar,
    Sidebar,
    NavBar,
    LibrarySearch,
    Modal
  },
  data() {
    return AppData
  },
  mounted() {
    setTimeout(() => { try { _VueInstance.window_portal.doWindowControls() } catch (e) {} }, 450);
    const detect = new MobileDetect(window.navigator.userAgent);
    if (detect.os() == "AndroidOS" || detect.os() == "iOS") mobile_viewport();
    const library = this.$data.library,
      player = this.$data.player;
    library.songs = [];
    library.albums = [];
    library.artists = [];
    let songs = library.songs,
      albumsTemp = [],
      artistsTemp = [];
    for (let song_meta of this.$data.library.song_metas) {
      songs.push(
        deserialize_song({ data: { metadata: { data: song_meta }}})
      )
    }
    console.log(songs);
    for (let song of songs) {
      for (let artist of song.data.metadata.data.artists) {
        if (!artistsTemp.includes(artist.data.name)) {
          artist.avatar().then(() => {
            artist.description().then(() => {
              library.artists.push(artist);
              artistsTemp.push(artist.data.name);
            })
          })
        }
      }
      if (!albumsTemp.includes(song.data.metadata.data.album.data.title)) {
        library.albums.push(song.data.metadata.data.album)
        albumsTemp.push(song.data.metadata.data.album.title)
      } else {
        for (let album of library.albums)
          if (album.data.title == song.data.metadata.data.album.data.title && !album.data.art.includes(song.data.metadata.data.album.data.art))
            album.data.art.push(song.data.metadata.data.album.data.art);
      }
      this.$data.isDone = true
    }
    player.ontimeupdate = () => {
      this.$data.currentSong.currentTime = getTimestamp(player.currentTime)
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
      this.media_session('time', Math.floor(player.currentTime));
    }
    player.onerror = e => {
      throw Error(
        `Error: ${player.error.code}; details: ${player.error.message}`
      )
    }
    player.onchange = () => {
      if (player.canPlayType == false) throw Error("Cannot Play This File Type")
      this.media_session('new')
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
    }
    player.ondurationchange = () => {
      this.$data.currentSong.duration = getTimestamp(player.duration)
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
    }

    let paused_prev = true;
    this.$data.player.onpause = () => {
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
      this.media_session('paused')
      if (!paused_prev) toggleVis("update_pause");
      if (!paused_prev) toggleVis("update_play");
      if (!paused_prev) paused_prev = true;
    }
    this.$data.player.onplay = () => {
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
      this.media_session('played')
      if (paused_prev) toggleVis("update_pause");
      if (paused_prev) toggleVis("update_play");
      if (paused_prev) paused_prev = false;
    }

    no_scroll();

    //dispatch_presence(this.$data.currentSong.song, this.$data.player);

    document.addEventListener("open_artist", (res) => {
      this.open_modal("artist", { artist: res.detail.artist, songs: res.detail.songs })
    })

    this.$data.currentSong.song = {
      data: {
        metadata: {
          data: {
            artists: [{data: { name: ''}}],
            title: '',
            album: { data: {
              art: ['https://i.imgur.com/HIcLTbc.png'],
              title: '',
              artists: [{data: { name: ''}}]
            }}
          }
        }
      }
    }
    run_this((url)=>{this.$data.player.src=url; this.$data.player.play();});
  },
  methods: {
    getCategory() {
      return this.$router.path.split("/")[0]
    },
    sidebar_toggle() {
      if (this.$data.state == "closed") this.$data.state = "open";
      else this.$data.state = "closed";
    },
    setSong(vidId, clear = true) {
      const player = this.$data.player
      if (clear) this.$data.currentSong.song = {
        artists: ["-"],
        title: "-",
        featuring: [""],
        album: {
          artists: ["-"],
          title: "-",
          art: ["https://i.imgur.com/HIcLTbc.png"]
        },
        cachedLink: "",
      };

      ytdl(`https://youtube.com/watch?v=${vidId}`, { range: {start: 0, end: 0} }).on('info', (info) => {
        if (clear) {
          let title = info.title;
          let final_featuring = title.match(/((\[)|(\())(F|f)(eat|eaturing) (.*?)((\])|(\)))/) ? title.match(/((\[)|(\())(F|f)(eat|eaturing) (.*?)((\])|(\)))/)[5].split(/ *[&X,] *| *x +| +x */) : [''];

          title = title.replace(/((\[)|(\()).*?(R|r)elease((\])|(\)))/,'');
          title = title.replace(/((\[)|(\())(((F|f)(eat|eaturing))|((F|f)t)) (.*?)((\])|(\)))/,'');
          title = title.replace(/((\[)|(\()).*?(V|v)ideo((\])|(\)))/, '');
          title = title.replace(/((\[)|(\())(O|o)fficial (.*?)((\])|(\)))/,'');
          title = title.replace(/((\[)|(\())(A|a)nimation (.*?)((\])|(\)))/,'');
          title = title.replace(/((M|m)usic (V|v)ideo)/, '')

          let try1 = title.split(' - ')
          let try2 = title.split(' by ');
          let final_title;
          let final_artists;
          if (try1.length > 1) {
            final_artists = try1[0].split(/ *[&X,] *| *x +| +x */);
            if (try1.length == 2) final_title = try1[1];
            else final_title = try1.slice(1).join(' - ');
          } else if (try2.length > 1) {
            final_title = try2[0];
            final_artist = try2[1].split(/ *[&X,] *| *x +| +x */);
          } else {
            final_title = title;
            final_artists = ['YouTube'];
          }
          this.$data.currentSong.song.title = final_title;
          this.$data.currentSong.song.artists = final_artists;
          this.$data.currentSong.song.featuring = final_featuring;
          this.$data.currentSong.song.album.art = [info.player_response.videoDetails.thumbnail.thumbnails[info.player_response.videoDetails.thumbnail.thumbnails.length - 1].url];
          this.$data.currentSong.song.album.title = "YouTube";
        }
        let parsed_formats = [];
        for (let format of info.formats) {
          if(format.type.includes('audio')) parsed_formats.push({
            src: format.url
          });
        }
        player.src = parsed_formats[0].src;
        player.play();
      });
    },
    browseSearch() {
      if (!this.$data.search.match(/:\/\//)) {
        this.$data.searchResults = Search(this.$data.search, true, "");
      } else {
        this.setSong(parseYTURL(this.$data.search))
      }
      search.value = ""
    },
    setCurrentSong(song) {
      this.$data.player.pause();
      this.$data.currentSong.song = song;
      this.$data.currentSong.currentTime = '0:00'
      this.$data.currentSong.duration = '0:00';
      song.data.locations[0].match();
      song.get_sources().then((sources) => {
        this.$data.player.src = sources[0].data.url;
        this.$data.player.play();
      })
      //dispatch_presence(this.$data.currentSong.song, this.$data.player);
    },
    updateSong() {
      const song = this.$data.currentSong,
        player = this.$data.player;
      
      ytSearch(
        `${song.song.artists.join(" ")} ${song.song.title}`,
        ids => { this.setSong(ids[0], false); }
      );
    },
    md() {
      return new MobileDetect(window.navigator.userAgent)
    },
    media_session(action, options = undefined, platform = this.md().os()) {
      run_media_session(this.$data.player, this.$data.currentSong, this.$data.queue,action, options, platform)
    },
    open_modal(type, content) {
      this.$data.modal.type = type;
      this.$data.modal.content = content;
      switch (type) {
        case "album": {
          //console.log(`http://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${content.artists.join(' & ')}&album=${content.title}&api_key=${keys.lastfm}&format=json`);
          console.log(content);
        }
        case "artist": {
          request(
            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${content.artist}&api_key=${keys.lastfm}&format=json`,
            (err, res, dat) => {
              let images = [];
              let artist = JSON.parse(dat).artist
              for (let image of artist.image) images.push(image["#text"])
              this.$data.modal.content.images = images;
              this.$data.modal.content.details = artist.bio.summary.split('<a')[0].slice(0, -1);
              this.$data.modal.active = true;
              console.log(this.$data.content);
            }
          )
        }
      }
    }
  },
  shortcuts: {
    space: function () {
      if(spacebar()) {
        if(this.$data.player.paused) this.$data.player.play();
        else this.$data.player.pause();
      }
    },
    escape: function() {
      escape_input();
    }
  }
}
window.notify = function(x) {
  const rid = Math.random()
    .toString(36)
    .substring(7)

  const t = document.createElement("div"),
    s = document.createElement("span")
  s.classList.add("close")
  s.onclick = () => document.getElementById(`s-${rid}`).classList.remove("on")
  s.innerHTML = "&times;"
  t.classList.add("toast")
  t.classList.add("on")
  t.id = `s-${rid}`
  t.innerHTML = x
  t.appendChild(span)

  document.body.appendChild(toast)
}

Array.prototype.shuffle = function() {
  var input = this
  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

function parseYTURL(input) {
  if (
    input &&
    input.length == 11 &&
    (input.indexOf("youtube") == -1) | (input.indexOf("youtu.be") == -1)
  ) {
    return input
  } else {
    var regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    var match = input.match(regExp)
    if (match && match[5].length == 11) {
      return match[5]
    } else {
      notify("Could not extract video ID.")
    }
  }
}

function getSongInput() {
  let url = document.getElementsByClassName("browseSearch")[0].value
  return url
}

function toggleVis(classname, index = 0) {
  if (document.getElementsByClassName(classname)[index].style.cssText === "display: none;") document.getElementsByClassName(classname)[index].style.cssText = "display: initial;"
  else if (document.getElementsByClassName(classname)[index].style.cssText === "display: initial;") document.getElementsByClassName(classname)[index].style.cssText = "display: none;"
}

function no_scroll() {
  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
}

function spacebar() {
  if ([...document.body.getElementsByTagName("input")].every((elem) => elem !== document.activeElement)) return true; else return false;
}

function escape_input() {
  document.activeElement.blur();
}
function getDumbDiscordTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) -
    videoTime +
    videoDuration;
    return [Math.floor(startTime/1000), endTime]
}

function dispatch_presence(song, player) {
  let discord_presence = new CustomEvent("discord_presence", player.paused ? {
      detail: {
        presence: {
          state: song.album.title,
          details: song.title + ' by ' + song.artists.join(" & "),
          largeImageKey: "main_logo",
          largeImageText: 'Version ' + '0.0.1',
          smallImageKey: 'pause_',
          smallImageText: 'Paused',
          instance: true
        }
      }
    } : {
      detail: {
        presence: {
          state: song.album.title,
          details: song.title + ' by ' + song.artists.join(" & "),
          startTimestamp: getDumbDiscordTimestamps(player.currentTime, player.duration)[0],
          endTimestamp: Math.floor(getDumbDiscordTimestamps(player.currentTime, player.duration)[1]),
          largeImageKey: "main_logo",
          largeImageText: 'Version ' + '0.0.1',
          smallImageKey: 'play_',
          smallImageText: 'Playing',
          instance: true
        }
      }
    })
    document.dispatchEvent(discord_presence);
}

function mobile_viewport() {
  setTimeout(function () {
        var viewheight =window.innerHeight

        var viewwidth = window.innerWidth
        var viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + 
        viewwidth + "px, initial-scale=1.0");
    }, 300);
}

function run_media_session(player, song, queue, action, options, platform) {
  if (false/*platform == "iOS" || platform == "AndroidOS"*/) {
    switch (action) {
      case 'new': {
        try {
          cordova.plugin.MusicControls.destroy();
        } catch (e) {}

        let session = {
          track: song.song.title,
          artist: song.song.artists.join(" & "),
          cover: song.song.album.art[song.song.album.art.length - 1],
          isPlaying: player.paused,
          hasPrev: queue ? true : false,
          hasNext: queue ? true : false,

          // iOS
          album: song.song.album.title,
          duration: Math.floor(player.duration),
          elapsed: 0,
          hasScrubbing: true,

          // Android
          ticker: song.song.title, // displayed in the status bar on creation
          notificationIcon: 'media_play' // android/res/drawable* folders
        }
        console.log(session);

        cordova.plugin.MusicControls.create(session)

        cordova.plugin.MusicControls.subscribe((data) => {
          let event = JSON.parse(data);
          switch (event.message) {
            //case 'music-controls-next': this.queue_controller('skip'); break;
            //case 'music-controls-previous': this.queue_controller('back'); break;
            case 'music-controls-pause': player.pause(); break;
            case 'music-controls-headset-unplugged': player.pause(); break;
            case 'music-controls-play': player.play(); break;
            case 'music-controls-headset-plugged': player.play(); break;
            case 'music-controls-toggle-play-pause': player.paused ? player.pause() : player.play(); break;
            case 'music-controls-media-button': player.paused ? player.pause() : player.play(); break;
            case 'music-controls-seek-to': {
              //this.media_session('time', event.position);
              player.currentTime = event.position;
            } break;
            default: break;
          }
        })

        cordova.plugin.MusicControls.listen();
      } break;
      case 'time': {
        if (platform == "iOS") cordova.plugin.MusicControls.updateElapsed({
          elapsed: options,
          isPlaying: true
        });
      } break;
      case 'played': cordova.plugin.MusicControls.updateIsPlaying(true); break;
      case 'paused': cordova.plugin.MusicControls.updateIsPlaying(false); break;
    }
  }
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
          console.log(encodeURIComponent(`${artists.join(' & ')} ${this.data.metadata.title}`));
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

function deserialize_song(serialized_song) {
  let locations = [];
  if (serialized_song.data.locations)
    for (let foo of serialized_song.data.locations) 
      locations.push(new location({ serialized: foo }));

  let sources = [];
  if (serialized_song.data.sources) 
    for (let foo of serialized_song.data.sources)
      sources.push(new audio_source({ serialized: foo }));
  return new song(
    new song_metadata({ serialized: serialized_song.data.metadata }),
    {
      ...(locations.length != 0
        && {
          locations: locations
        }
      ),
      ...(sources.length != 0
        && {
          sources: sources
        }
      )
    }
  )
}

function run_this(callback) {
  let temp_artist = new artist({ name: 'Michael Jackson' });
  let localStorage = window.localStorage;
  temp_artist.tracks().then((songs) => {
    console.log(songs);
    songs[1].get_sources().then((sources) => {
      callback(sources[0].data.url);
    })
    console.log(songs[1])
    console.log(deserialize_song(JSON.parse(JSON.stringify(songs[1]))))
  })
  temp_artist.avatar().then((description) => {
    console.log(description);
  })
}
</script>

<style lang="less">
@import "./assets/less/main.less";

.shadow {
  position: absolute;
  width: 100%;
  height: 0.35rem;
  margin-top: 0rem;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 0) 100%);
}

.whole-overlay {
  position: fixed;
  z-index: 2000;
  width: 110vw;
  height: 110vh;
  transform: translate(-5vw,-105vh);
  padding-top: 5vh;
  padding-left: 5vw;
  display: grid;
  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; 
    height: 100%;
    z-index: -20;
    filter: blur(1rem);
  }
}
</style>