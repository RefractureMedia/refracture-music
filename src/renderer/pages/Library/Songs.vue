<template>
  <center>
    <desk>
      <desk-row class="header">
        <div class="divTableCell"></div>
        <div class="divTableCell">Artist(s)</div>
        <div class="divTableCell">Title</div>
        <div class="divTableCell">Album</div>
        <div class="divTableCell"></div>
      </desk-row>
      <desk-row v-for="song in library.songs" v-bind:key="song">
        <div class="divTableCell"><img v-bind:src="song.albumArt" width="50" height="50"></div>
        <div class="divTableCell">
          <span v-for="(artist, index) of song.artists" v-bind:key="artist"><a>{{ artist }}</a><span v-if="song.artists.length > 1 && index != song.artists.length-1"> &amp; </span></span>
        </div>
        <div class="divTableCell">{{ song.title }}<span v-if="song.featuring[0] != ''"> ft. <span v-for="(feature, index) of song.featuring" v-bind:key="feature"><a>{{ feature }}</a><span v-if="song.featuring.length > 1 && index != song.featuring.length-1"> &amp; </span></span></span></div>
        <div class="divTableCell">{{ song.album }}</div>
        <div class="divTableCell">
          <div v-if="currentSong == song && !player.paused" v-on:click="togglePlayingState();">
            <control-button icon="pause"></control-button>
          </div>
          <div v-if="currentSong != song || currentSong == song && player.paused" v-on:click="togglePlayingState();">
            <control-button icon="play"></control-button>
          </div>
        </div>
      </desk-row>
    </desk>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"
import ControlButton from "./../../components/layout/MediaBar/ControlButton.vue"
export default {
  components: {
    Desk,
    DeskRow
  },
  props: ['library','currentSong'],
  data() {
    return {
      
    }
  },
  methods: {
    togglePlayingState: function(event) {
      if (this.$parent.$data.player.paused) {
        this.$parent.$data.player.play()
      } else {
        this.$parent.$data.player.pause()
      }
    },
    toggleSavedState: function() {
      console.log("a")
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
@import "./../../variables.less";

.header {
  background-color: @background-secondary;
}
.divTableCell,
.divTableHead {
  border: 1px solid @background-secondary;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
</style>

