<template>
  <div id="app">
    <webview
      src="https://www.youtube.com/watch?v=LDU_Txk06tM"
      :preload="preload"
      webpreferences="allowRunningInsecureContent"
      nodeintegration
      disablewebsecurity
    ></webview>
    <window-control-bar
      v-bind:title="`RF Music | ${currentSong.name} by ${currentSong.artist}`"
      v-bind:state="state"
    ></window-control-bar>
    <div class="whole">
      <div class="content clear">
        <sidebar ref="sidebar" :state="state"></sidebar>
        <div class="wrap">
          <a v-if="state == 'closed'" class="sidebar_toggle" v-on:click="sidebar_toggle">≡</a>
          <nav-bar></nav-bar>
          <router-view></router-view>
        </div>
      </div>
      <media-bar :song="currentSong" :state="state"></media-bar>
    </div>
  </div>
</template>

<script>
import MediaBar from "./components/layout/MediaBar/MediaBar.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import WindowControlBar from "./components/layout/WindowControlBar.vue";
import NavBar from "./components/layout/NavBar.vue";
import router from "vue-router";
import path from "path";
import DiscordRPC from "discord-rpc";
import chalk from "chalk";

function getTimestamp(raw_time) {
  let out_time = "";
  if (Math.floor((raw_time / 60) % 60) != 0) {
    if (Math.floor(raw_time % 60) < 10) {
      out_time =
        Math.floor((raw_time / 60) % 60) + ":0" + Math.floor(raw_time % 60);
    } else {
      out_time =
        Math.floor((raw_time / 60) % 60) + ":" + Math.floor(raw_time % 60);
    }
  } else {
    if (Math.floor(raw_time % 60) < 10) {
      out_time = "0:0" + Math.floor(raw_time % 60);
    } else {
      out_time = "0:" + Math.floor(raw_time % 60);
    }
  }
  return out_time;
}

//* Create server to listen for extension
/*var extension = express(),
  http = require("http"),
  socketServer = http.createServer(extension),
  io = require("socket.io")(socketServer);

//* Define needed variables
var lastKeepAliveSwitch = 0;

//* Keep alive check to automatically remove presence if browser not running/not using YT
setInterval(keepAliveCheck, 1000);

async function keepAliveCheck() {
  if (lastKeepAliveSwitch > 0) {
    setupServices.forEach(service => {
      service.rpc.destroy();
    });
    setupServices = [];
    serviceLogins = [];
  }
  lastKeepAliveSwitch += 1;
}

//* Listen on port 3020
socketServer.listen(3020, () => {
  console.log(CONSOLEPREFIX + chalk.green("Listening on Port 3020"));
});

//* Socket connection event
io.on("connection", function(socket) {
  global.EXTENSIONSOCKET = socket;
  BROWSERCONNECTIONSTATE = "CONNECTED";

  socket.on("playBackChange", updatePresence);
  socket.on("updateData", updatePresence);
});

var setupServices = [],
  serviceLogins = [],
  presencePauseSwitch = 0;

//* Updates the presence with the incomming data
async function updatePresence(data) {
  lastKeepAliveSwitch = 0;

  var setupService = setupServices.find(
    svice => svice.serviceName == data.service
  );

  if (!data.playback) presencePauseSwitch++;
  else presencePauseSwitch = 0;
  if (presencePauseSwitch >= 60) {
    if (setupService != null) {
      setupService.rpc.clearActivity();
    }
  } else {
    if (setupService) {
      if (userSettings.get("titleMenubar"))
        setupService.rpc.setActivity(data.presenceData);
    } else {
      tryLogin(data.service, data.clientID);
      serviceLogins.push({
        serviceName: data.service,
        intervalID: setInterval(
          () => tryLogin(data.service, data.clientID),
          10 * 1000
        )
      });
    }
  }
}

/**
 * Try to login to RPC until connected
 */
/*async function tryLogin(service, clientID) {
  setupServices.push({
    rpc: new DiscordRPC.Client({ transport: "ipc" }),
    serviceName: service,
    ready: false
  });
  var serviceRPC = setupServices.find(svice => svice.serviceName == service);
  serviceRPC.rpc
    .login({ clientId: clientID })
    .catch(err =>
      console.log(`${CONSOLEPREFIX}Refracture Music - RPC: ${err.message}`)
    );
  serviceRPC.rpc.on("ready", () => {
    clearInterval(
      serviceLogins.find(svice => svice.serviceName == service).intervalID
    );
    serviceRPC.ready = true;
  });
}*/

