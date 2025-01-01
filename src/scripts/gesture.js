const ipc = require('electron').ipcRenderer;


var rotation = 0;
var gestureStartRotation = 0;
var gestureStartScale = 0;
var scale = 1;
var posX = 0;
var posY = 0;
var coordinates = [0, 0];

window.addEventListener('wheel', (e) => {
  e.preventDefault();

  if (e.ctrlKey) {
    scale -= e.deltaY * 0.01;
  } else {
    //console.log(`Swipe coordinates: (${posX - e.deltaX * 2}, ${posY - e.deltaY * 2})`);
    coordinates = [posX - e.deltaX * 2, posY - e.deltaY * 2];
    sendSwipeCoordinates();
  }
});

window.addEventListener("gesturechange", function (e) {
  e.preventDefault();
  
  //console.log(`Swipe coordinates: (${e.pageX}, ${e.pageY})`);
  coordinates = [e.pageX, e.pageY];
});

function sendSwipeCoordinates() {
    ipc.send("swipe-coordinates", coordinates);
}