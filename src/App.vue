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
        <media-bar ref="mediabar" :song="currentSong"></media-bar>
      </div>
    </div>
    <v-style>
      .whole-overlay::before {
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url({{ currentSong.song.album.art[currentSong.song.album.art.length-1] }});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </v-style>
    <div v-if="false" class="whole-overlay">
      <media-bar style="background: transparent !important; align-self: end; margin-bottom: 5vh;" :song="currentSong"></media-bar>
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
    library.albums = [];
    library.artists = [];
    let songs = library.songs,
      albumsTemp = [],
      artistsTemp = [];

    for (let song of songs) {
      for (let artist of song.artists) {
        request(
          `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${keys.lastfm}&format=json`,
          (err, res, dat) => {
            let artist = JSON.parse(dat).artist
            if (err) throw new Error(err)
            else {
              if (!artistsTemp.includes(artist.name)) {
                let images = [];
                for (let image of artist.image) images.push(image["#text"])
                library.artists.push({
                  name: artist.name,
                  art: images,
                  description: artist.summary
                })
              }
              artistsTemp.push(artist.name)
            }
          }
        )
      }
      if (!albumsTemp.includes(song.album.title)) {
        library.albums.push({
          artists: song.album.artists,
          title: song.album.title,
          art: song.album.art
        })
        albumsTemp.push(song.album.title)
      } else
        for (let album of library.albums)
          if (album.name == song.album && !album.art.includes(song.art))
            album.art.push(song.album.art)
      this.$data.isDone = true
    }
    player.ontimeupdate = () => {
      this.$data.currentSong.currentTime = getTimestamp(player.currentTime)
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
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
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
    }
    player.ondurationchange = () => {
      this.$data.currentSong.duration = getTimestamp(player.duration)
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
    }

    let paused_prev = true;
    this.$data.player.onpause = () => {
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
      this.media_session('paused')
      if (!paused_prev) toggleVis("update_pause");
      if (!paused_prev) toggleVis("update_play");
      if (!paused_prev) paused_prev = true;
    }
    this.$data.player.onplay = () => {
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
      this.media_session('played')
      if (paused_prev) toggleVis("update_pause");
      if (paused_prev) toggleVis("update_play");
      if (paused_prev) paused_prev = false;
    }

    no_scroll();

    dispatch_presence(this.$data.currentSong.song, this.$data.player);

    document.addEventListener("open_artist", (res) => {
      this.open_modal("artist", { artist: res.detail.artist, songs: res.detail.songs })
    })

    do_this();
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
      //this.$refs.mediabar[0].pause();
      this.$data.currentSong.song = song;
      this.$data.currentSong.duration = song.duration || "0:00";
      this.updateSong(song)
      dispatch_presence(this.$data.currentSong.song, this.$data.player);
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
   * @param {string} service - Audio hosting service
   * @param {string} url - Audio Source URL
   * @param {string} format - Audio Format
   * @param {string} codec - Audio Codec
   */
  constructor (service, url, format, codec) {
    this.data = {
      service: service,
      url: url,
      format: format,
      codec: codec
    }
  }

  /**
   * @description Returns Data Value to entered Key
   * @param {string} [key] - Data Value Key, if not defined returns whole data
   * @returns {any} Returns Data or parts of Data
   */
  get(key = false) {
    return key ? this.data[key] : this.data;
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

class song {
  /**
   * @param {object} metadata - Song Metadata
   * @param {string} metadata.title - Song Title
   * @param {string[]} metadata.artists - Song Artist(s)
   * @param {album} metadata.album - Song Album
   * @param {number} [metadata.tracknumber] - Song Track Number
   * @param {audio_source[]} [sources] - Audio Sources
   */
  constructor (metadata, sources) {
    this.data = {
      metadata: {
        title: metadata.title,
        artists: metadata.artists,
        album: metadata.album,
        tracknumber: metadata.tracknumber
      },
      sources: sources ?  sources : []
    }
  }

  /**
   * @description Returns Data Value to entered Key
   * @param {string} [key] - Data Value Key, if not defined returns whole data
   * @returns {any} Returns Data or parts of Data
   */
  get(key = false) {
    return key ? this.data[key] : this.data;
  }
}

class album {
  /**
   * @param {string} title - Album Title
   * @param {string[]} artists - Album Artist(s)
   * @param {string[]} art - Album Art
   * @param {number} [year] - Year Published
   */
  constructor (title, artists, art, year) {
    this.data = {
      title: title,
      artists: artists,
      art: art,
      year: year || undefined
    }
  }

  /**
   * @description Returns Data Value to entered Key
   * @param {string} [key] - Data Value Key, if not defined returns whole data
   * @returns {any} Returns Data or parts of Data
   */
  get(key = false) {
    return key ? this.data[key] : this.data;
  }
}

function do_this() {
  let foo_bar = new song(
    {
      title: "Don't Stop Believin'",
      artists: ["Journey"],
      sources: [new audio_source(
        'google',
        'https://googlevideo.com/gooossdv/asdasdagr/asdasde',
        'ogg',
        'vorbis'
      )],
      album: new album(
        'Escape',
        ['Journey'],
        ['https://itunescdn.com/asdasdaryh/asdasdy/100x.jpg'],
        1999
      )
    }
  )
  console.log("song");
  console.log(foo_bar.get());
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