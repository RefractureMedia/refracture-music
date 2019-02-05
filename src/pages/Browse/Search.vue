<template>
  <center>
    <input type="url" name="youtubeURL" class="browseSearch" placeholder="Search">
    <div id="submitBrowseSearch" v-on:click="$parent.browseSearch" style="display: none;"></div>
    <div v-if="results.songs.length == 0 && results.artists.length == 0 && results.albums.length == 0 && results.youtube.length == 0">
      <h2>Recently Browsed</h2>
      <songs :songs="recentlyBrowsed.songs" :currentSong="currentSong" :player="player"/>
    </div>
    <div v-if="results.songs.length > 0">
      <h2>Songs</h2>
      <songs :songs="results.songs" :currentSong="currentSong" :player="player"/>
    </div>
    <a v-on:click="log_results">GTSFDFASDFS</a>

  </center>
</template>

<script>
import Songs from "./../../components/Songs.vue"
import Artists from "./../../components/Artists.vue"
import Albums from "./../../components/Albums.vue"

export default {
  props: ['currentSong','player','results'],
  components: {
    Songs,
    Artists,
    Albums
  },
  data() {
    return {
      recentlyBrowsed: {
        songs: [
          {
            artists: ["Noisestorm"],
            title: "Crab Rave",
            featuring: [""],
            album: {
              artists: ["Noisestorm"],
              title: "Crab Rave - Single",
              art: ["https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/6f/c2/ad/6fc2ad48-f80b-bf7b-522a-f9bbaf4b46da/source/1000x1000bb.jpg"],
            },
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
  },
  methods: {
    log_results() {
      console.log(this.$props.results)
    }
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