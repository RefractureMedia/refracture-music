<template>
  <div class="visualizer">
    <p v-on:click="closething()">test</p>
    <canvas style="padding:0; margin:0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" id="canvas" width="920px" height="50px"></canvas>
  </div>
</template>

<script>
import visualizer from "./../assets/js/visualizer.js"
export default {
  props: ["player"],
  data() {
    return {
    };
  },
  mounted() {
    try {
      visualizer("close");
    } catch (e) {}
    setup_visualizer(this.$props.player);
  },
  methods: {
    closething() {
      visualizer("close");
    }
  }
};

function setup_visualizer(player) {
  visualizer('init',{
    canvas: document.getElementsByTagName("canvas")[0],
    audio: player
  })
}

</script>

<style lang="less" scoped>

</style>