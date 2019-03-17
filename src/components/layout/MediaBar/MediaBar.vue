<template>
  <div class="control">
    <div class="now_playing">
      <div class="album-art">
        <img id="album-art" :src="song.song.album.art[song.song.album.art.length-1]">
      </div>
      <div id="song-info" class="song-info" v-if="$parent.md().os() != 'AndroidOS' && $parent.md().os() != 'iOS'">
        <p class="song">
          {{ song.song.title }}
          <span v-if="song.song.featuring[0] != ''">
            ft.
            <span v-for="(feature, index) of song.song.featuring" v-bind:key="feature">
              <a>{{ feature }}</a>
              <span v-if="song.song.featuring.length > 1 && index != song.song.featuring.length-1">&amp;</span>
            </span>
          </span>
        </p>
        <p class="artist">
          <span v-for="(artist, index) of song.song.artists" v-bind:key="artist">
            <a>{{ artist }}</a>
            <span v-if="song.song.artists.length > 1 && index != song.song.artists.length-1">{{ '&amp; '}}</span>
          </span>
        </p>
      </div>
      <div id="song-info" style="display: grid;" class="song-info" v-if="$parent.md().os() == 'AndroidOS' || $parent.md().os() == 'iOS'">
        <marquee class="song" style="width: 39vw;">
          {{ song.song.title }}
          <span v-if="song.song.featuring[0] != ''">
            ft.
            <span v-for="(feature, index) of song.song.featuring" v-bind:key="feature">
              <a>{{ feature }}</a>
              <span v-if="song.song.featuring.length > 1 && index != song.song.featuring.length-1">&amp;</span>
            </span>
          </span>
        </marquee>
        <marquee class="artist" style="width: 39vw;">
          <span v-for="(artist, index) of song.song.artists" v-bind:key="artist">
            <a>{{ artist }}</a>
            <span v-if="song.song.artists.length > 1 && index != song.song.artists.length-1">{{ '&amp; '}}</span>
          </span>
        </marquee>
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
          <div class="timestamp through">{{ song.currentTime }}</div>
          <div class="trackbar-center" style="margin-top: -.25rem;">
            <input
              type="range"
              min="0"
              :max="$parent.player.duration"
              v-model="$parent.player.currentTime"
              class="bar"
              onclick="this.blur();"
            >
          </div>
          <div class="timestamp total">{{ song.duration }}</div>
        </div>
      </center>
      <div v-if="$parent.md().os() == 'AndroidOS' || $parent.md().os() == 'iOS'">
        <div style="display: grid; align-self: center; justify-self: center;" v-on:click="state ? play() : pause()">
          <control-button :icon="isPaused ? 'pause' : 'play'" :key="isPaused"></control-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "./Controls.vue";
import ControlButton from "./ControlButton.vue";
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
    console.log(this.$props.song.song)
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
    }
  }
};
</script>