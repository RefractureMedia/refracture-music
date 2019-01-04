/*jshint esversion: 6 */

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const express_app = express();
const electron = require('electron');
const { app } = require('electron')
const { BrowserWindow } = require('electron');


function exhbs_init() {
  express_app.engine(
    '.hbs',
    exphbs({
      defaultLayout: 'index',
      extname: '.hbs',
      partialsDir: __dirname + '/views/components/',
    })
  );
  express_app.set('view engine', '.hbs')
  express_app.set('views', path.join(__dirname, 'views/layouts'))
  express_app.use(express.json())
  express_app.use(express.static(__dirname + '/public'))
  express_app.use(express.static('public'))
}

function createWindow() {
  //const tray = new Tray("download.png");
  const win_settings = {
    minHeight: 400,
    minWidth: 600,
    width: 800,
    height: 600,
    frame: false,
    //icon: path.join(app.getexpressPath(), "download.png"),
    autoHideMenuBar: true,
    backgroundColor: '#000',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  }
  let win = new BrowserWindow(win_settings);
  win.loadFile('eapp/render.html');
  win.on('closed', function () {
    win = null
  })
  win.webContents.openDevTools()
  function message_handler(event, message) {
    switch (message.action) {
    }
  }

  function message_async_handler(event, message) {
    switch (message.action) {
      case 'preference_changed':
        // Forward the message on to the main window.
        main_window.send('ipc_message', message);
        break;
    }
  }
}

exhbs_init();

express_app.set("urlPrefix", "admin");
const a = require("./routes");
a(express_app);
module.exports = express_app

express_app.listen(21122);

app.on("ready", createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})