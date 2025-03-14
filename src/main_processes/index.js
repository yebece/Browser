const { app, screen, ipcMain, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

const extensionSupport = require(path.join(__dirname, './extensionSupport.js'));
const mainWindow = require(path.join(__dirname, './mainWindow.js'));
const webviewCommunicator = require(path.join(__dirname, './webviewCommunicator.js'));
const keystrokes = require(path.join(__dirname, './keystrokes.js'));
const appStorageManager = require(path.join(__dirname, './appStorageManager.js'));

try {
    require('electron-reloader')(module)
} catch (_) {}

