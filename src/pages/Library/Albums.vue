<template>
  <center class="albums_container">
    <div class="album_table">
      <div v-for="album of library.albums" v-bind:key="album" class="album">
        <img :src="album.art[album.art.length - 1]" class="art">
        <div class="description">
          <span class="title">{{ album.name }}</span>
        </div>
      </div>
    </div>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"

export default {
  props: ["library"]
}
</script>
