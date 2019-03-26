<template>
  <dyler>
    <dyle
      v-for="album of albums"
      v-bind:key="album"
      :art="album.art[album.art.length - 1]"
      :title="album.title"
    ></dyle>
  </dyler>
</template>

<script>
import Dyler from "./dyler/Dyler.vue";
import Dyle from "./dyler/Dyle.vue";

export default {
  name: "albums",
  props: ["albums"],
  components: {
    Dyler,
    Dyle
  }
};
</script>

<style>
</style>
