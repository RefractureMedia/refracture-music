<template>
  <div class="tile" v-on:click="$parent.$parent.$parent.$parent.open_modal(type, { image: art, title: title, artists: [], songs: [] })">
    <img :src="art" class="art">
    <div class="description">
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dyle",
  props: ["art", "title", "type"]
};
</script>

<style lang="less">
.tile {
  width: 11.5rem;
  height: 11.5rem;
  margin: .25rem;
  .art {
    width: 100%;
    height: 100%;
  }
  .description {
    margin-top: -1.5rem;
    color: transparent;
    transition: margin-top 40ms;
    width: fit-content;
  }
  &:hover {
    &::after {
      box-shadow: inset 0rem -6rem linear-gradient(180deg, rgba(0,0,0,.4) 0%, transparent 100%);
      content: ''; 
      display: block;
      position: relative;
      top: 0;
      margin-top: -12rem;
      width: 12rem;
      height: 12rem;
      z-index: 1000;
    }
    .description {
      margin-top: -2.5rem;
      color: currentColor;
      transition: margin-top 40ms;
    }
  }
}
</style>
