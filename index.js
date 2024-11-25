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
        "CommandOrControl+S": 'toggle-is-vert-or-horiz',
        "CommandOrControl+1": 'select-tab-1',
        "CommandOrControl+2": 'select-tab-2',
        "CommandOrControl+3": 'select-tab-3',
        "CommandOrControl+4": 'select-tab-4',
        "CommandOrControl+5": 'select-tab-5',
        "CommandOrControl+6": 'select-tab-6',
        "CommandOrControl+7": 'select-tab-7',
        "CommandOrControl+8": 'select-tab-8',
        "CommandOrControl+9": 'select-tab-9',
        "CommandOrControl+0": 'select-tab-10'
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