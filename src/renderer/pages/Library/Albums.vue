<template>
  <center class="albums_container">
    <div class="album_table">
      <div v-for="album of library.albums" v-bind:key="album" style class="album">
        <img :src="album.art[0]" class="art">
        <div class="description">
          <span class="title">{{ album.name }}</span>
        </div>
      </div>
    </div>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue";
import DeskRow from "../../components/desk/Row.vue";

export default {
  props: ["library"]
};
</script>

<style lang="less" scoped>
@import "./../../variables.less";
.albums_container {
  overflow: scroll;
  height: 65.5vh;
  & > .album_table {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 12rem));
    justify-content: center;
    & > .album {
      width: 12rem;
      height: 12rem;
      margin-top: 0.5rem;
      & > .art {
        width: 100%;
        height: 100%;
      }
      & > .description {
        margin-top: -1.5rem;
        color: transparent;
        transition: margin-top 40ms;
        background: #9198e5;
        width: fit-content;
      }
      &:hover {
        & > .description {
          margin-top: -2.5rem;
          color: currentColor;
          transition: margin-top 40ms;
        }
      }
    }
  }
}
</style>
