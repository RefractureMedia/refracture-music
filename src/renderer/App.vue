<template>
  <div id="app">
    <window-control-bar></window-control-bar>
    <div class="whole">
      <div class="content clear">
        <sidebar v-bind:class="state"></sidebar>
        <div class="wrap">
          <a v-bind:class="'sidebar_toggle sidebar_' + state" v-on:click="sidebar_toggle">≡</a>
          <div class="nav-bar">
            <center>
              <p>
                <router-link
                  to="Songs"
                  v-bind:class="current_page(0)"
                  onclick="going_to('Songs')"
                >Songs</router-link>
                <router-link
                  to="Artists"
                  v-bind:class="current_page(1)"
                  onclick="going_to('Artists')"
                >Artists</router-link>
                <router-link
                  to="Albums"
                  v-bind:class="current_page(2)"
                  onclick="going_to('Albums')"
                >Albums</router-link>
                <router-link
                  to="Playlists"
                  v-bind:class="current_page(3)"
                  onclick="going_to('Playlists')"
                >Playlists</router-link>
              </p>
            </center>
          </div>
          <router-view></router-view>
        </div>
      </div>
      <control-bar song="https://i.kym-cdn.com/photos/images/original/001/400/708/698"></control-bar>
    </div>
  </div>
</template>

<script>
import ControlBar from "./components/layout/ControlBar.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import WindowControlBar from "./components/layout/WindowControlBar.vue";
let page_store = "Songs";
let songs_toggle = "current-page",
  artists_toggle = "",
  albums_toggle = "",
  playlists_toggle = "";

function going_to(going_to_page) {
  console.log(going_to_page);
  if (going_to_page != page_store) {
    if ((page_store = "Songs")) {
      songs_toggle = "";
    }
    if ((page_store = "Artists")) {
      songs_toggle = "";
    }
    if ((page_store = "Albums")) {
      songs_toggle = "";
    }
    if ((page_store = "Playlists")) {
      songs_toggle = "";
    }
    if ((going_to_page = "Songs")) {
      songs_toggle = "current-page";
    }
    if ((going_to_page = "Artists")) {
      songs_toggle = "current-page";
    }
    if ((going_to_page = "Albums")) {
      songs_toggle = "current-page";
    }
    if ((going_to_page = "Playlists")) {
      songs_toggle = "current-page";
    }
    page_store = going_to_page;
  }
}

export default {
  name: "refracture-music",
  components: {
    WindowControlBar,
    ControlBar,
    Sidebar
  },
  data() {
    return {
      state: "open"
    };
  },
  methods: {
    sidebar_toggle() {
      if (this.$data.state == "closed") {
        this.$data.state = "open";
      } else {
        this.$data.state = "closed";
      }
    },
    current_page(test) {
      let temp = [
        songs_toggle,
        artists_toggle,
        albums_toggle,
        playlists_toggle
      ];
      return temp[test];
    },
    going_to(going_to_page) {
      console.log(going_to_page);
      if (going_to_page != page_store) {
        if ((page_store = "Songs")) {
          songs_toggle = "";
        }
        if ((page_store = "Artists")) {
          songs_toggle = "";
        }
        if ((page_store = "Albums")) {
          songs_toggle = "";
        }
        if ((page_store = "Playlists")) {
          songs_toggle = "";
        }
        if ((going_to_page = "Songs")) {
          songs_toggle = "current-page";
        }
        if ((going_to_page = "Artists")) {
          songs_toggle = "current-page";
        }
        if ((going_to_page = "Albums")) {
          songs_toggle = "current-page";
        }
        if ((going_to_page = "Playlists")) {
          songs_toggle = "current-page";
        }
        page_store = going_to_page;
      }
    }
  }
};
</script>