export default {
  name: "refracture-music",
  components: {
    WindowControlBar,
    MediaBar,
    Sidebar,
    NavBar
  },
  data() {
    return {
      state: "open",
      currentCatagory: "Library",
      categories: ["Browse", "Library", "Visualize"],
      currentPage: "Songs",
      pages: ["Songs", "Artists", "Albums", "Playlists"],
      currentSong: {
        name: "Crab Rave",
        artist: "Noisestorm",
        currentTime: "0:00",
        duration: "0:00"
      },  
      player: new Audio(""),
      //blob = fetch(URL.createObjectURL('./inject.js')).then(r => r.blob()),
      preload: `file:${require('path').resolve(__dirname, './inject.js')}`,
      //webviewInject: URL.createObjectURL(new Blob(['const{ipcRenderer}=require("electron") ipcRenderer.on("ping",()=>{let currURL=window.location.href,prevURL="";setInterval(checkURL,250);function checkURL(){currURL=window.location.href;if(prevURL!==currURL){prevURL=window.location.href;main()}} async function main(){try{const videoID=/(?:\?v=)(.*?)(?:&|$)/i.exec(window.location.search)[1],response=await fetch(`https://www.youtube.com/get_video_info?video_id=${videoID}&el=detailpage`,{method:"GET"}),data=await response.text(),json=parseData(data);createLinks(json)}catch(e){ipcRenderer.sendToHost([])}} function parseData(data){const captured=/(?:player_response=)(.*?)(?:&|$)/i.exec(data)[1],json=JSON.parse(decodeURIComponent(captured));return json} async function createLinks(json){const details=json.videoDetails,formats=json.streamingData.formats,adaptive=json.streamingData.adaptiveFormats,adaptiveAudio=[];let row,target,i=0;for(;i<adaptive.length;i++){if(adaptive[i].mimeType.split(";")[0].split("/")[0]==="audio"){adaptiveAudio.push(adaptive[i])}} adaptiveAudio.sort((a,b)=>{return parseInt(b.contentLength)-parseInt(a.contentLength)});ipcRenderer.sendToHost(adaptiveAudio) formats.sort((a,b)=>{return parseInt(b.contentLength)-parseInt(a.contentLength)})}})'], {type: 'application/javascript'}))
    }
  },
  mounted() {
    const downloader = document.getElementsByTagName("webview")[0];
    this.$data.player.ontimeupdate = () => {
      this.$data.currentSong.currentTime = getTimestamp(
        this.$data.player.currentTime
      );
    };
    this.$data.player.ondurationchange = () => {
      this.$data.currentSong.duration = getTimestamp(
        this.$data.player.duration
      );
      console.log(getTimestamp(this.$data.player.duration));
    };
    setTimeout(() => downloader.send("ping"), 3009);
    setTimeout(() => downloader.setAudioMuted(true), 30);
    downloader.addEventListener("ipc-message", event => {
      console.log(event.channel);
      this.$data.player.src = event.channel[0].url;
      downloader.setAttribute("src", ".");
    });
  },
  methods: {
    sidebar_toggle() {
      if (this.$data.state == "closed") {
        this.$data.state = "open";
      } else {
        this.$data.state = "closed";
      }
    }
  }
};
</script>

<style lang="less">
@import "./variables.less";
@import "./roboto.less";
@import "./scrollbar.less";

webview {
  height: 0;
}
body {
  background: @background-primary;
  color: @accent-primary;
}

body {
  font-family: Roboto;
  margin: 0;
  overflow: hidden;
  background: @background-primary;
  user-select: none;
}

* {
  user-select: none;
  cursor: default;
}

a {
  color: @accent-primary;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

p {
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
}

.whole {
  height: 100%;
  margin-top: -0.1rem;
  background: @background-primary;
}

.content {
  display: flex;
  height: 80vh;
  width: 100%;
}

#hide {
  display: none;
  visibility: hidden;
}

.sidebar {
  @top-bottom-height: 2rem;
  width: 0px;
  background: @background-secondary;
  &-top {
    height: 2rem;
    width: 0px;
  }
  &-bottom {
    display: inline-block;
    height: 20vh;
    width: 20vw;
  }
}

.wrap {
  width: 100%;
  background: transparent;
  padding: 1rem;
  min-height: calc(100%- (1.8rem+20%));
  float: right;
  overflow: scroll;
}

.clear:after {
  clear: both;
  display: table;
  content: "";
}

.sidebar_toggle {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 3rem;
  text-decoration: none !important;
  transition: margin-left 0.15s;
  position: absolute;
  &.sidebar_open {
    margin-left: -10rem !important;
    transition: margin-left 0.15s;
  }
}

.sidebar_top {
  display: flex;
  width: 16.65vw !important;
  transition: width 0s !important;
}

a.sidebar_toggle_x {
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  padding-right: 0.8rem;
}

div.sidebar_toggle_x {
  float: right;
}

.sidebar_open {
  @top-bottom-height: 2rem;
  width: 20vw;
  transition: width 0.15s;
  background: @background-secondary;
  &-top {
    height: 2rem;
    width: 0px;
  }
  &-bottom {
    display: inline-block;
    height: 20vh;
  }
}

.sidebar_toggle.sidebar_open {
  background: transparent !important;
}

.sidebar_closed {
  .sidebar_content {
    display: none !important;
    transition: display 0.15s;
  }
  div.sidebar_toggle_x {
    margin-top: -10rem !important;
    transition: margin-top 0.15s;
  }
}

.sidebar_main.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}

.sidebar-top.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}
.sidebar-bottom.sidebar_closed {
  width: 0px !important;
  transition: width 0.15s;
}
</style>
