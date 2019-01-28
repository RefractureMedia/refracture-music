<template>
  <div class="media-buttons">
    <control-button icon="save"></control-button>
    <control-button icon="repeat"></control-button>
    <control-button icon="back"></control-button>
    <div v-if="!isPaused" v-on:click="togglePlayingState();">
      <control-button icon="pause"></control-button>
    </div>
    <div v-if="isPaused" v-on:click="togglePlayingState();">
      <control-button icon="play"></control-button>
    </div>
    <control-button icon="skip"></control-button>
    <control-button icon="shuffle"></control-button>
    <control-button icon="more"></control-button>
  </div>
</template>

<script>
import ControlButton from "./ControlButton.vue"

export default {
  name: "controls",
  components: { ControlButton },
  data() {
    return { isPaused: true }
  },
  methods: {
    togglePlayingState: function(event) {
      if (this.$parent.$parent.$data.player.paused) {
        this.$data.isPaused = false
        this.$parent.$parent.$data.player.play()
      } else {
        this.$parent.$parent.$data.player.pause()
        this.$data.isPaused = true
      }
    },
    toggleSavedState: function() {
      notify('Song')
    }
  },
  mounted() {}
}

//v-bind:class="'active' ? $parent.$parent.currentSong.player.loop"
//
//v-bind:class="'active' ? $parent.$parent.queue.shuffle"
/*
let audio = $parent.$parent.currentSong.player
let trackbar = $parent.$parent.trackbar
let through_display = $parent.$parent.through_display
let duration_display = $parent.$parent.duration_display
let time_set: boolean = false;
function time_change() {
    time_set=true;
}

function 

function update_trackbar() {
    let bar_value: number = trackbar.value;
    //addStyleString('background-image: -webkit-gradient(linear, left top, right top, color-stop(' + bar_value + ', #2f466b), color-stop(' + bar_value + ', #d3d3db))');

    audio.currentTime = (trackbar / 100000);
    time_set = false;
}

function set_duration() {
    trackbar.min = '0';
    trackbar.max = (audio.duration * 100000).toString();

    duration_display.textContent = time_stamp(audio.duration);
}

function update_timestamp() {
    if (time_set) {
        update_trackbar();
    } else {
        trackbar.value = (audio.currentTime * 100000).toString();

        through_display.textContent = time_stamp(audio.currentTime);

        if (audio.currentTime == audio.duration) {
            if (!repeating) {
                console.log('[Media] Song Ended')
                addStyleString('.pause { display: none !important; } .play { display: block !important }');
                playing = false;
            } else {
                console.log('[Media] Song Repeated')
                play_pause();
                play_pause();
            }

        }

        set_duration();
    }
}*/
</script>

<style lang="less">
.media-buttons {
  display: inline-flex;
  margin-top: -0.8vh;
  margin-bottom: 0.8vh;
  height: (1rem + 3rem);
}
</style>