const { ipcMain } = require("electron");

const PouchDB = require("pouchdb");

// Postit Extension
var postits = new PouchDB("./src/dbs/postits");
var postitsAttributes = new PouchDB("./src/dbs/postitsAttributes");

postitsAttributes.put({
  _id: "postitsIdStartingPoint",
  postitsIdStartingPoint: 0,
});

ipcMain.on("create-note", (event, noteData) => {
  postitsAttributes.get("postitsIdStartingPoint").then(function (doc) {
    postits.put({
      _id: (doc.postitsIdStartingPoint + 1).toString(),
      creationDate: Date.now().toString(),
      noteContent: noteData.content || "",
      noteColor: noteData.color || "yellow",
      notePosition: noteData.position || { x: 100, y: 100 },
      isArchived: false,
    });
  });
  postitsAttributes.get("postitsIdStartingPoint").then(function (doc) {
    doc.postitsIdStartingPoint = doc.postitsIdStartingPoint + 1;
    return postitsAttributes.put(doc);
  });
});

// Get total note count
ipcMain.on("get-note-count", (event, noteData) => {
  postits
    .allDocs()
    .then(function (result) {
      console.log("Total number of documents:", result.total_rows);
    })
    .catch(function (err) {
      console.log("Error getting document count:", err);
    });
});



ipcMain.on("get-note", (event, noteData) => {
  postits.get(noteData.id).then(function (doc) {
    console.log(doc);
  });
});
