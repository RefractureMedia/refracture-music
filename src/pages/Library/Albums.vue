<template>
  <center class="albums_container">
    <albums :albums="library.albums"/>
  </center>
</template>

<script>
import Dyler from "./../../components/dyler/Dyler.vue";
import Dyle from "./../../components/dyler/dyle";
import Albums from "./../../components/Albums.vue";

export default {
  props: ["library"],
  components: {
    Dyler,
    Dyle,
    Albums
  }
};
</script>

<style lang="less" scoped>
@import "./../../assets/less/variables.less";
.albums_container {
  overflow: scroll;
  height: 65.5vh;
}
</style>
