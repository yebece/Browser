const { app, globalShortcut, BrowserWindow } = require('electron');

app.on("ready", () => {
    app.on('browser-window-focus', () => {
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
            "CommandOrControl+0": 'select-tab-10',
            "CommandOrControl+=": 'unselect-all-tabs'
        };
    app.on('browser-window-blur', () => {
        globalShortcut.unregisterAll();
    });
        for (const [key, message] of Object.entries(shortcuts)) {
            globalShortcut.register(key, () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) {
                    focusedWindow.webContents.send(message);
                }
            });
        }
    });
});