<style lang="less">
/* cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu72xKOzY.woff2)
      format("woff2");
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
    U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu5mxKOzY.woff2)
      format("woff2");
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7mxKOzY.woff2)
      format("woff2");
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4WxKOzY.woff2)
      format("woff2");
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7WxKOzY.woff2)
      format("woff2");
  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7GxKOzY.woff2)
      format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2)
      format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@import "./variables.less";
body {
  background: @background-primary;
  color: @accent-primary;
}
@sidebar-width: 20%;
::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.6rem;
}

::-webkit-scrollbar-track {
  background: transparent;
  border: none;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.3rem;
    transition: 500ms;
  }
}

::-webkit-scrollbar-thumb {
  background: @accent-primary;
  border-radius: 0.3rem;
  &:hover {
    background: @accent-secondary;
    transition: 700ms;
  }
}

::-webkit-scrollbar-corner {
  background: transparent;
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
}

.sidebar_top {
  display: flex;
}

.sidebar_title {
  float: left;
  & > img {
    min-width: 100px;
    width: 100%;
  }
}

a.sidebar_toggle_x {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 0.8rem;
}

div.sidebar_toggle_x {
  margin-top: -10rem;
  float: right;
}

.sidebar_content {
  display: none;
  margin-top: 2vh;
  margin-left: 1vw;
  & div > p {
    padding-left: 1rem;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    font-size: 1.3rem;
    transition: padding-left 0.1s;
    color: @accent-secondary;
    transition: color 0.05s;
    &:hover {
      padding-left: 1.6rem;
      transition: margin-left 0.1s;
      color: @accent-primary;
      transition: color 0.05s;
    }
    & > a {
      color: @accent-secondary;
      transition: color 0.05s;
      &:hover {
        text-decoration: none;
        color: @accent-primary;
        transition: color 0.05s;
      }
    }
    & .current-category {
      color: @accent-primary;
      &:hover {
        &::before {
          padding-left: 1rem;
        }
      }
    }
  }
  & > .bottom-items {
    display: flex;
    align-items: center;
    height: -webkit-fill-available;
    & .bottom-items-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    & .left {
      float: left;
    }
    & .right {
      width: 3vw;
      height: 3vw;
      background: @background-primary;
      border-radius: 1vw;
      padding: 0.3rem;
      float: right;
      margin-left: auto;
      margin-right: 1vw;
      color: @accent-secondary;
      cursor: pointer !important;
      transition: border-radius 0.05s;
      & > svg {
        cursor: inherit;
      }
      &:hover {
        color: @accent-primary;
        border-radius: 0.5vw;
        transition: border-radius 0.05s;
      }
    }
  }
}

footer {
  width: 100%;
  display: flex;
  background: @background-thirdindary;
  height: 20vh;
}

.now_playing {
  height: 100%;
  width: 100%;
  display: inline-flex;
  & > .album-art {
    height: 12.5vh;
    & > img {
      height: 12.5vh;
      padding: none !important;
      margin: 1.5vh;
      object-fit: contain;
    }
  }
  & > .song-info {
    margin-top: 1.5vh;
    & > p {
      overflow: hidden;
      white-space: nowrap;
      &.song {
        font-size: 1.5rem;
      }
      &.artist {
        font-size: 1.2rem;
      }
    }
  }
  & > center {
    margin-top: 0.9vh;
    height: 100%;
  }
}

.media-buttons {
  display: inline-flex;
  margin-top: -0.8vh;
  margin-bottom: 0.8vh;
}

center.controls {
  margin-top: 2vh;
}

.media-controls {
  cursor: pointer;
  color: @accent-secondary;
  height: 2.8rem;
  width: 2.8rem;
  margin: 0.5rem;
  &:hover {
    color: @accent-primary;
  }
  & > div {
    & > svg {
      height: 2.8rem;
      width: 2.8rem;
    }
    &.play {
      display: none;
    }
    &.saved {
      display: none;
    }
  }
  &.back > div > svg {
    transform: rotate(180deg);
  }
}

@trackbar-height: 0.63rem;
.trackbar {
  display: inline-flex;
  & > .timestamp {
    margin-top: -0.4vh;
    padding-left: 0.2vw;
    padding-right: 0.2vw;
  }
  & > div > .bar {
    overflow: hidden;
    width: 60vw;
    height: 0.5rem;
    -webkit-appearance: none;
    background-color: @accent-secondary;
    &:focus {
      outline: 0 none !important;
    }
    cursor: pointer;
    &::-webkit-slider-runnable-track {
      height: @trackbar-height;
      -webkit-appearance: none;
      color: @accent-primary;
      margin-top: -1px;
    }
    &::-webkit-slider-thumb {
      // padding: 0 0 0 0;
      width: 0;
      height: 0;
      -webkit-appearance: none;
      border-radius: 0.4rem;
      cursor: pointer;
      background: transparent;
      transition: width 0.5s;
      transition: background 0.5s;
      transition: box-shadow 0.5s;
      box-shadow: -100.5vw 0 0 100vw @accent-primary;
    }
    &:hover {
      height: @trackbar-height;
      &::-webkit-slider-thumb {
        transition: width 0.5s;
        transition: background 0.5s;
        transition: box-shadow 0.5s;
        width: @trackbar-height;
        height: @trackbar-height;
        background: @background-primary;
      }
    }
  }
}

.sidebar_open {
  .sidebar_content {
    display: none;
    transition: display 0.2s;
  }
  .sidebar {
    width: 0px !important;
    transition: width 0.2s;
  }
  .sidebar-top {
    width: 0px !important;
    transition: width 0.2s;
  }
  .sidebar-bottom {
    width: 0px !important;
    transition: width 0.2s;
  }
  .sidebar_toggle {
    margin-left: 0.5rem !important;
    transition: margin-left 0.2s;
  }
  div.sidebar_toggle_x {
    margin-top: -10rem !important;
    transition: margin-top 0.2s;
  }
  .bar {
    width: 78vw !important;
    transition: width 0.2s;
  }
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
  & .current-page {
    color: @accent-primary;
  }
}
</style>
