<template>
  <div class="control">
    <div class="now_playing">
      <div class="album-art">
        <img id="album-art" 
          :src="root_data().currentSong.song.data.metadata.data.album.data.art.slice(-1).pop()"
          :style="root_data().currentSong.song.data.metadata.data.album.data.art.slice(-1).pop().includes('ytimg') ? 'object-fit: none !important;': ''"
        >
      </div>
      <div id="song-info" class="song-info" v-if="$parent.md().os() != 'AndroidOS' && $parent.md().os() != 'iOS'">
        <p>
          {{ root_data().currentSong.song.data.metadata.data.title }}
          <!--<span v-if="root_data().currentSong.song.data.metadata.data.featuring">
            ft.
            <span v-for="(feature, index) of root_data().currentSong.song.data.metadata.data.featuring" v-bind:key="feature">
              <a>{{ feature.data.name }}</a>
              <span v-if="root_data().currentSong.song.data.metadata.data.featuring.length > 1 && index != root_data().currentSong.song.data.metadata.data.featuring.length-1">&amp;</span>
            </span>
          </span>-->
        </p>
        <p class="artist">
          <span v-for="(artist, index) of root_data().currentSong.song.data.metadata.data.artists" v-bind:key="artist">
            <a v-on:click="openArtist(artist)">{{ artist.data.name }}</a>
            <span v-if="root_data().currentSong.song.data.metadata.data.artists.length > 1 && index != root_data().currentSong.song.data.metadata.data.artists.length-1">{{ '&amp; '}}</span>
          </span>
        </p>
      </div>
      <div id="song-info" style="overflow: hidden;" class="song-info" v-if="$parent.md().os() == 'AndroidOS' || $parent.md().os() == 'iOS'">
        <p class="song" style="width: 100%;">
          {{ root_data().currentSong.song.data.metadata.data.title }}
          <span v-if="root_data().currentSong.song.data.metadata.data.featuring">
            ft.
            <span v-for="(feature, index) of root_data().currentSong.song.data.metadata.data.featuring" v-bind:key="feature">
              <a>{{ feature.data.name }}</a>
              <span v-if="root_data().currentSong.song.data.metadata.data.featuring.length > 1 && index != root_data().currentSong.song.data.metadata.data.featuring.length-1">&amp;</span>
            </span>
          </span>
        </p>
        <p class="artist" style="width: 100%;">
          <span v-for="(artist, index) of root_data().currentSong.song.data.metadata.data.artists" v-bind:key="artist">
            <a>{{ artist.data.name }}</a>
            <span v-if="root_data().currentSong.song.data.metadata.data.artists.length > 1 && index != root_data().currentSong.song.data.metadata.data.artists.length-1">{{ '&amp; '}}</span>
          </span>
        </p>
      </div>
      <center
        v-if="$parent.md().os() != 'AndroidOS' && $parent.md().os() != 'iOS'"
        class="controls"
        id="controls"
        style="width: 100%;"
      >
        <controls/>
        <br>
        <div class="trackbar">
          <div class="timestamp through">{{ root_data().currentSong.currentTime }}</div>
          <div class="trackbar-center" style="margin-top: -.25rem;">
            <input
              type="range"
              min="0"
              :max="root_data().player.duration"
              v-model="root_data().player.currentTime"
              class="bar"
              onclick="this.blur();"
            >
          </div>
          <div class="timestamp total">{{ root_data().currentSong.duration }}</div>
        </div>
      </center>
      <div style="display: grid;align-content: center;margin-left: 1rem;margin-right: 1rem;" v-if="$parent.md().os() == 'AndroidOS' || $parent.md().os() == 'iOS'">
        <div class="update_pause" style="display: none;" ref="pause_test" v-on:click="root_data().player.paused ? root_data().player.play() : root_data().player.pause()">
          <control-button icon="pause"></control-button>
        </div>
        <div class="update_play" style="display: initial;" ref="play_test" v-on:click="root_data().player.paused ? root_data().player.play() : root_data().player.pause()">
          <control-button icon="play"></control-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "./Controls.vue";
import ControlButton from "./ControlButton.vue";
import getArtist from "./../../../assets/js/artist.js";
import keys from "./../../../keys.js";

export default {
  name: "media-bar",
  props: ["song", "state"],
  components: { Controls, ControlButton },
  data() {
    return {
      version: "0.0.1",
      isPaused: true
    };
  },
  mounted() {
    this.$nextTick(function() {
      document.getElementById("controls").style.marginLeft = String(
        "-" + document.getElementById("song-info").clientWidth + "px"
      );
    }, 100);
  },
  updated() {
    document.getElementById("controls").style.marginLeft = String(
      "-" + document.getElementById("song-info").clientWidth + "px"
    );
  },
  methods: {
    onChg() {
      this.tmpVal = $.target.value;
    },
    toggleRepeatState() {
      if ($parent.currentSong.player.loop)
        $parent.currentSong.player.loop = false;
      else $parent.currentSong.player.loop = true;
    },
    togglePlayingState() {
      if (this.$parent.$data.player.paused) {
        this.$parent.$data.player.play();
      } else {
        this.$parent.$data.player.pause();
      }
    },
    toggleShuffleState() {
      // if ($parent.queue.shuffle) $parent.queue.shuffle = false
      // else $parent.queue.shuffle = true
    },
    toggleSavedState() {
      notify("Song");
    },
    previousSong() {},
    nextSong() {
      $parent.currentSong.player.currentSrc =
        $parent.songQueue[$parent.currentSong.numberInQueue].src;
    },
    play() {
      this.$parent.player.play();
      this.$data.isPaused = false;
    },
    pause() {
      this.$data.player.pause();
      this.$data.isPaused = true;
    },
    openArtist(artist) {
      getArtist(artist, keys);
    },
    root_data() {
      return this.$root.$children[0]._data;
    }
  }
};
</script>