const MOUSE_DRAGGING_THRESHOLD = 10;
const MOUSE_SELECTION_THRESHOLD_DISTANCE = 12;

let selectedUnits = [];

let lassoX1 = 0,
    lassoY1 = 0,
    lassoX2 = 0,
    lassoY2 = 0;
let isMouseDragging = false;

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
  return findClosestUnitInRange(x, y, MOUSE_SELECTION_THRESHOLD_DISTANCE, allUnits);
}

function mouseMoveHandler(e) {
  if (isMouseDragging) {
    let {x, y} = calculateMousePos(e);
    lassoX2 = x;
    lassoY2 = y;
  }
}


function mouseDownHandler(e) {
  let {x, y} = calculateMousePos(e);
  lassoX1 = x;
  lassoY1 = y;
  lassoX2 = x;
  lassoY2 = y;
  isMouseDragging = true;
}

function mouseUpHandler(e) {
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
      selectedUnits.forEach(u => u.setTarget(clickedUnit));
    } else {
      let formationSize = Math.floor(Math.sqrt(selectedUnits.length + 2));
      selectedUnits.forEach((u, i) => u.goToNear(x, y, i, formationSize));
    }
  }
}



function handleMouseClick(e) {

}