<template>
  <dyler>
    <dyle
      v-for="album of albums"
      v-bind:key="album"
      :art="album.art[album.art.length - 1]"
      :title="album.title"
      type="album"
      v-on:click.native="open_album(album)"
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
      console.log(encodeURI(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${album.artists.join(" & ")}&album=${album.title}&api_key=${keys.lastfm}&format=json`));
      request(
        encodeURI(`https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${album.artists[0]}&album=${album.title}&api_key=${keys.lastfm}&format=json`),
        (err, res, dat) => {
          let data = JSON.parse(dat)
          if (err) console.log(err);
          else {
            console.log(data);
            let songs = []
            /*for (let track of data.album.tracks.track) {
              songs.push({
                artists: 
              })
            }*/
            //this.$parent.$parent.$parent.open_modal("album", { album: album, songs: data.album.tracks.})
            // this.$data.modal.active = true;
          }
        }
      )
      //this.$parent.$parent.$parent.$parent.open_modal(type, { title: album.title, artists: album.artists.join(' & '), songs: [] })
    }
  }
};
</script>

<style>
</style>
