const { app, screen, ipcMain, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

//const mainWindow = require(path.join(__dirname, './mainWindow.js'));
const webviewCommunicator = require(path.join(__dirname, './webviewCommunicator.js'));
const keystrokes = require(path.join(__dirname, './keystrokes.js'));
const appStorageManager = require(path.join(__dirname, './appStorageManager.js'));
const tabManager = require(path.join(__dirname, './tabManager.js'));

try {
    require('electron-reloader')(module)
} catch (_) {}

