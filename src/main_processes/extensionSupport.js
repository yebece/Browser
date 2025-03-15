const { ipcMain } = require("electron");

const PouchDB = require("pouchdb");

// Postit Extension
var postits = new PouchDB("./src/dbs/postits");
var postitsAttributes = new PouchDB("./src/dbs/postitsAttributes");

