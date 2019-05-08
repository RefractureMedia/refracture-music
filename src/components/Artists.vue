<template>
  <dyler>
    <dyle
      v-for="artist of artists"
      v-bind:key="artist"
      :art="artist.data.art[artist.data.art.length - 1]"
      :title="artist.data.name"
      v-on:click.native="open_artist(artist)"
    ></dyle>
  </dyler>
</template>

<script>
import Dyler from "./dyler/Dyler.vue";
import Dyle from "./dyler/Dyle.vue";
import getArtist from "./../assets/js/artist.js";
import keys from "./../keys.js";

export default {
  name: "artists",
  props: ["artists"],
  components: {
    Dyler,
    Dyle
  },
  methods: {
    open_artist(artist) {
      this.$root.$children[0].open_modal('artist',artist);
    }
  }
};
</script>

<style>
</style>
