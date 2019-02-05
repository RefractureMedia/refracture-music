<template>
  <div id="app">
    <!--<window-control-bar v-bind:title="`RF Music | ${currentSong.meta.title} by ${currentSong.meta.artists[0]}`" v-bind:state="state"></window-control-bar>-->
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar/>
          <library-search/>
          <div v-if="isDone">
            <router-view
              :library="library"
              :currentSong="currentSong.meta"
              :player="player"
              :results="searchResults"
            ></router-view>
          </div>
        </div>
      </div>
      <media-bar :song="currentSong" :state="state"></media-bar>
    </div>
  </div>
</template>

<script>
import MediaBar from "./components/layout/MediaBar/MediaBar.vue";
import Sidebar from "./components/layout/Sidebar.vue";
//import WindowControlBar from "./components/layout/WindowControlBar.vue"
import NavBar from "./components/layout/NavBar.vue";
import MobileStyles from "./MobileStyles.css";
import LibrarySearch from "./components/layout/LibrarySearch";
import keys from "./keys.js";
import router from "vue-router";
import { getTimesFromMs, getTimestamp } from "./assets/js/timeManagement.js";
import AppData from "./appData.js";
import path from "path";
import AdaptiveSourceFetcher from "./assets/js/asf.js";
import request from "request";
import { setTimeout } from "timers";
import MobileDetect from "mobile-detect";

