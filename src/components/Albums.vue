<template>
  <dyler>
    <dyle
      v-for="album of albums"
      v-bind:key="album"
      :art="album.data.art[album.data.art.length - 1]"
      :title="album.data.title"
      type="album"
      v-on:click.native="$root.$children[0].open_modal('album', album)"
    ></dyle>
  </dyler>
</template>

<script>
import Dyler from "./dyler/Dyler.vue";
import Dyle from "./dyler/Dyle.vue";
import keys from "./../keys.js";
import request from "request";

export default {
  name: "albums",
  props: ["albums"],
  components: {
    Dyler,
    Dyle
  },
  methods: {
    open_album(album) {
    }
  }
};
</script>

<style>
</style>
