<template>
  <div class="media-buttons">
    <control-button icon="save"></control-button>
    <control-button icon="repeat"></control-button>
    <control-button icon="back"></control-button>
    <div class="update_pause" style="display: none;" ref="pause_test" v-on:click="$parent.$parent.$data.player.paused ? $parent.$parent.$data.player.play() : $parent.$parent.$data.player.pause()">
      <control-button icon="pause"></control-button>
    </div>
    <div class="update_play" style="display: initial;" ref="play_test" v-on:click="$parent.$parent.$data.player.paused ? $parent.$parent.$data.player.play() : $parent.$parent.$data.player.pause()">
      <control-button icon="play"></control-button>
    </div>
    <control-button icon="skip"></control-button>
    <control-button icon="shuffle"></control-button>
    <control-button icon="more"></control-button>
  </div>
</template>

<script>
import ControlButton from "./ControlButton.vue"

export default {
  name: "controls",
  components: { ControlButton },
  data() {
    return { isPaused: true }
  },
  methods: {
    togglePlayingState: function(event) {
      if (this.$parent.$parent.$data.player.paused) {
        this.$data.isPaused = false
        this.$parent.$parent.$data.player.play()
      } else {
        this.$parent.$parent.$data.player.pause()
        this.$data.isPaused = true
      }
    },
    toggleSavedState: function() {
      notify("Song")
    }
  },
  mounted() {
    
  }
}
</script>

<style lang="less">
.media-buttons {
  display: inline-flex;
  margin-top: -0.8vh;
  margin-bottom: 0.8vh;
  height: (1rem + 3rem);
}
</style>