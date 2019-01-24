<template>
  <div><p v-for="artist of library.artists" v-bind:key="artist">{{ artist.name }}</p></div>
</template>

<style lang="less" scoped>
</style>

<script>
export default {
  props: ['library']
};
</script>
