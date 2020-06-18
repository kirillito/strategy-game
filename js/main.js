let canvas;
let canvasContext;

const FPS = 30;

const MOUSE_DRAGGING_THRESHOLD = 10;
const MOUSE_SELECTION_THRESHOLD_DISTANCE = 12;

const PLAYER_START_UNITS = 100;
const ENEMY_START_UNITS = 50;

let playerUnits = [];
let selectedUnits = [];
let enemyUnits = [];

let lassoX1 = 0,
    lassoY1 = 0,
    lassoX2 = 0,
    lassoY2 = 0;
let isMouseDragging = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // document.getElementById("playerName").innerHTML = player.name;
  // document.getElementById("playerNameControls").innerHTML = player.name;

  //this.initInput();
  this.loadImages();

  canvas.addEventListener('mousemove', (e) => {
      if (isMouseDragging) {
        let {x, y} = this.calculateMousePos(e);
        lassoX2 = x;
        lassoY2 = y;
      }
    }
  );

  canvas.addEventListener('mousedown', (e) => {
    let {x, y} = this.calculateMousePos(e);
    lassoX1 = x;
    lassoY1 = y;
    lassoX2 = x;
    lassoY2 = y;
    isMouseDragging = true;
  });

  canvas.addEventListener('mouseup', (e) => {
    isMouseDragging = false;

    if (isMouseDraggingThresholdPassed()) {
      selectedUnits = [];

      playerUnits.forEach((u) => {
        if (u.isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
          selectedUnits.push(u);
        }
      });
    } else {
      let {x, y} = calculateMousePos(e);
      let clickedUnit = getUnitAtCoordinates(x, y);

      if (clickedUnit !== null && !clickedUnit.isPlayer) {
        console.log(selectedUnits.length + " will attack the enemy!", clickedUnit);
      } else {
        let formationSize = Math.floor(Math.sqrt(selectedUnits.length + 2));
        selectedUnits.forEach((u, i) => u.goToNear(x, y, i, formationSize));
      }
    }
  });

  canvas.addEventListener('click', handleMouseClick);
}

function calculateMousePos(e) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft
  var mouseY = e.clientY - rect.top - root.scrollTop

  return {
    x:mouseX,
    y:mouseY
  }
}

function isMouseDraggingThresholdPassed() {
  let deltaX = lassoX1-lassoX2;
  let deltaY = lassoY1-lassoY2;
  let draggingDistance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);

  return (draggingDistance > MOUSE_DRAGGING_THRESHOLD);
}

function getUnitAtCoordinates(x, y) {
  let closestDistanceToCoordinates = MOUSE_SELECTION_THRESHOLD_DISTANCE;
  let closestUnit = null;

  playerUnits.forEach(u => {
    let dist = u.distanceFrom(x, y);
    if (dist < closestDistanceToCoordinates) {
      closestUnit = u;
      closestDistanceToCoordinates = dist;
    }
  });

  enemyUnits.forEach(u => {
    let dist = u.distanceFrom(x, y);
    if (dist < closestDistanceToCoordinates) {
      closestUnit = u;
      closestDistanceToCoordinates = dist;
    }
  });

  return closestUnit;
}

function handleMouseClick(e) {

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