export default {
  name: "refracture-music",
  components: {
    //   WindowControlBar,
    MediaBar,
    Sidebar,
    NavBar,
    LibrarySearch
  },
  data() {
    return AppData;
  },
  mounted() {
    const library = this.$data.library,
      player = this.$data.player;
    let songs = library.songs,
      albumsTemp = [];

    for (let song of songs) {
      for (let artist of song.artists) {
        request(
          "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
            artist +
            "&api_key=" +
            keys.lastfm +
            "&format=json",
          (err, res, dat) => {
            let artist = JSON.parse(dat).artist;
            if (err) console.error(err);
            else
              library.artists = {
                name: artist.name,
                art: artist.image,
                description: artist.summary
              };
          }
        );
      }
      if (!albumsTemp.includes(song.album.title)) {
        library.albums.push({
          artists: song.album.artists,
          title: song.album.title,
          art: song.album.art
        });
        albumsTemp.push(song.album.title);
      } else
        for (let album of library.albums)
          if (album.name == song.album && !album.art.includes(song.art))
            album.art.push(song.album.art);
      this.$data.isDone = true;
    }
    player.ontimeupdate = () =>
      (this.$data.currentSong.currentTime = getTimestamp(player.currentTime));
    player.onerror = e => {
      throw Error(
        `Error: ${player.error.code}; details: ${player.error.message}`
      );
    };
    player.onchange = () => {
      if (player.canPlayType == false)
        throw Error("Cannot Play This File Type");
    };
    player.ondurationchange = () =>
      (this.$data.currentSong.duration = getTimestamp(player.duration));

    setTimeout(() => this.setSong("LDU_Txk06tM"), 30);

    document
      .getElementsByClassName("songInput")[0]
      .addEventListener("keyup", e => {
        if (e.keyCode === 13) {
          document.getElementById("submitSong").click();
          e.preventDefault();
          return false;
        }
      });
    document.getElementsByClassName("songInput")[0].preventDefault();

    const detect = new MobileDetect(window.navigator.userAgent);
  },
  methods: {
    getCategory() {
      return this.$router.path.split("/")[0];
    },
    sidebar_toggle() {
      if (this.$data.state == "closed") this.$data.state = "open";
      else this.$data.state = "closed";
    },
    setSong(vidId) {
      AdaptiveSourceFetcher(vidId, res => {
        this.$data.player.src = res[0].url;
        this.$data.player.play();
      });
    },
    search(input, outgoing, page) {
      this.$data.searchResults = {
        songs: [],
        artists: [],
        albums: [],
        playlists: [],
        youtube: [],
        soundcloud: []
      };
      if (outgoing) {
        let songsTemp = [];
        request(
          "https://itunes.apple.com/search?&entity=musicTrack&term=" + input,
          (err, res, dat) => {
            let tracks = JSON.parse(dat).results;
            let parsed_songs = [];
            for (let track of tracks) {
              let collectionArtist;
              request(
                "https://itunes.apple.com/lookup?id=" + track.collectionId,
                (err, res, dat) => {
                  if (err) console.log(err);
                  else collectionArtist = JSON.parse(dat).results[0].artistName;
                }
              );
              parsed_songs.push({
                artists: track.artistName.split(" & "),
                title: track.trackName,
                tracknum: track.trackNumber,
                album: {
                  artists: collectionArtist.split(" & "),
                  title: track.collectionName,
                  art: toString(
                    track.artworkUrl100.split("x100bb.")[0] + "0x1000bb.jpg" // Makes the artwork request be 1000px rather than 100
                  )
                }
              });
              songsTemp.push(track.trackName);
            }
            console.log(parsed_songs);
            if (err) console.error(err);
            else this.$data.searchResults.songs = parsed_songs;
          }
        );

        request(
          "https://itunes.apple.com/search?&entity=musicArtist&term=" + input,
          (err, res, dat) => {
            let raw_artists = JSON.parse(dat).results;
            let artist_names = [];

            for (let artist of raw_artists) {
              artist_names.push(artist.artistName);
            }

            for (let artist of artist_names)
              request(
                "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
                  artist +
                  "&api_key=" +
                  keys.lastfm +
                  "&format=json",
                (err, res, dat) => {
                  let artists = JSON.parse(dat).artist;
                  let parsed_artists = [];
                  for (let artist of artists) {
                    parsed_artists.push({
                      name: artist.name,
                      art: artist.image,
                      description: artist.summary
                    });
                  }
                  console.log(parsed_artists);
                  if (err) console.error(err);
                  else this.$data.searchResults.artists = parsed_artists;
                }
              );
          }
        );

        request(
          "https://itunes.apple.com/search?&entity=musicArtist&term=" + input,
          (err, res, dat) => {
            let albums = JSON.parse(dat).results;
            let parsed_albums = [];
            for (let album of albums) {
              parsed_albums.push({
                artists: album.artistName.split(" & " | ", " | " x " | " X "),
                title: album.collectionName,
                art: (
                  album.artworkUrl100.split("x100bb.")[0] + "0x1000bb.jpg"
                ) /* Makes the artwork request be 1000px rather than 100*/
                  .toString()
              });
            }
            console.log(parsed_albums);
            if (err) console.error(err);
            else this.$data.searchResults.albums = parsed_albums;
          }
        );
        // do youtube result requesting & filter out `songsTemp.includes(parsed_result.title)` (same thing for soundcloud when we get around to doing soundcloud)
      } else {
        if (page == "Songs")
          for (let song of this.$data.library.songs) {
            if (song.title.includes(input))
              this.$data.searchResults.songs.push(song);
          }
        if (page == "Artists")
          for (let artist of this.$data.library.artists) {
            if (artist.name.includes(input))
              this.$data.searchResults.artists.push(artist);
          }
        if (page == "Albums")
          for (let album of this.$data.library.albums) {
            if (album.title.includes(input))
              this.$data.searchResults.albums.push(album);
          }
        if (page == "Playlists")
          for (let playlist of this.$data.library.playlist) {
            if (playlist.name.includes(input))
              this.$data.searchResults.playlists.push(playlist);
          }
      }
    },
    browseSearch() {
      let input = document.getElementsByClassName("browseSearch")[0].value;
      const notSearch =
        "http:" | "https:" | "www." | "youtube" | "youtu.be" | "soundcloud";

      if (
        !document
          .getElementsByClassName("browseSearch")[0]
          .value.includes("http:")
      ) {
        this.search(
          document.getElementsByClassName("browseSearch")[0].value,
          true,
          ""
        );
      } else {
        this.setSong(parseYTURL(getSongInput()));
      }
      document.getElementsByClassName("browseSearch")[0].value = "";
    },
    md() {
      return new MobileDetect(window.navigator.userAgent);
    }
  }
};
window.notify = function(x) {
  const rid = Math.random()
    .toString(36)
    .substring(7);

  const t = document.createElement("div"),
    s = document.createElement("span");
  s.classList.add("close");
  s.onclick = () => document.getElementById(`s-${rid}`).classList.remove("on");
  s.innerHTML = "&times;";
  t.classList.add("toast");
  t.classList.add("on");
  t.id = `s-${rid}`;
  t.innerHTML = x;
  t.appendChild(span);

  document.body.appendChild(toast);
};
Array.prototype.shuffle = function() {
  var input = this;
  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

function parseYTURL(input) {
  if (
    input &&
    input.length == 11 &&
    (input.indexOf("youtube") == -1) | (input.indexOf("youtu.be") == -1)
  ) {
    return input;
  } else {
    var regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    var match = input.match(regExp);
    if (match && match[5].length == 11) {
      return match[5];
    } else {
      notify("Could not extract video ID.");
    }
  }
}
function getSongInput() {
  let url = document.getElementsByClassName("browseSearch")[0].value;
  return url;
}
</script>

<style lang="less">
@import "./assets/less/main.less";
</style>