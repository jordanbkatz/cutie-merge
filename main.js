const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
    const w = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    if (isDev) {
        w.loadURL(`http://localhost:3000`);
        w.webContents.openDevTools();
    }
    else {
        w.loadURL(`file://${path.join(__dirname, './build/index.html')}`);
    }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});