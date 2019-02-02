<template>
  <div id="app">
    <!--<window-control-bar v-bind:title="`RF Music | ${currentSong.meta.title} by ${currentSong.meta.artists[0]}`" v-bind:state="state"></window-control-bar>-->
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar />
          <library-search />
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
//import WindowControlBar from "./components/layout/WindowControlBar.vue"
import NavBar from "./components/layout/NavBar.vue"
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

export default {
  name: "refracture-music",
  components: {
    //   WindowControlBar,
    MediaBar,
    Sidebar,
    NavBar,
    LibrarySearch
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
            "&api_key=" +
            keys.lastfm +
            "&format=json",
          (err, res, dat) => {
            let data = JSON.parse(dat).artist
            if (err) console.error(err)
            else if (
              data !== undefined &&
              !library.artists.includes(JSON.stringify(data))
            )
              library.artists.push(JSON.stringify(data))
          }
        )
      }
      if (!albumsTemp.includes(song.album)) {
        library.albums.push({
          name: song.album,
          art: [song.albumArt]
        })
        albumsTemp.push(song.album)
      } else
        for (let album of library.albums)
          if (album.name == song.album && !album.art.includes(song.albumArt))
            album.art.push(song.albumArt)
      this.$data.isDone = true
    }
    player.ontimeupdate = () =>
      (this.$data.currentSong.currentTime = getTimestamp(player.currentTime))

    player.ondurationchange = () =>
      (this.$data.currentSong.duration = getTimestamp(player.duration))

    setTimeout(() => this.setSong("LDU_Txk06tM"), 30)

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

    const detect = new MobileDetect(window.navigator.userAgent)
  },
  methods: {
    getCategory() {
      return this.$router.path.split("/")[0]
    },
    sidebar_toggle() {
      if (this.$data.state == "closed") this.$data.state = "open"
      else this.$data.state = "closed"
    },
    setSong(vidId) {
      AdaptiveSourceFetcher(vidId, res => {
        this.$data.player.src = res.url
        this.$data.player.play()
        console.log(res)
      })
      console.log(this.$data.player)
    },
    browseSearch() {
      this.setSong(parseYTURL(getSongInput()))
      document.getElementsByClassName("browseSearch")[0].value = ""
    },
    print(content) {
      console.log(content)
    },
    md() {
      return new MobileDetect(window.navigator.userAgent)
    }
  }
}
window.notify = function(x) {
  const rid = Math.random()
    .toString(36)
    .substring(7)

  const toast = document.createElement("div")
  const span = document.createElement("span")
  span.classList.add("close")
  span.onclick = () =>
    document.getElementById(`s-${rid}`).classList.remove("on")
  span.innerHTML = "&times;"
  toast.classList.add("toast")
  toast.classList.add("on")
  toast.id = `s-${rid}`
  toast.innerHTML = x
  toast.appendChild(span)

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
</script>

<style lang="less">
@import "./assets/less/main.less";
</style>