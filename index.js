const { app, screen, ipcMain, BrowserWindow, globalShortcut} = require('electron');

try {
    require('electron-reloader')(module)
  } catch (_) {}

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const window = new BrowserWindow({
        width: width / 1.25,
        minWidth: 800,
        height: height / 1.25,
        minHeight: 400,
        title: "Browser",
        icon: __dirname + '/browser.icns',
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        trafficLightPosition: { x: 20, y: 20 },
        webPreferences: {
            experimentalFeatures: true, 
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // use remote module
            webviewTag: true
        }, 
        webSecurity: false,
        vibrancy: 'popover',
        visualEffectState: 'followWindow',
          backgroundColor:'#00000000'
    });

    window.loadFile('window.html');
};

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit());

app.on("ready", () => {
    const shortcuts = {
        "CommandOrControl+W": 'close-tab',
        "CommandOrControl+T": 'new-tab',
        "CommandOrControl+Left": 'go-back',
        "CommandOrControl+Right": 'go-forward',
        "CommandOrControl+Option+I": 'inspect',
        "CommandOrControl+R": 'reload-selected-page',
        "CommandOrControl+S": 'toggle-is-vert-or-horiz'
    };

    for (const [key, message] of Object.entries(shortcuts)) {
        globalShortcut.register(key, () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) {
                focusedWindow.webContents.send(message);
            }
        });
    }
});