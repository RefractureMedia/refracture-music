<template>
  <div id="app">
    <webview v-if="false" :src="webviewURL" :preload="preload" webpreferences="allowRunningInsecureContent" nodeintegration disablewebsecurity></webview>
    <window-control-bar v-bind:title="`RF Music | ${currentSong.meta.title} by ${currentSong.meta.artists[0]}`" v-bind:state="state"></window-control-bar>
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar></nav-bar>
          <input v-if="$route.path.split('/')[1] == 'library'" type="url" name="youtubeURL" class="songInput" placeholder="Search">
          <div v-if="$route.path.split('/')[1] == 'library'" id="submitLibrarySearch" style="display: none;"></div>
          <svg v-if="$route.path.split('/')[1] == 'library'" width="18" height="18" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="search_icon">
            <path d="M20.01 17.61H18.75L18.3 17.178C19.87 15.353 20.8101 12.983 20.8101 10.406C20.8101 4.659 16.1499 0 10.4099 0C4.65991 0 0 4.659 0 10.406C0 16.153 4.65991 20.812 10.4099 20.812C12.9799 20.812 15.3499 19.867 17.1799 18.298L17.6101 18.747V20.011L25.6101 28L28 25.615L20.01 17.61ZM10.4099 17.61C6.41991 17.61 3.19995 14.392 3.19995 10.406C3.19995 6.42 6.41991 3.202 10.4099 3.202C14.3899 3.202 17.6101 6.42 17.6101 10.406C17.6101 14.392 14.3899 17.61 10.4099 17.61Z" fill="currentColor"></path>
          </svg>
          <div v-if="isDone">
            <router-view :library="library" :currentSong="currentSong.meta" :player="player"></router-view>
          </div>
        </div>
      </div>
      <media-bar :song="currentSong" :state="state"></media-bar>
    </div>
  </div>
</template>

<script>
import MediaBar from "./components/layout/MediaBar/MediaBar.vue"
import Sidebar from "./components/layout/Sidebar.vue"
import WindowControlBar from "./components/layout/WindowControlBar.vue"
import NavBar from "./components/layout/NavBar.vue"
import router from "vue-router"
import { getTimesFromMs, getTimestamp } from "./utilities/timeManagement.js"
import AppData from "./appData.js"
import path from "path"
import request from "request"

export default {
  name: "refracture-music",
  components: {
    WindowControlBar,
    MediaBar,
    Sidebar,
    NavBar
  },
  data() {
    return AppData
  },
  mounted() {
    const library = this.$data.library,
      player = this.$data.player
    let songs = library.songs,
      albumsTemp = []

    for (let song of songs) {
      for (let artist of song.artists) {
        request(
          "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
            artist +
            "&api_key=&format=json",
          (err, res, dat) => {
            let data = JSON.parse(dat).artist
            console.log(data)
            if (err) console.error(err)
            else if (
              data !== undefined &&
              !library.artists.includes(JSON.stringify(data))
            )
              library.artists.push(JSON.stringify(data))
          }
        )
      }
      if (!albumsTemp.includes(song.album))
        library.albums.push({
          name: song.album,
          art: [song.albumArt]
        })
      else
        for (let album of library.albums)
          if (album.name == song.album && !album.art.includes(song.albumArt))
            album.art.push(song.albumArt)
      this.$data.isDone = true
    }

    player.ontimeupdate = () =>
      (this.$data.currentSong.currentTime = getTimestamp(player.currentTime))

    player.ondurationchange = () =>
      (this.$data.currentSong.duration = getTimestamp(player.duration))
    setTimeout(() => fetchSource("LDU_Txk06tM"), 30)
    document.body.addEventListener(
      "sourceObtained",
      () => (this.$data.player.src = returnSource()),
      false
    )
    document
      .getElementsByClassName("songInput")[0]
      .addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          document.getElementById("submitSong").click()
          e.preventDefault()
          return false
        }
      })
    document.getElementsByClassName("songInput")[0].preventDefault()
  },
  methods: {
    getCategory() {
      return this.$router.path.split("/")[0]
    },
    sidebar_toggle() {
      if (this.$data.state == "closed") this.$data.state = "open"
      else this.$data.state = "closed"
    },
    setSong(video) {
      fetchSource(video)
    },
    browseSearch() {
      fetchSource(parseYTURL(getSongInput()))
      document.getElementsByClassName("browseSearch")[0].value = ""
    },
    print(content) {
      console.log(content)
    }
  }
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
let sourceObtained = new CustomEvent("sourceObtained"),
  source

