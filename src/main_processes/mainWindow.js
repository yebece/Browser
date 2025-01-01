const { app, screen, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const window = new BrowserWindow({
        width: width / 1.25,
        minWidth: 800,
        height: height / 1.25,
        minHeight: 400,
        title: "Browser",
        icon: path.join(__dirname, 'browser.icns'),
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        trafficLightPosition: { x: 20, y: 19 },
        webPreferences: {
            experimentalFeatures: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webviewTag: true,
            //preload: path.join(__dirname, 'gesture.js') // Preload gesture.js
        },
        webSecurity: false,
        vibrancy: 'popover',
        visualEffectState: 'followWindow',
        backgroundColor: '#00000000'
    });

    window.loadFile(path.join(__dirname, '../render_processes/window.html'));
};

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());