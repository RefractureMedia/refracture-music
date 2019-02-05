<template>
  <songs :songs="library.songs" :currentSong="currentSong" :player="player"/>
</template>

<script>
import Desk from "../../components/desk/Desk.vue";
import DeskRow from "../../components/desk/Row.vue";
import ControlButton from "./../../components/layout/MediaBar/ControlButton.vue";
export default {
  components: {
    Artists
  },
  props: ["library", "currentSong", "player"]
};
</script>

<style lang="less">
@import "./../../assets/less/variables.less";
.songArtist {
  color: @accent-secondary !important;
}
.songContainer {
  overflow: scroll;
  height: 58vh;
}
</style>
