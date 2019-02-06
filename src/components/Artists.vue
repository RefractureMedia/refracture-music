<template>
  <dyler>
    <dyle
      v-for="artist of artists"
      v-bind:key="artist"
      :art="artist.art[artist.art.length - 1]"
      :title="artist.name"
    ></dyle>
  </dyler>
</template>

<script>
import Dyler from "./dyler/Dyler.vue";
import Dyle from "./dyler/dyle";

export default {
  name: "artists",
  props: ["artists"],
  components: {
    Dyler,
    Dyle
  }
};
</script>

<style>
</style>
