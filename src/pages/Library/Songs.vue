<template>
  <songs :songs="library.songs" :currentSong="currentSong" :player="player"/>
</template>

<script>
import Songs from "./../../components/Songs.vue"

export default {
  components: {
    Songs
  },
  props: ["library", "currentSong", "player"]
};
</script>

