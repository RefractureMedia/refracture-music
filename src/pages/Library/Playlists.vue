<template>
  <center>
    <p>beats</p>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"
import ControlButton from "./../../components/layout/MediaBar/ControlButton.vue"
export default {
  components: {
    Desk,
    DeskRow,
    ControlButton
  },
  props: ["library", "currentSong", "player"],
  data() {
    return {}
  },
  methods: {
    togglePlayingState: function(event) {
      if (this.$parent.$data.player.paused) {
        this.$parent.$data.player.play()
      } else {
        this.$parent.$data.player.pause()
      }
    }
  },
  mounted() {}
}
</script>