function returnSource() {
  return source
}

function fetchSource(vidID) {
  let audioLoader = document.createElement("webview")
  audioLoader.setAttribute("src", `https://youtube.com/watch?v=${vidID}`)
  audioLoader.setAttribute(
    "preload",
    `file:\\${require("path").resolve(__dirname, "./utilities/inject.js")}`
  )
  audioLoader.setAttribute("webpreferences", "allowRunningInsecureContent")
  audioLoader.setAttribute("nodeintegration", "")
  audioLoader.setAttribute("disablewebsecurity", "")
  setTimeout(
    () => document.getElementsByTagName("webview")[0].setAudioMuted(true),
    30
  )

  document.body.appendChild(audioLoader)
  audioLoader.addEventListener("ipc-message", event => {
    source = event.channel[0].url
    document.body.dispatchEvent(sourceObtained)
    audioLoader = null
    document
      .getElementsByTagName("webview")[0]
      .parentNode.removeChild(document.getElementsByTagName("webview")[0])
  })
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
      alert("Could not extract video ID.")
    }
  }
}
function getSongInput() {
  let url = document.getElementsByClassName("browseSearch")[0].value
  return url
}
</script>

<style lang="less">
@import "./variables.less";
@import "./roboto.less";
@import "./scrollbar.less";

webview {
  height: 0;
}
body {
  background: @background-primary;
  color: @accent-primary;
}

body {
  font-family: Roboto;
  margin: 0;
  overflow: hidden;
  background: @background-primary;
  user-select: none;
}

* {
  user-select: none;
  cursor: default;
}

a {
  color: @accent-primary;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

p {
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}

.whole {
  height: 100%;
  margin-top: -0.1rem;
  background: @background-primary;
}

.content {
  display: flex;
  height: 80vh;
  width: 100%;
}

#hide {
  display: none;
  visibility: hidden;
}

.sidebar {
  @top-bottom-height: 2rem;
  width: 0px;
  background: @background-secondary;
  &-top {
    height: 2rem;
    width: 0px;
  }
  &-bottom {
    display: inline-block;
    height: 20vh;
    width: 20vw;
  }
}

.wrap {
  width: 100%;
  background: transparent;
  padding: 1rem;
  min-height: calc(100%- (1.8rem+20%));
  float: right;
  overflow: scroll;
}

.clear:after {
  clear: both;
  display: table;
  content: "";
}

.sidebar_toggle {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 3rem;
  text-decoration: none !important;
  transition: margin-left 0.15s;
  position: absolute;
  &.sidebar_open {
    margin-left: -10rem !important;
    transition: margin-left 0.15s;
  }
}

.sidebar_top {
  display: flex;
  width: 16.65vw !important;
  transition: width 0s !important;
}

a.sidebar_toggle_x {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 0.8rem;
}

div.sidebar_toggle_x {
  float: right;
}

.sidebar_open {
  @top-bottom-height: 2rem;
  width: 20vw;
  transition: width 0.15s;
  background: @background-secondary;
  &-top {
    height: 2rem;
    width: 0px;
  }
  &-bottom {
    display: inline-block;
    height: 20vh;
  }
}

.sidebar_toggle.sidebar_open {
  background: transparent !important;
}

.sidebar_closed {
  .sidebar_content {
    display: none !important;
    transition: display 0.15s;
  }
  div.sidebar_toggle_x {
    margin-top: -10rem !important;
    transition: margin-top 0.15s;
  }
}

.sidebar_main.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}

.sidebar-top.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}
.sidebar-bottom.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}

.songInput {
  background: @background-secondary;
  border: none;
  height: 2rem;
  width: 0.2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: transparent;
  outline-color: transparent !important;
  float: right;
  margin-top: -3.6rem;
  position: relative;
  transition: width 40ms;
  cursor: text;
  &::placeholder {
    color: transparent;
  }
  &:hover {
    color: @accent-primary;
    width: 15rem;
    transition: width 40ms;
    &::placeholder {
      color: @accent-secondary;
    }
  }
}
.search_icon {
  position: relative;
  float: right;
  margin-top: -3.1rem;
  margin-right: 0.5rem;
  pointer-events: none;
}
</style>
