<template>
  <center>
    <input type="url" name="youtubeURL" class="browseSearch" placeholder="Search">
    <div id="submitBrowseSearch" v-on:click="$parent.browseSearch" style="display: none;"></div>
    <div v-if="results.songs.length == 0 && results.artists.length == 0 && results.albums.length == 0 && results.youtube.length == 0">
      <h2>Recently Browsed</h2>
      <songs :library="recentlyBrowsed" />
    </div>

  </center>
</template>

<script>
import Songs from "./../Library/Songs.vue"
import Artists from "./../Library/Artists.vue"
import Albums from "./../Library/Albums.vue"

export default {
  props: ['results'],
  data() {
    return {
      recentlyBrowsed: {
        songs: [
          {
            artists: ["Noisestorm"],
            title: "Crab Rave",
            featuring: [""],
            album: "Crab Rave - Single",
            art: "https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/6f/c2/ad/6fc2ad48-f80b-bf7b-522a-f9bbaf4b46da/source/1000x1000bb.jpg",
            cachedLink: ""
          }
        ]
      }
    }
  },
  mounted() {
    document
      .getElementsByClassName("browseSearch")[0]
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          document.getElementById("submitBrowseSearch").click()
          event.preventDefault()
          return false
        }
      })
    document.getElementsByClassName("browseSearch")[0].preventDefault()
  }
}
</script>

<style lang="less">
@import "../../assets/less/variables.less";
.browseSearch {
  background: @background-secondary;
  border: none;
  height: 3rem;
  width: 35rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: @accent-primary;
  outline-color: transparent !important;
  cursor: text;
  &::placeholder {
    color: @accent-secondary;
  }
}
</style>