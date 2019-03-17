<template>
  <div class="tile_table">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "dyler"
};
</script>

<style lang="less">
.tile_table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 12rem));
  justify-content: center;
  padding: .5rem;
}
</style>
