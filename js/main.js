let canvas;
let canvasContext;

const FPS = 30;
const ENEMY_NUMBER = 5;

let testUnit = new Unit();

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
  testUnit.goToX = x;
  testUnit.goToY = y;
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

  testUnit.init(playerPic); 
}

function animate() {
  
  testUnit.move();
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');
  //drawImageCenteredAtLocationWithRotation(bgPic, canvas.width/2, canvas.height/2, 0);

  testUnit.draw();
}