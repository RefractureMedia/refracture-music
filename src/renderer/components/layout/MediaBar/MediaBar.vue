<template>
  <footer class="clear">
    <div v-bind:class="'sidebar sidebar-bottom sidebar_' + state">
      <div class="version sidebar_content">
        <p>Version {{ version }}</p>
      </div>
    </div>
    <div class="now_playing">
      <div class="album-art">
        <img id="album-art" :src="song">
      </div>
      <div id="song-info" class="song-info">
        <p class="song">{{song.name}}</p>
        <p class="artist">{{song.artist}}</p>
      </div>
      <center class="controls" id="controls">
        <controls />
        <div class="trackbar">
          <div class="timestamp through">{{ song.currentTime }}</div>
          <div class="trackbar-center">
            <input type="range" min="0" max="192" value="1" class="bar" id="bar" onclick="time_change();">
          </div>
          <div class="timestamp total"> {{ song.duration }}</div>
        </div>
      </center>
    </div>
  </footer>
</template>

<script>
import Controls from "./Controls.vue"
export default {
  name: "media-bar",
  props: ["song", "state"],
  components: { Controls },
  mounted() {
    this.$nextTick(function() {
      document.getElementById("controls").style.marginLeft = String(
        "-" + document.getElementById("song-info").clientWidth + "px"
      )
    }, 100)
  },
  updated() {
    document.getElementById("controls").style.marginLeft = String(
      "-" + document.getElementById("song-info").clientWidth + "px"
    )
  },
  methods: {
    toggleRepeatState() {
      if ($parent.currentSong.player.loop)
        $parent.currentSong.player.loop = false
      else $parent.currentSong.player.loop = true
    },
    togglePlayingState() {
      if (this.$parent.player.paused) {
        this.$parent.player.play()
      } else this.$parent.player.pause()
    },
    toggleShuffleState() {
      // if ($parent.queue.shuffle) $parent.queue.shuffle = false
      // else $parent.queue.shuffle = true
    },
    toggleSavedState() {},
    previousSong() {},
    nextSong() {
      $parent.currentSong.player.currentSrc =
        $parent.songQueue[$parent.currentSong.numberInQueue].src
    }
  }
}
</script>

<style lang="less" scoped>
@import "./../../../variables.less";

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
    height: 100%;
  }
}

.media-buttons {
  display: inline-flex;
  margin-top: -0.8vh;
  margin-bottom: 0.8vh;
  height: (1rem + 3rem);
}

.controls {
  margin-top: 2vh;
}

@trackbar-height: 0.63rem;
.trackbar {
  display: inline-flex;
  & .timestamp {
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

.version {
  height: 100%;
  text-align: center;
  position: relative;
  & p {
    width: 100%;
    position: absolute;
    bottom: 0;
    margin-bottom: 6vh;
  }
}
</style>
