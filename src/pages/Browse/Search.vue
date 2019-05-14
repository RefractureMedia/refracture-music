<template>
  <center>
    <input type="url" :name="getTime" class="browseSearch" v-model="$parent.search" placeholder="Search">
    <div id="submitBrowseSearch" v-on:click="$parent.browseSearch" style="display: none;"></div>
    <div
      v-if="results.songs.length == 0 && results.artists.length == 0 && results.albums.length == 0 && results.youtube.length == 0"
      style="padding-top: 3.5rem;"
    >
      <h2>Recently Browsed</h2>
      <songs :songs="recents.songs" :currentSong="currentSong" :player="player" style="margin-left: .5rem;"/>
    </div>
    <div class="searchResults" style="padding-top: 3.5rem;">
      <div v-if="results.songs.length > 0">
        <h2>Songs</h2>
        <a v-if="songsLimit==50" v-on:click="songsLimit=4">Hide Results</a>
        <songs
          :songs="results.songs.slice(0,songsLimit)"
          :currentSong="currentSong"
          :player="player"
          :browse="true"
          style="margin-left: .5rem;"
        />
        <a v-if="songsLimit!=50 && results.songs.length > 4" v-on:click="songsLimit=50">More Results</a>
        <a v-if="songsLimit==50" v-on:click="songsLimit=4">Hide Results</a>
      </div>
      <div v-if="results.albums.length > 0">
        <h2>Albums</h2>
        <a v-if="albumsLimit==50" v-on:click="albumsLimit=4">Hide Results</a>
        <albums :albums="results.albums.slice(0,albumsLimit)"/>
        <a
          v-if="albumsLimit!=50 && results.albums.length > 4"
          v-on:click="albumsLimit=50"
        >More Results</a>
        <a v-if="albumsLimit==50" v-on:click="albumsLimit=4">Hide Results</a>
      </div>
      <div v-if="results.artists.length > 0">
        <h2>Artists</h2>
        <a v-if="artistsLimit==50" v-on:click="artistsLimit=4">Hide Results</a>
        <artists :artists="results.artists.slice(0,artistsLimit)" :limit="artistsLimit"/>
        <a
          v-if="artistsLimit!=50 && results.artists.length > 4"
          v-on:click="artistsLimit=50"
        >More Results</a>
        <a v-if="artistsLimit==50" v-on:click="artistsLimit=4">Hide Results</a>
      </div>
    </div>
  </center>
</template>

<script>
import Songs from "./../../components/Songs.vue";
import Artists from "./../../components/Artists.vue";
import Albums from "./../../components/Albums.vue";

export default {
  props: ["currentSong", "player", "results","recents"],
  components: {
    Songs,
    Artists,
    Albums
  },
  data() {
    return {
      songsLimit: 4,
      albumsLimit: 4,
      artistsLimit: 4
    };
  },
  mounted() {
    this.$parent._data.searchResults.songs = [];
    this.$parent._data.searchResults.artists = [];
    this.$parent._data.searchResults.albums = [];
    document
      .getElementsByClassName("browseSearch")[0]
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          escape_input()
          document.getElementById("submitBrowseSearch").click();
          event.preventDefault();
          return false;
        }
      });
    document.getElementsByClassName("browseSearch")[0].preventDefault();
  },
  methods: {
    getTime() {
      return Date.getTime();
    }
  }
};

function escape_input() {
  document.activeElement.blur();
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
  position: absolute;
  transform: translate(-50%,0);
  margin-top: .5rem;
  font-family: Roboto;
  cursor: text;
  &::placeholder {
    color: @accent-secondary;
  }
}
</style>