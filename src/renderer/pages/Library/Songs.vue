<template>
  <center>
    <div>
      <desk>
        <desk-row class="header">
          <div class="divTableCell">
            <div style="width: 1.1rem"></div>
          </div>
          <div class="divTableCell">Artist</div>
          <div class="divTableCell">Title</div>
          <div class="divTableCell">Album</div>
          <div class="divTableCell"></div>
        </desk-row>
      </desk>
    </div>
    <div style="overflow: scroll; height: 62vh;">
      <desk>
        <desk-row v-for="song in library.songs" v-bind:key="song" class="song">
          <div class="divTableCell">
            <div style="width: 4.5rem; height: 4.5rem;">
              <img v-bind:src="song.albumArt" width="100%" height="100%">
            </div>
          </div>
          <div class="divTableCell detail">
            <span v-for="(artist, index) of song.artists" v-bind:key="artist">
              <a>{{ artist }}</a>
              <span v-if="song.artists.length > 1 && index != song.artists.length-1">&amp;{{ ' ' }}</span>
            </span>
          </div>
          <div class="divTableCell detail">
            {{ song.title }}
            <span v-if="song.featuring[0] != ''">
              ft.
              <span v-for="(feature, index) of song.featuring" v-bind:key="feature">
                <a>{{ feature }}</a>
                <span
                  v-if="song.featuring.length > 1 && index != song.featuring.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </span>
          </div>
          <div class="divTableCell detail">{{ song.album }}</div>
          <div class="divTableCell">
            <div v-if="currentSong != song" v-on:click="player.src=song.cachedLink">
              <control-button icon="play"></control-button>
            </div>
            <div v-if="currentSong == song && !player.paused" v-on:click="togglePlayingState();">
              <control-button icon="pause"></control-button>
            </div>
            <div v-if="currentSong == song && isPaused" v-on:click="togglePlayingState();">
              <control-button icon="play"></control-button>
            </div>
          </div>
        </desk-row>
      </desk>
    </div>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue";
import DeskRow from "../../components/desk/Row.vue";
import ControlButton from "./../../components/layout/MediaBar/ControlButton.vue";
export default {
  components: {
    Desk,
    DeskRow,
    ControlButton
  },
  props: ["library", "currentSong", "player"],
  data() {
    return {};
  },
  methods: {
    togglePlayingState: function(event) {
      if (this.$parent.$data.player.paused) {
        this.$parent.$data.player.play();
      } else {
        this.$parent.$data.player.pause();
      }
    },
    toggleSavedState: function() {
      console.log("a");
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@import "./../../variables.less";

.header {
  height: 1.5rem;
}
.divTableCell,
.divTableHead {
  display: table-cell;
}
.divTableHeading {
  display: table-header-group;
  font-weight: bold;
}
.detail {
  vertical-align: top;
  padding-top: 1.6rem;
}
.divTableFoot {
  display: table-footer-group;
  font-weight: bold;
}
</style>

