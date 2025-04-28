const PouchDB = require('pouchdb');
const activeTabs = new PouchDB('activeTabs');
const archivedTabs = new PouchDB('archivedTabs');

/*
Template:
{
  "_id": "0",
  "appLink": "",
  "title": "",
  "icon": "",
  "tabCreationDate": new Date(),
  "isTabActive": true,
  "isTabSelected": true,
  "bundleID": "",
  "isSearch": false,
  "searchEngine": "",
  "searchQuery": "",
}
*/

// Retrieve database info
activeTabs.info().then(function (info) {
    console.log(info);
  });

function createNewTab() {
  var tabId, tabPos;
  const newTab = {
    "_id": tabId,
    "tabPos": tabPos,
    "appLink": "",
    "title": "",
    "icon": "",
    "tabCreationDate": new Date(),
    "isTabActive": true,
    "isTabSelected": true,
    "bundleID": "",
    "isSearch": false,
    "searchEngine": "",
    "searchQuery": ""
  };
  activeTabs.put(newTab);
  activeTabs.get(tabId).then(function (tab) {
    console.log("New tab created with:");
    console.log(tab);
  });
}

function updateTab(id , tabPos, appLink, title, icon, isTabActive, isTabSelected, bundleID, isSearch, searchEngine, searchQuery){
  var tabId = id;
  db.get(tabId).then(function (doc) {
    doc.tabPos = tabPos || doc.tabPos;
    doc.appLink = appLink || doc.appLink;
    doc.title = title || doc.title;
    doc.icon = icon || doc.icon;
    doc.isTabActive = isTabActive || doc.isTabActive;
    doc.isTabSelected = isTabSelected || doc.isTabSelected;
    doc.bundleID = bundleID || doc.bundleID;
    doc.isSearch = isSearch || doc.isSearch;
    doc.searchEngine = searchEngine || doc.searchEngine;
    doc.searchQuery = searchQuery || doc.searchQuery;
    return db.put(doc);
  }).then(function () {
    return db.get(tabId);
  }).then(function (doc) {
    console.log("Tab with ${tabId} with:");
    console.log(doc);
  });
}