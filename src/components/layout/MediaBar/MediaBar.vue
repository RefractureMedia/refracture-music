<template>
  <footer class="clear">
    <div v-bind:class="'sidebar sidebar-bottom sidebar_' + state">
      <div class="version sidebar_content">
        <p>Version {{ version }}</p>
      </div>
    </div>
    <div class="now_playing">
      <div class="album-art">
        <img id="album-art" :src="song.meta.albumArt">
      </div>
      <div id="song-info" class="song-info">
        <p class="song">
          {{ song.meta.title }}
          <span v-if="song.meta.featuring[0] != ''">ft.
            <span v-for="(feature, index) of song.meta.featuring" v-bind:key="feature">
              <a>{{ feature }}</a>
              <span v-if="song.meta.featuring.length > 1 && index != song.meta.featuring.length-1">&amp;</span>
            </span>
          </span>
        </p>
        <p class="artist">
          <span v-for="(artist, index) of song.meta.artists" v-bind:key="artist">
            <a>{{ artist }}</a>
            <span v-if="song.meta.artists.length > 1 && index != song.meta.artists.length-1">&amp;</span>
          </span>
        </p>
      </div>
      <center class="controls" id="controls">
        <controls />
        <div class="trackbar">
          <div class="timestamp through">{{ song.currentTime }}</div>
          <div class="trackbar-center" style="margin-top: -.25rem;">
            <input type="range" min="0" :max="$parent.player.duration" v-model="$parent.player.currentTime" class="bar">
          </div>
          <div class="timestamp total">{{ song.duration }}</div>
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
  data() {
    return {
      version: "0.0.1"
    }
  },
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
    onChg() {
      this.tmpVal = $.target.value
    },
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