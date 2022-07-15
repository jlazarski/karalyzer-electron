
const { contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')

contextBridge.exposeInMainWorld('deps', {
    fs: fs,
    path: path,
    __dirname: __dirname
})