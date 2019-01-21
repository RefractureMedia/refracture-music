const {
    ipcRenderer
} = require('electron')
const request = require('request');
const fs = require('fs')
ipcRenderer.on('ping', () => {
    ipcRenderer.sendToHost(document.getElementsByClassName('link')[0].firstElementChild.href)
})