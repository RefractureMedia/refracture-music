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
            <div class="grow-cell entry song_art">
              <div class="songs_art">
                <img
                  v-bind:src="song.data.metadata.data.album.data.art[song.data.metadata.data.album.data.art.length - 1]"
                  width="100%"
                  height="100%"
                >
              </div>
            </div>
            <div class="grow-cell entry no_song_art">
            </div>
            <div class="grow-cell entry text">
              <span v-for="(artist, index) in song.data.metadata.data.artists" v-bind:key="artist">
                <a v-on:click="openArtist(artist)">{{ artist.data.name }}</a>
                <span
                  v-if="song.data.metadata.data.artists.length > 1 && index != song.data.metadata.data.artists.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </div>
            <div class="grow-cell seperator">-</div>
            <div class="grow-cell entry text">
              {{ song.data.metadata.data.title }}
              <span v-if="song.data.metadata.data.featuring">
                ft.
                <span v-for="(feature, index) in song.featuring" v-bind:key="feature">
                  <a v-on:click="openArtist(feature)">{{ feature.data.name }}</a>
                  <span
                    v-if="song.data.metadata.data.featuring.length > 1 && index != song.data.metadata.data.featuring.length-1"
                  >&amp;{{ ' ' }}</span>
                </span>
              </span>
            </div>
            <div class="grow-cell seperator">-</div>
            <div class="grow-cell entry text">
              {{ song.data.metadata.data.album.data.title }}
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
    >
      <div class="grow-container">
        <div class="grow song" style="grid-template-columns: 5rem auto 5%;grid-template-areas: 'left left right';height: 4rem;padding: .1rem .1rem .1rem .4rem;" v-for="song in songs" v-bind:key="song" v-on:click="setSong(song)">
          <div class="grow-cell entry">
            <div style="width: 4rem; height: 4rem;" class="songs_art">
              <img
                v-bind:src="song.data.metadata.data.album.data.art[song.data.metadata.data.album.data.art.length - 1]"
                width="100%"
                height="100%"
              >
            </div>
          </div>
          <div class="grow-cell entry text">
            {{ song.data.metadata.data.title }}
            <span v-if="song.data.metadata.data.featuring[0]">
              ft.
              <span v-for="(feature, index) in song.data.metadata.data.featuring" v-bind:key="feature">
                <a>{{ feature.data.name }}</a>
                <span
                  v-if="song.data.metadata.data.featuring.length > 1 && index != song.data.metadata.data.featuring.length-1"
                >&amp;{{ ' ' }}</span>
              </span>
            </span>
            <br>
            <span v-for="(artist, index) in song.data.metadata.data.artists" v-bind:key="artist">
              <a>{{ artist.data.name }}</a>
              <span
                v-if="song.data.metadata.data.artists.length > 1 && index != song.data.metadata.data.artists.length-1"
              >&amp;{{ ' ' }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Desk from "./desk/Desk.vue";
import DeskRow from "./desk/Row.vue";
import ControlButton from "./layout/MediaBar/ControlButton.vue";
import request from "request";
import keys from "./../keys.js";
import getArtist from "./../assets/js/artist.js";

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
    },
    openArtist(artist) {
      getArtist(artist, keys);
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
      grid-template-columns: auto 1fr .1fr 1fr .1fr 1fr .1fr .35fr;
      width: 85%;
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
      overflow-x: hidden;
      overflow-y: hidden;
      white-space: nowrap;
      &.song_art {
         @media (max-width: 41.5rem) { display: none; }
      }
            &.no_song_art {
         @media (min-width: 41.5rem) { display: none; }
      }
      .songs_art {
        margin-left: .5rem;
        width: 4rem;
        height: 4rem;
      }
      &.text {
        padding-left: .5rem;
        margin-right: .5rem;
      }
    }
    .seperator {
      align-self: center;
    }
    .button {
      align-self: center;
      display: grid;
      overflow-x: hidden;
    }
  }
}
</style>
