<template>
  <div id="app">
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar />
          <library-search />
          <div v-if="isDone">
            <router-view :library="library" :currentSong="currentSong.meta" :player="player" :results="searchResults"></router-view>
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
import Search from "./Search.js"
import ytsr from "ytsr"
import ytsrCordova from "./ytsr-cordova/lib/main.js"
import htmlToJson from "html-to-json"

export default {
  name: "refracture-music",
  components: {
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
      albumsTemp = [],
      artistsTemp = []

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
            if (err) console.error(err)
            else {
              if (!artistsTemp.includes(artist.name))
                library.artists.push({
                  name: artist.name,
                  art: artist.image,
                  description: artist.summary
                })
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
      const player = this.$data.player
      AdaptiveSourceFetcher(vidId, res => {
        player.src = res[0].url
        player.play()
      })
    },
    browseSearch() {
      const search = document.getElementsByClassName("browseSearch")[0]
      let input = document.getElementsByClassName("browseSearch")[0].value
      if (!search.value.match(/:\/\//))
        this.$data.searchResults = Search(!search.value, true, "")
      else {
        this.setSong(parseYTURL(getSongInput()))
      }
      search.value = ""
    },
    setCurrentSong(song) {
      this.$data.currentSong = song
      this.updateSong(song)
    },
    updateSong() {
      const song = this.$data.currentSong,
        player = this.$data.player
      let song_string = song.artists + " " + song.title
      if (this.md().os() != "AndroidOS" && this.md().os() != "iOS") {
        ytsr(song_string, (err, result) => {
          if (err) console.log(err)
          else {
            console.log(result.items[0].link)
            console.log(result.items[0].link.split("v=")[1])
            alert(
              result.items[0].link + "\n" + result.items[0].link.split("v=")[1]
            )
            AdaptiveSourceFetcher(result.items[0].link.split("v=")[1], res => {
              player.src = res[0].url
              player.play()
            })
          }
        })
      } else {
        ytsrCordova(song_string, (err, result) => {
          if (err) console.log(err)
          else {
            console.log(result.items[0].link)
            console.log(result.items[0].link.split("v=")[1])
            alert(
              result.items[0].link + "\n" + result.items[0].link.split("v=")[1]
            )
            AdaptiveSourceFetcher(result.items[0].link.split("v=")[1], res => {
              player.src = res[0].url
              player.play()
            })
          }
        })
      }
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
</script>

<style lang="less">
@import "./assets/less/main.less";
</style>