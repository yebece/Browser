const { app, ipcMain, BrowserWindow } = require('electron');

app.on("ready", () => {
    ipcMain.on('swipe-coordinates', (event, arg) => {
        console.log(`Swipe coordinates: (${arg[0]}, ${arg[1]})`);
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if (focusedWindow) {
            focusedWindow.webContents.send('swipe-coordinates', arg);
        }
    })
});