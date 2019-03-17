<template>
  <songs
    :songs="library.songs"
    :currentSong="currentSong"
    :player="player"
    displayHeader="true"
    songContainer="songContainer"
    style="margin-left: .5rem; margin-top: 1rem;"
  />
</template>

<script>
import Songs from "./../../components/Songs.vue";

export default {
  components: {
    Songs
  },
  props: ["library", "currentSong", "player"]
};
</script>
