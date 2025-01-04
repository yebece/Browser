const { app, ipcMain, safeStorage } = require('electron');

const PouchDB = require('pouchdb');

var appData = new PouchDB('./src/dbs/app_storage/appData');

if (safeStorage.isEncryptionAvailable()) {
    
  } else {
    throw new Error('Encryption is not available on this system.');
  }