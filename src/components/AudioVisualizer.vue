<template>
  <div :style="{ '--av-height': avHeight }">
    <div class="av" ref="av" v-if="playlist">
      <!-- The canvas component with visualizations -->
      <av-canvas
      :audioAnalyser="myAnalyser"
      @pauseSong="evalSong"
      @prevSong="prevSong"
      @nextSong="nextSong"
      @lowerVolume="lowerVolume"
      @raiseVolume="raiseVolume"/>

      <!-- HTML5 Audio -->
      <audio
      autoplay
      src="static/spitfire.mp3"
      type="audio/mp3"
      ref="myAudio"
      @timeupdate='onTimeUpdateListener'
      @ended="handleSongEnd"></audio>
    </div>
  </div>
</template>

<script>
import AvCanvas from './AvCanvas/AvCanvas'
import * as Utils from '../utils/utils.js'
import Vue from 'vue'
export default {
  name: 'AudioVisualizer',
  mounted: function () {
    this.volume.volumeBar = this.$refs.volumeBar
    this.volume.volumeLeft = this.$refs.volumeLeft
    this.setAnalyser()
    this.updateVolumeBar()
  },
  props: {
    avHeight: {
      type: String,
      default: '72px'
    },
    canvas: {
      type: Boolean,
      default: false
    },
    playlist: {
      type: Array,
      default: null
    }
  },
  components: { AvCanvas },
  data () {
    return {
      myAudioPlayer: null,
      volumeBar: null,
      myAnalyser: null,
      currentSong: 0,
      isShuffling: false,
      repeatVal: 0, // 0 -> repeat none, 1 -> repeat one, 2 -> repeat all
      isShowing: {
        playlist: true,
        showVis: true
      },
      songControls: {
        songPercent: 0,
        songTime: '',
        songDuration: '',
        songPaused: true
      },
      volume: {
        volumeBar: null,
        volumeLeft: null
      },
      togglers: {
        showVolumeSlider: false
      }
    }
  },
  computed: {
    computedPlaylist () {
      if (this.isShuffling) {
        return Utils.shuffle(this.playlist)
      }
      return this.playlist
    }
  },
  mounted() {
    this.showCanvas();
  },
  methods: {
    showCanvas () {
      this.isShowing.showVis = !this.isShowing.showVis
      this.isShowing.showVis ? this.$refs.av.style.height = '100%' : this.$refs.av.style.height = 'auto'
    },
    setAnalyser: function () {
      const ctx = new AudioContext()
      const src = ctx.createMediaElementSource(this.$refs.myAudio)
      ctx.crossOrigin = 'anonymous'
      this.$refs.myAudio.crossOrigin = 'anonymous'
      this.myAnalyser = ctx.createAnalyser()
      src.connect(this.myAnalyser)
      this.myAnalyser.fftSize = 32768
      this.myAnalyser.connect(ctx.destination)
    }
  }
}
</script>

<style lang="css" scoped>
.av {
  width: 100vw;
  color: white;
  user-select: none;
}
.av__audio {
  width: 100%;
  height: var(--av-height);
  background: #282828;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .15);
}
.av__audio__meta {
  height: inherit;
  width: auto;
  max-width: 25%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
