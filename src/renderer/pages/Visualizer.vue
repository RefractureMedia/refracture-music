<template>
  <center>
    <p>Visualizer</p>
    <div id="mp3_player">
      <canvas id="analyser_render"></canvas>
    </div>
  </center>
</template>

<style lang="less" scoped>
div#mp3_player {
  width: 500px;
  height: 60px;
  background: #000;
  padding: 5px;
  margin: 50px auto;
}
div#mp3_player > canvas {
  width: 500px;
  height: 30px;
  background: #002d3c;
  float: left;
}
</style>

<script>
var canvas,
  ctx,
  source,
  context,
  analyser,
  fbc_array,
  bars,
  bar_x,
  bar_width,
  bar_height;

export default {
  props: ["player"],
  mounted() {
    src = new MediaSource();
    src.addTrack(player);
    console.warn(this.player.duration);
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById("analyser_render");
    ctx = canvas.getContext("2d");
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaStreamSource(src);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
    function frameLooper() {
      window.webkitRequestAnimationFrame(frameLooper);
      fbc_array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbc_array);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = "#00CCFF"; // Color of the bars
      bars = 100;
      for (var i = 0; i < bars; i++) {
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }
  }
};
</script>
