let canvas;
let canvasContext;

const FPS = 30;
const PLAYER_START_UNITS = 25;
const ENEMY_START_UNITS = 250;

let playerUnits = [];
let enemyUnits = [];

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // document.getElementById("playerName").innerHTML = player.name;
  // document.getElementById("playerNameControls").innerHTML = player.name;

  //this.initInput();
  this.loadImages();

  canvas.addEventListener('mousemove', 
    function(e) {
      var mousePos = calculateMousePos(e);
    }
  );

  canvas.addEventListener('mousedown', handleMouseClick);
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

function handleMouseClick(e) {
  let {x, y} = calculateMousePos(e);
  playerUnits.forEach(u => u.goToNear(x, y));

  enemyUnits.forEach(u => u.goToNear(x, y));
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
    p.init(playerPic);
    playerUnits.push(p);
  }
  for (i=0; i<ENEMY_START_UNITS; i++) {
    let e = new Unit();
    e.init(enemyPic);
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
}