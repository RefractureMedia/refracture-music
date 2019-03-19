<template>
  <center class="artists_container">
    <artists :artists="library.artists"/>
  </center>
</template>

<script>
import Artists from "./../../components/Artists.vue";

export default {
  props: ["library"],
  components: {
    Artists
  }
};
</script>

<style lang="less" scoped>
@import "./../../assets/less/variables.less";
</style>