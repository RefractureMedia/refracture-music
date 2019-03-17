<template>
  <div>
    <center>
      <div v-if="$parent.$parent.md().os() != 'AndroidOS' && $parent.$parent.md().os() != 'iOS' && displayHeader">
        <div class="grow-container">
          <div class="grow listheader">
            <div class="grow-cell entry">
              <div
                style="width: 4rem;"
                class="songs_art"
              >
              </div>
            </div>
            <div class="grow-cell entry">
              <span>Artist(s)</span>
            </div>
            <div class="grow-cell entry">
              <span>Title</span>
            </div>
            <div class="grow-cell entry">
              <span>Album</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="$parent.$parent.md().os() != 'AndroidOS' && $parent.$parent.md().os() != 'iOS'"
        v-bind:class="songContainer"
      >
        <div class="grow-container">
          <div class="grow song" v-for="song in songs" v-bind:key="song" v-on:dblclick="setSong(song)">
            <div class="grow-cell entry">
              <div style="width: 4rem; height: 4rem;" class="songs_art">
                <img
                  v-bind:src="song.album.art[song.album.art.length - 1]"
                  width="100%"
                  height="100%"
                >
              </div>
            </div>
            <div class="grow-cell entry">
              <span v-for="(artist, index) in song.artists" v-bind:key="artist">
                <a>{{ artist }}</a>
                <span
                  v-if="song.artists.length > 1 && index != song.artists.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </div>
            <div class="grow-cell seperator">-</div>
            <div class="grow-cell entry">
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
            <div class="grow-cell seperator">-</div>
            <div class="grow-cell entry">
              {{ song.album.title }}
            </div>
            <div class="grow-cell seperator">-</div>
            <div class="grow-cell button">
              <div v-on:click="setSong(song)" style="justify-content: right; margin-right: .5rem;">
                <control-button icon="play"></control-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
    <div
      v-if="$parent.$parent.md().os() == 'AndroidOS' || $parent.$parent.md().os() == 'iOS'"
      v-bind:class="songContainer"
      style="margin-top: 3rem;"
    >
      <desk>
        <desk-row v-for="song in songs" v-bind:key="song" class="song">
          <div class="divTableCell">
            <div
              style="width: 4.5rem; height: 4.5rem;"
              v-on:click="setSong(song)"
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

.song {
  &:hover {
    background: rgba(0,0,0,.2);
  }
}

.grow-container {
  display: grid;
  margin-right: .5rem;
  .grow {
    display: grid;
    &.song {
      grid-template-columns: 5rem 26% max-content 26% max-content 26% max-content 5%;
      grid-template-areas: "left left left left left left left left right";
      height: 5rem;
      margin-bottom: .2rem;
      cursor: pointer;
      * {
        cursor: pointer;
      }
      &:hover {
        background: rgba(0,0,0,.2);
        border-radius: .5rem;
      }
    }
    &.listheader {
      grid-template-columns: 5.3rem 26% 26% 26%;
      grid-template-areas: "left left left left left left left left right";
      height: 1.5rem;
      margin-bottom: 1rem;
    }
    .entry {
      justify-content: center;
      align-self: center;
    }
    .seperator {
      align-self: center;
    }
    .button {
      align-self: center;
      grid-area: right;
      display: grid;
      justify-content: right;
    }
  }
}
</style>
