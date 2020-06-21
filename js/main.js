let canvas;
let canvasContext;

const FPS = 30;

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

  createTeam(playerUnits, PLAYER_START_UNITS, playerPic, true);
  createTeam(enemyUnits, ENEMY_START_UNITS, enemyPic, false);
}

function animate() {
  playerUnits.forEach(u => u.move());
  enemyUnits.forEach(u => u.move(playerUnits));
  removeDeadUnits();
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');
  //drawImageCenteredAtLocationWithRotation(bgPic, canvas.width/2, canvas.height/2, 0);

  allUnits.forEach(u => u.draw());

  selectedUnits.forEach(u => {
    u.drawSelectionBox(); 
  });

  if (isMouseDragging) {
    drawOutlineRectangleByCoordinates(lassoX1, lassoY1, lassoX2, lassoY2, '#22FF00');
  }
}

