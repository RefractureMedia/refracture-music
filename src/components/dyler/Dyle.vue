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
  props: ["art", "title"]
};
</script>

<style lang="less">
.tile {
  width: 12rem;
  height: 12rem;
  margin-top: 0.5rem;
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
    .description {
      margin-top: -2.5rem;
      color: currentColor;
      transition: margin-top 40ms;
    }
  }
}
</style>
