<template>
  <center>
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(12.5rem, 12rem)); justify-content: center;"
    >
      <div
        v-for="album of library.albums"
        v-bind:key="album"
        style="width: 12rem; height: 12rem; margin-top: .5rem;"
      >
        <img :src="album.art[0]" style="width: 100%; height: 100%">
      </div>
    </div>
  </center>
</template>

<style lang="less" scoped>
</style>

<script>
import Desk from "../../components/desk/Desk.vue";
import DeskRow from "../../components/desk/Row.vue";

export default {
  props: ["library"]
};
</script>
