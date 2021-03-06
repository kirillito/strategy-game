const PLAYER_START_UNITS = 100;
const ENEMY_START_UNITS = 50;

let playerUnits = [];
let enemyUnits = [];
let allUnits = [];

function createTeam(team, size, sprite, isPlayer) {
  for (i=0; i<size; i++) {
    createUnit(team, sprite, isPlayer);
  }
}
  
function createUnit(team, sprite, isPlayer) {
  let u = new Unit();
  u.init(sprite, isPlayer);
  team.push(u);
  allUnits.push(u);
}

function findClosestUnitInRange(fromX, fromY, maxRange, unitList) {
  let nearestUnitDistance = maxRange;
  let nearestUnit = null;
  
  unitList.forEach(u => {
    let distanceTo = u.distanceFrom(fromX, fromY);
    if (distanceTo < nearestUnitDistance) {
      nearestUnitDistance = distanceTo;
      nearestUnit = u;
    }
  });

  return nearestUnit;
}

function removeDeadUnitsFromTeam(fromArray) {
  for(var	i=fromArray.length-1;	i>=0;	i--)	{
    if(fromArray[i].isDead)	{
      fromArray.splice(i,1);
    }
  }
}

function removeDeadUnits()	{
  removeDeadUnitsFromTeam(allUnits);
  removeDeadUnitsFromTeam(playerUnits);
  removeDeadUnitsFromTeam(enemyUnits);
  removeDeadUnitsFromTeam(selectedUnits);
  doUnitCleanup = false;
}

function checkWinner() {
  if (playerUnits.length === 0 && enemyUnits.length === 0) {
    document.getElementById('debugMessage').innerHTML = 'It\'s a draw!';   
  } else if (playerUnits.length === 0) {
    document.getElementById('debugMessage').innerHTML = 'Enemy wins!';   
  } else if (enemyUnits.length === 0) {
    document.getElementById('debugMessage').innerHTML = 'Player wins!';   
  }
}