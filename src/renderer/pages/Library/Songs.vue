<template>
  <center>
    <desk>
      <desk-row class="header">
        <div class="divTableCell"></div>
        <div class="divTableCell">Artist(s)</div>
        <div class="divTableCell">Title</div>
      </desk-row>
      <desk-row v-for="song of songList" v-bind:key="song">
        <div class="divTableCell"><img v-bind:src="song.albumArt" width="50" height="50"></div>
        <div class="divTableCell">
          <a v-for="(artist, index) of song.artists" v-bind:key="artist">{{ artist }}<a v-if="song.artists.length > 1 && index != song.artists.length-1"> &amp; </a></a>
        </div>
        <div class="divTableCell">{{ song.title }}</div>
      </desk-row>
    </desk>
  </center>
</template>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"
export default {
  components: {
    Desk,
    DeskRow
  },
  data() {
    return {
      songList: [
        {
          artists: ["Noisestorm"],
          title: "Crab Rave",
          featuring: [""],
          albumArt: "https://assets.monstercat.com/releases/covers/Noisestorm%20-%20Crab%20Rave%20(Art).jpg"
        },
        {
          artists: ["Madeon", "Porter Robinson"],
          title: "Shelter",
          featuring: ["A1 Pictures"],
          albumArt: "http://i.imgur.com/06Obgip.jpg"
        }
      ]
    }
  }
}
</script>

<style lang="less">
@import "./../../variables.less";

.header {
  background-color: @background-secondary;
}
.divTableCell,
.divTableHead {
  border: 1px solid @background-secondary;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
</style>

