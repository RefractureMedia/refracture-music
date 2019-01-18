<template>
  <div id="app">
    <rf-sidebar></rf-sidebar>
    <router-view></router-view>
    <control-bar></control-bar>
  </div>
</template>

<script>
import ControlBar from "./components/layout/ControlBar.vue"
import Sidebar from "./components/layout/Sidebar.vue"

export default {
  name: "refracture-music",
  components: {
    ControlBar,
    Sidebar
  }
}
</script>

<style lang="less">
@import "./vendor/stylesheets/fonts/roboto.css";
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

a {
  color: @accent-primary;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

p {
  margin-block-end: 0;
  margin-block-start: 0;
}

.whole {
  height: 100%;
  margin-top: -0.1rem; // stop and look what i did i took the width of the control element (for the win and subtracted it)
  background: @background-primary;
}

.content {
  display: flex;
  height: 80vh;
}

#hide {
  display: none;
  visibility: hidden;
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
      cursor: pointer;
      transition: border-radius 0.05s;

      &:hover {
        color: @accent-primary;
        border-radius: 0.5vw;
        transition: border-radius 0.05s;
      }
    }
  }
}

.nav-bar {
  margin-top: -4vh;
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
    width: 78vw;
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
</style>
