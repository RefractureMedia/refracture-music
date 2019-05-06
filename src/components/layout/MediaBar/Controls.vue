<template>
  <div class="media-buttons">
    <control-button icon="save"></control-button>
    <control-button icon="repeat"></control-button>
    <control-button icon="back"></control-button>
    <div class="update_pause" style="display: none;" ref="pause_test" v-on:click="root_data().player.paused ? root_data().player.play() : root_data().player.pause()">
      <control-button icon="pause"></control-button>
    </div>
    <div class="update_play" style="display: initial;" ref="play_test" v-on:click="root_data().player.paused ? root_data().player.play() : root_data().player.pause()">
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
    toggleSavedState: function() {
      notify("Song")
    },
    root_data() {
      return this.$root.$children[0]._data;
    }
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