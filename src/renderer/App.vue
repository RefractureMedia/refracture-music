<template>
  <div id="app">
    <window-control-bar v-bind:title="`RF Music | ${currentSong.name} by ${currentSong.artist}`" v-bind:state="state"></window-control-bar>
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" v-bind:class="'sidebar_toggle'" v-on:click="sidebar_toggle">≡</a>
          <div class="nav-bar">
            <center>
              <p style="display:inline;" v-for="page in pages" v-bind:key="page" v-on:click="currentPage = page">
                <router-link v-bind:class="['page', { active: currentPage === page }]" v-bind:to="page">{{ page + ' ' }}</router-link>
              </p>
            </center>
          </div>
          <router-view></router-view>
        </div>
      </div>
      <control-bar song="https://i.kym-cdn.com/photos/images/original/001/400/708/698" v-bind:state="state"></control-bar>
    </div>
  </div>
</template>

<script>
import ControlBar from "./components/layout/ControlBar.vue"
import Sidebar from "./components/layout/Sidebar.vue"
import WindowControlBar from "./components/layout/WindowControlBar.vue"
import router from "vue-router"

export default {
  name: "refracture-music",
  components: {
    WindowControlBar,
    ControlBar,
    Sidebar
  },
  data() {
    return {
      state: "open",
      currentCatagory: "Library",
      categories: ["Browse", "Library", "Visualize"],
      currentPage: "Songs",
      pages: ["Songs", "Artists", "Albums", "Playlists"],
      currentSong: { name: "Crab Rave", artist: "Noisestorm" }
    }
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

.version {
  height: 100%;
  text-align: center;
  position: relative;
  & > p {
    position: absolute;
    bottom: 0;
    margin-bottom: 6vh;
    margin-left: 6vh;
  }
}

.wrap {
  width: 100%;
  background: transparent;
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

.nav-bar {
  font-size: 2rem;
  font-weight: bolder;
  & a {
    color: @accent-secondary;
    &:hover {
      text-decoration: none;
      color: @accent-primary;
    }
  }
  & .router-link-active {
    color: @accent-primary;
  }
}
</style>
