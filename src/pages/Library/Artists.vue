<template>
  <center class="albums_container">
    <div class="album_table">
      <div v-for="artist of artists" v-bind:key="artist.mbid" style class="album">
        <img :src="artist.image[artist.image.length - 1]['#text']" class="art">
        <div class="description">
          <span class="title">{{ artist.name }}</span>
        </div>
      </div>
    </div>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"

export default {
  props: ["library"],
  data() {
    return {
      artists: []
    }
  },
  mounted() {
    for (let i in this.$props.library.artists) {
      const artistData = JSON.parse(this.$props.library.artists[i])
      this.$data.artists.push(artistData)
    }
  }
}
</script>