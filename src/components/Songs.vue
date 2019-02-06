<template>
  <div>
    <center>
      <div v-if="displayHeader">
        <desk>
          <desk-row class="header">
            <div class="divTableCell">
              <div style="width: 1.1rem"></div>
            </div>
            <div class="divTableCell">Artist</div>
            <div class="divTableCell">Title</div>
            <div class="divTableCell">Album</div>
          </desk-row>
        </desk>
      </div>
      <div
        v-if="$parent.$parent.md().os() != 'AndroidOS' && $parent.$parent.md().os() != 'iOS'"
        v-bind:class="songContainer"
      >
        <desk>
          <desk-row v-for="song in songs" v-bind:key="song" class="song">
            <div class="divTableCell">
              <div style="width: 4.5rem; height: 4.5rem;" class="songs_art">
                <img
                  v-bind:src="song.album.art[song.album.art.length - 1]"
                  width="100%"
                  height="100%"
                >
              </div>
            </div>
            <div class="divTableCell detail">
              <span v-for="(artist, index) in song.artists" v-bind:key="artist">
                <a>{{ artist }}</a>
                <span
                  v-if="song.artists.length > 1 && index != song.artists.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </div>
            <div class="divTableCell detail">
              {{ song.title }}
              <span v-if="song.featuring[0]">
                ft.
                <span v-for="(feature, index) in song.featuring" v-bind:key="feature">
                  <a>{{ feature }}</a>
                  <span
                    v-if="song.featuring.length > 1 && index != song.featuring.length-1"
                  >&amp;{{ ' ' }}</span>
                </span>
              </span>
            </div>
            <div class="divTableCell detail">{{ song.album.title }}</div>
            <div class="divTableCell" style="display: flex; vertical-align: top; margin-top: auto;">
              <div v-on:click="setSong(song)">
                <control-button icon="play"></control-button>
              </div>
            </div>
          </desk-row>
        </desk>
      </div>
    </center>
    <div
      v-if="$parent.$parent.md().os() == 'AndroidOS' || $parent.$parent.md().os() == 'iOS'"
      v-bind:class="songContainer"
    >
      <desk>
        <desk-row v-for="song in songs" v-on:click="setSong(song)" v-bind:key="song" class="song">
          <div class="divTableCell">
            <div
              style="width: 4.5rem; height: 4.5rem;"

              class="songs_art"
            >
              <img
                v-bind:src="song.album.art[song.album.art.length - 1]"
                width="100%"
                height="100%"
              >
            </div>
          </div>
          <div class="divTableCell detail">
            {{ song.title }}
            <span v-if="song.featuring[0] != ''">
              ft.
              <span v-for="(feature, index) in song.featuring" v-bind:key="feature">
                <a>{{ feature }}</a>
                <span
                  v-if="song.featuring.length > 1 && index != song.featuring.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </span>
            <br>
            <span v-for="(artist, index) in song.artists" v-bind:key="artist">
              <a class="songArtist">{{ artist }}</a>
              <span
                v-if="song.artists.length > 1 && index != song.artists.length-1"
                class="songArtist"
              >&amp;{{ ' ' }}</span>
            </span>
          </div>
        </desk-row>
      </desk>
    </div>
  </div>
</template>

<script>
import Desk from "./desk/Desk.vue";
import DeskRow from "./desk/Row.vue";
import ControlButton from "./layout/MediaBar/ControlButton.vue";

export default {
  name: "artists",
  props: ["songs", "currentSong", "player", "displayHeader", "songContainer"],
  components: {
    Desk,
    DeskRow,
    ControlButton
  },
  methods: {
    setSong(song) {
      this.$parent.$parent.setCurrentSong(song);
    }
  }
};
</script>

<style lang="less">
@import "./../assets/less/variables.less";
.songArtist {
  color: @accent-secondary !important;
}
.songContainer {
  overflow: scroll;
  height: 58vh;
}
</style>
