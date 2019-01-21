<template>
  <div id="app">
    <webview src="https://www.youtube.com/watch?v=9jK-NcRmVcw" preload="C:\Users\Julian\Documents\Refracture\refracture-music\src\renderer\inject.js"></webview>
    <window-control-bar v-bind:title="`RF Music | ${currentSong.name} by ${currentSong.artist}`" v-bind:state="state"></window-control-bar>
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar></nav-bar>
          <router-view></router-view>
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
import path from "path"

function getTimestamp(raw_time) {
  let out_time = ""
  if (Math.floor((raw_time / 60) % 60) != 0) {
    out_time =
      Math.floor((raw_time / 60) % 60) + ":" + Math.floor(raw_time % 60)
  } else {
    if (Math.floor(raw_time % 60) < 10) {
      out_time = "0:0" + Math.floor(raw_time % 60)
    } else {
      out_time = "0:" + Math.floor(raw_time % 60)
    }
  }
  return out_time
}

export default {
  name: "refracture-music",
  components: {
    WindowControlBar,
    MediaBar,
    Sidebar,
    NavBar
  },
  data() {
    return {
      state: "open",
      currentCatagory: "Library",
      categories: ["Browse", "Library", "Visualize"],
      currentPage: "Songs",
      pages: ["Songs", "Artists", "Albums", "Playlists"],
      currentSong: {
        name: "Crab Rave",
        artist: "Noisestorm",
        currentTime: "0:00",
        duration: "0:00"
      },
      player: new Audio(
        "https://t4.bcbits.com/stream/a63a067166c4048cc079f9e5fe3bf012/mp3-128/1349106371?p=0&ts=1548142188&t=0f3992c28a326f625a6b70f3f2a56ba144ae9cdd&token=1548142188_319ddf768b0524d4892c746cf900627d2ff73c70"
      )
    }
  },
  mounted() {
    const downloader = document.getElementsByTagName("webview")[0]
    this.$data.player.ontimeupdate = () => {
      this.$data.currentSong.currentTime = getTimestamp(
        this.$data.player.currentTime
      )
    }
    this.$data.player.ondurationchange = () => {
      this.$data.currentSong.duration = getTimestamp(this.$data.player.duration)
      console.log(getTimestamp(this.$data.player.duration))
    }
    setTimeout(() => downloader.send("ping"), 3009)
    setTimeout(() => downloader.setAudioMuted(true), 100)
    downloader.addEventListener("ipc-message", event => {
      console.log(event.channel)
      this.$data.player.src = event.channel[0].url
      downloader.setAttribute("src", ".")
    })
  },
  methods: {
    sidebar_toggle() {
      if (this.$data.state == "closed") {
        this.$data.state = "open"
      } else {
        this.$data.state = "closed"
      }
    }
  }
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
</style>
