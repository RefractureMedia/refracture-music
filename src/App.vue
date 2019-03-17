<template>
  <div id="app">
    <div :class="'whole animate_' + state">
      <sidebar ref="sidebar" :state="state"></sidebar>
      <div class="container">
        <nav-bar />
        <div class="content">
          <div class="shadow"></div>
          <modal :active="modal.active" :type="modal.type" :content="modal.content" />
          <library-search />
          <router-view :library="library" :currentSong="currentSong.meta" :player="player" :results="searchResults" :search="search"></router-view>
        </div>
        <media-bar ref="mediabar" :song="currentSong" :state.sync="player.paused"></media-bar>
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
      <media-bar style="background: transparent !important; align-self: end; margin-bottom: 5vh;" ref="mediabar" :song="currentSong" :state.sync="player.paused"></media-bar>
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
import keys from "./keys.js"
import router from "vue-router"
import { getTimesFromMs, getTimestamp } from "./assets/js/timeManagement.js"
import AppData from "./appData.js"
import path from "path"
import AdaptiveSourceFetcher from "./assets/js/asf.js"
import request from "request"
import { setTimeout } from "timers"
import MobileDetect from "mobile-detect"
import Search from "./Search.js"
import htmlToJson from "html-to-json"
import crawl from "youtube-crawl"
import crawlCordova from "./assets/js/yt-crawl-cordova.js"

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
    setTimeout(() => _VueInstance.window_portal.doWindowControls(), 450);
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
          "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
            artist +
            "&api_key=" +
            keys.lastfm +
            "&format=json",
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
    player.ontimeupdate = () =>
      (this.$data.currentSong.currentTime = getTimestamp(player.currentTime))
    player.onerror = e => {
      throw Error(
        `Error: ${player.error.code}; details: ${player.error.message}`
      )
    }
    player.onchange = () => {
      if (player.canPlayType == false) throw Error("Cannot Play This File Type")
    }
    player.ondurationchange = () =>
      (this.$data.currentSong.duration = getTimestamp(player.duration))

    const detect = new MobileDetect(window.navigator.userAgent)

    let paused_prev = true;
    this.$data.player.onpause = () => {
      if (!paused_prev) toggleVis("update_pause");
      if (!paused_prev) toggleVis("update_play");
      if (!paused_prev) paused_prev = true;
    }
    this.$data.player.onplay = () => {
      if (paused_prev) toggleVis("update_pause");
      if (paused_prev) toggleVis("update_play");
      if (paused_prev) paused_prev = false;
    }

    no_scroll();
  },
  methods: {
    getCategory() {
      return this.$router.path.split("/")[0]
    },
    sidebar_toggle() {
      if (this.$data.state == "closed") this.$data.state = "open"
      else this.$data.state = "closed"
    },
    setSong(vidId, clear = true) {
      const player = this.$data.player
      if (clear) this.$data.currentSong.song = {
        artists: [""],
        title: "",
        featuring: [""],
        album: {
          artists: [""],
          title: "",
          art: ["https://i.imgur.com/HIcLTbc.png"]
        },
        cachedLink: "",
      };
      AdaptiveSourceFetcher(vidId, res => {
        player.src = res[0].url
        player.play()
        //this.$refs.mediabar[0].play();
      })
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
    },
    updateSong() {
      const song = this.$data.currentSong,
        player = this.$data.player;
      request(
        `https://runkit.io/mulverinex/5c868e6938210f0012b133b4/branches/master?search=${song.song.artists.join(" ")} ${song.song.title}`,
        (err, res, dat) => {
          if (err) console.log(err);
          else {
            let response_ids = JSON.parse(dat).results;
            this.setSong(response_ids[0], false);
          }
        }
      )
    },
    md() {
      return new MobileDetect(window.navigator.userAgent)
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