<template>
  <div class="tile">
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
@import './../../assets/less/variables.less';

.tile {
  width: 11.5rem;
  height: 11.5rem;
  margin: .25rem;
  background: black;
  .art {
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity .2s;
    will-change: opacity;
  }
  .description {
    margin-top: -1.5rem;
    color: @accent-primary;
    transition: margin-top 40ms;
    width: fit-content;
    opacity: 0;
    position: relative;
  }
  &:hover {
    .art {
      opacity: .4;
    }
    .description {
      margin-top: -2.5rem;
      color: @accent-primary;
      transition: margin-top 40ms;
      opacity: 1;
    }
  }
}
</style>
