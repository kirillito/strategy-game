let canvas;
let canvasContext;

const FPS = 30;

const PLAYER_START_UNITS = 100;
const ENEMY_START_UNITS = 50;

let playerUnits = [];
let enemyUnits = [];

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // document.getElementById("playerName").innerHTML = player.name;
  // document.getElementById("playerNameControls").innerHTML = player.name;

  //this.initInput();
  this.loadImages();

  canvas.addEventListener('mousemove', mouseMoveHandler);

  canvas.addEventListener('mousedown', mouseDownHandler);

  canvas.addEventListener('mouseup', mouseUpHandler);

  canvas.addEventListener('click', handleMouseClick);
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    animate();
    draw();
  }, 1000/FPS);

  for (i=0; i<PLAYER_START_UNITS; i++) {
    let p = new Unit();
    p.init(playerPic, true);
    playerUnits.push(p);
  }
  for (i=0; i<ENEMY_START_UNITS; i++) {
    let e = new Unit();
    e.init(enemyPic, false);
    enemyUnits.push(e);
  }
}

function animate() {
  playerUnits.forEach(u => u.move());
  enemyUnits.forEach(u => u.move());
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');
  //drawImageCenteredAtLocationWithRotation(bgPic, canvas.width/2, canvas.height/2, 0);

  playerUnits.forEach(u => u.draw());
  enemyUnits.forEach(u => u.draw());

  selectedUnits.forEach(u => u.drawSelectionBox());

  if (isMouseDragging) {
    drawOutlineRectangleByCoordinates(lassoX1, lassoY1, lassoX2, lassoY2, '#22FF00');
  }
}