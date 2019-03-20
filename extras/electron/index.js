const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  protocol
} = require("electron");
const client = require('discord-rich-presence')('557343550929371157');
const ipc = require('electron').ipcMain;
const isDevMode = require("electron-is-dev");
const {
  injectCapacitor,
  CapacitorSplashScreen
} = require("@capacitor/electron");
//const iohook = require("iohook");

const gotTheLock = app.requestSingleInstanceLock()

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

const dev_port = 8080;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = false;

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [{
  label: "Options",
  submenu: [{
    label: "Open Dev Tools",
    click() {
      mainWindow.openDevTools();
    }
  }]
}];

async function createWindow() {
  // Define our main window size
  mainWindow = new BrowserWindow({
    minHeight: 655,
    minWidth: 868,
    width: 868,
    useContentSize: false,
    height: 655,
    frame: false,
    icon: 'icon.ico',
    autoHideMenuBar: true,
    backgroundColor: "#191F28",
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      zoomFactor: 1.0
    }
  });

  if (true) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    //Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  if (useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
    if (isDevMode) mainWindow.loadURL(`http://localhost:` + dev_port);
    else mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.on("dom-ready", () => {
      mainWindow.show();
      mainWindow.webContents.executeJavaScript(`
        window.doWindowControls = function () {
          setTimeout(() => console.log("Hello World!"), 200);
          let window_controls = document.createElement("div");
          let styles = document.createElement("style");
          styles.innerHTML = ".window_controls{height:2rem;display:flex;grid-area:right;justify-self:right}li{list-style:none}.nav-bar{-webkit-app-region:no-drag;grid-template-columns:max-content auto max-content;grid-template-areas:'left center right'}i.window-controls{height:-webkit-fill-available;padding:0;float:right}i:hover.window-controls{background:rgba(88,88,88,.63)}i.exit-btn.window-controls{padding-top:.33rem;font-size:1.2rem}i.exit-btn:hover.window-controls{background:rgba(255,0,0,.65);opacity:.65}i.exit-btn:hover.window-controls i::before{opacity:1}i.max-btn.window-controls{padding-top:.34rem;font-size:.75rem}i.min-btn.window-controls{padding-right:1rem;padding-left:1rem;padding-top:.23rem;font-size:1.2rem;user-select:none;font-family:Cambria}";
          window_controls.setAttribute("class", "window_controls");
          const remote = require("electron").remote;
          window.minimize = function () {
            remote.BrowserWindow.getFocusedWindow().minimize();
          }
          window.maximize = function() {
            remote.BrowserWindow.getFocusedWindow().isMaximized() ? remote.BrowserWindow.getFocusedWindow().unmaximize() : remote.BrowserWindow.getFocusedWindow().maximize();
          }
          window_controls.innerHTML = '<li class="window-controls not-mac" onclick="window.minimize();"><i class="min-btn window-controls">─</i></li><li class="window-controls not-mac" onclick="window.maximize();"><i class="max-btn window-controls"><svg width="45" height="20" viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5H27V15H17V5ZM18 14V6H26V14H18Z" fill="currentColor" /></svg></i></li><li class="window-controls not-mac" onclick="window.close();"><i class="exit-btn window-controls"><svg width="45" height="20" viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V6H18V5H17ZM20 7H19V8H20V7ZM23 9H21V11H20V12H19V13H18V14H17V15H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V15H27V14H26V13H25V12H24V11H23V9ZM24 8H23V9H24V8ZM25 7H24V8H25V7ZM26 6H25V7H26V6ZM26 6H27V5H26V6Z" fill="currentColor" /><path d="M21 8H20V9H21V8Z" fill="currentColor" /><path d="M19 6H18V7H19V6Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M18 5V6H17V7H18V8H19V9H20V11H19V12H18V13H17V14H18V15H19V14H20V13H21V12H23V13H24V14H25V15H26V14H27V13H26V12H25V11H24V9H25V8H26V7H27V6H26V5H25V6H24V7H23V8H21V7H20V6H19V5H18ZM19 7V8H20V9H21V11H20V12H19V13H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V13H25V12H24V11H23V9H24V8H25V7H26V6H25V7H24V8H23V9H21V8H20V7H19ZM19 7V6H18V7H19Z" fill="currentColor" fill-opacity="0.4" /></svg></i></li>';
          window_controls.appendChild(styles);
          document.body.getElementsByClassName("nav-bar")[0].appendChild(window_controls);
        }
        let drpc_listen = document.createElement("script");
        drpc_listen.innerHTML = "var ipc = require('electron').ipcRenderer; document.addEventListener('discord_presence', (res) => { ipc.send('discord_presence', res.detail);}); console.log('hello foo!')";
        document.body.appendChild(drpc_listen);
      `)
      /*iohook.on("keyup", event => {
        if (event.rawcode == 179) {
            mainWindow.webContents.executeJavaScript("document.getElementsByClassName('pause')[0].click();")
        }
      })
      
      iohook.start();*/

      client.updatePresence({
        state: '...',
        details: 'Starting Up',
        largeImageKey: 'main_logo',
        instance: true,
      });

      ipc.on('discord_presence', (event, response) => {
        client.updatePresence(response.presence);
      });

      protocol.registerHttpProtocol('rfmusic', (req, cb) => {
        if (!gotTheLock) {
          open_window = false;
          app.quit()
        } else {
          if (mainWindow) {
            mainWindow.webContents.executeJavaScript(`
              alert(${req});
              console.log(${req});
              document.dispatchEvent(new CustomEvent("http_req", { detail: { request: ${req} } }));
            `)
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
          } else {
            
          }
        }
      })
    });
    mainWindow.webContents.on("devtools-reload-page", () => {
      mainWindow.webContents.executeJavaScript(`
        window.doWindowControls = function () {
          setTimeout(() => console.log("Hello World!"), 200);
          let window_controls = document.createElement("div");
          let styles = document.createElement("style");
          styles.innerHTML = ".window_controls{height:2rem;display:flex;grid-area:right;justify-self:right}li{list-style:none}.nav-bar{-webkit-app-region:no-drag;grid-template-columns:auto max-content;grid-template-areas:'left right'}.nav-bar center{margin-left:2.5rem}i.window-controls{height:-webkit-fill-available;padding:0;float:right}i:hover.window-controls{background:rgba(88,88,88,.63)}i.exit-btn.window-controls{padding-top:.33rem;font-size:1.2rem}i.exit-btn:hover.window-controls{background:rgba(255,0,0,.65);opacity:.65}i.exit-btn:hover.window-controls i::before{opacity:1}i.max-btn.window-controls{padding-top:.34rem;font-size:.75rem}i.min-btn.window-controls{padding-right:1rem;padding-left:1rem;padding-top:.23rem;font-size:1.2rem;user-select:none;font-family:Cambria}";
          window_controls.setAttribute("class", "window_controls");
          const remote = require("electron").remote;
          function minimize() {
            remote.BrowserWindow.getFocusedWindow().minimize();
          }
          function maximize() {
            remote.BrowserWindow.getFocusedWindow().isMaximized() ? remote.BrowserWindow.getFocusedWindow().unmaximize() : remote.BrowserWindow.getFocusedWindow().maximize();
          }
          window_controls.innerHTML = '<li class="window-controls not-mac" onclick="minimize();"><i class="min-btn window-controls">─</i></li><li class="window-controls not-mac" onclick="maximize();"><i class="max-btn window-controls"><svg width="45" height="20" viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5H27V15H17V5ZM18 14V6H26V14H18Z" fill="currentColor" /></svg></i></li><li class="window-controls not-mac" onclick="window.close();"><i class="exit-btn window-controls"><svg width="45" height="20" viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V6H18V5H17ZM20 7H19V8H20V7ZM23 9H21V11H20V12H19V13H18V14H17V15H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V15H27V14H26V13H25V12H24V11H23V9ZM24 8H23V9H24V8ZM25 7H24V8H25V7ZM26 6H25V7H26V6ZM26 6H27V5H26V6Z" fill="currentColor" /><path d="M21 8H20V9H21V8Z" fill="currentColor" /><path d="M19 6H18V7H19V6Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M18 5V6H17V7H18V8H19V9H20V11H19V12H18V13H17V14H18V15H19V14H20V13H21V12H23V13H24V14H25V15H26V14H27V13H26V12H25V11H24V9H25V8H26V7H27V6H26V5H25V6H24V7H23V8H21V7H20V6H19V5H18ZM19 7V8H20V9H21V11H20V12H19V13H18V14H19V13H20V12H21V11H23V12H24V13H25V14H26V13H25V12H24V11H23V9H24V8H25V7H26V6H25V7H24V8H23V9H21V8H20V7H19ZM19 7V6H18V7H19Z" fill="currentColor" fill-opacity="0.4" /></svg></i></li>';
          window_controls.appendChild(styles);
          document.body.getElementsByClassName("nav-bar")[0].appendChild(window_controls);
        }
        let drpc_listen = document.createElement("script");
        drpc_listen.innerHTML = "var ipc = require('electron').ipcRenderer; document.addEventListener('discord_presence', (res) => { ipc.send('discord_presence', res.detail);}); console.log('hello foo!')";
        document.body.appendChild(drpc_listen);
      `)
    })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.

let open_window = true;

app.setAsDefaultProtocolClient('rfmusic')

if(!gotTheLock) {
  open_window = false;
  app.quit()
}

if (open_window) app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
  //iohook.unload();
  //iohook.stop();
  app.removeAsDefaultProtocolClient('rfmusic')
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});



// Define any IPC or other custom functionality below here