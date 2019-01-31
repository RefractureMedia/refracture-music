<template>
  <div id="app">
    <v-style v-if="md().os() == 'AndroidOS' || md().os() == 'iOS'" lang="less">
      .sidebar {
        position: absolute !important;
      }
      .sidebar_open {
        width: 60vw !important;
      }
      .sidebar_title > svg {
        width: 380% !important;
      }
      .sidebar_content .bottom-items .right {
        width: 10vw;
        height: 10vw;
        border-radius: 2vw;
      }
      .album {
        width: 5rem !important;
        height: 5rem !important;
      }
      .album_table {
        grid-template-columns: repeat(auto-fill, minmax(5.5rem, 5rem)) !important;
      }
      center.albums_container {
        padding-top: 6vh;
        height: 60vh !important;
        overflow: hidden !important;
      }
      div.media-controls.repeat,div.media-controls.back,div.media-controls.save,div.media-controls.skip,div.media-controls.shuffle,div.media-controls.more,div.trackbar,.divTableCell div.play {
        display: none;
        width: 0px;
      }
      div.media-controls.play,div.media-controls.pause {
        float: right;
        position: absolute;
      }
      center#controls {
        display: none;
      }
      .songs_art {
        width: 3.5rem !important;
        height: 3.5rem !important;
      }
      .wrap {
        width: 91% !important;
      }
      .detail {
        padding-top: .5rem !important;
      }
      .sidebar_toggle {
        margin-top: 2rem !important;
      }
      .browseSearch {
        width: 80% !important;
      }
    </v-style>
    <!--<window-control-bar v-bind:title="`RF Music | ${currentSong.meta.title} by ${currentSong.meta.artists[0]}`" v-bind:state="state"></window-control-bar>-->
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
//import WindowControlBar from "./components/layout/WindowControlBar.vue"
import NavBar from "./components/layout/NavBar.vue"
import keys from "./keys.js"
import router from "vue-router"
import { getTimesFromMs, getTimestamp } from "./assets/js/timeManagement.js"
import AppData from "./appData.js"
import path from "path"
import AdaptiveSourceFetcher from "./assets/js/asf.js"
import request from "request"
import { setTimeout } from "timers"
import MobileDetect from 'mobile-detect'

export default {
  name: "refracture-music",
  components: {
    //   WindowControlBar,
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
      this.$data.player.src = AdaptiveSourceFetcher(vidId)
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