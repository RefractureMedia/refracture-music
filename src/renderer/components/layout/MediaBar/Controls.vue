<template>
  <div class="media-buttons">
    <div class="control-buttons save" onclick="save();">
      <control-button icon="save" onclick="back();"></control-button>
      <control-button icon="saved" onclick="back();"></control-button>
    </div>
    <control-button icon="repeat" onclick="repeat();"></control-button>
    <control-button icon="back" onclick="back();"></control-button>
    <control-button icon="play-pause" onclick="play-pause();"></control-button>
    <control-button icon="skip" onclick="skip();"></control-button>
    <control-button icon="shuffle" onclick="shuffle();"></control-button>
    <control-button icon="more" onclick="more();"></control-button>
  </div>
</template>

<script>
import ControlButton from "./ControlButton.vue"
export default {
  name: "controls",
  components: { ControlButton }
}
</script>

<style >
</style>