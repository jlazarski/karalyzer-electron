console.log('Initiation process working');
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const os = require("os");
let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true,    
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });
    win.setRepresentedFilename(os.homedir())
    win.loadURL(url.format({
        // and load the index.html of the app.
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    // Open the DevTools.
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});