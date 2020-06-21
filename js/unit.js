class Unit {
  PLACEHOLDER_RADIUS = 8;
  SELECTION_BOX_SIZE_HALF = 8;
  SPEED = 2;
  UNIT_RANK_SPACING = this.PLACEHOLDER_RADIUS*3;
  ATTACK_RANGE = 55;
  AI_ATTACK_INITIATE = this.ATTACK_RANGE+10;
  PLAYABLE_AREA_MARGIN = 20;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.isDead = false;
    this.isPlayer = false;
    this.target = null;
  }

  reset() {
    this.isDead = false;
    
    this.x = Math.random()*canvas.width/2;
    this.y = Math.random()*canvas.height/2;
    this.angle = 0;

    if (!this.isPlayer) {
      this.x = canvas.width - this.x;
      this.y = canvas.height - this.y;
    }

    this.goToX = this.x;
    this.goToY = this.y;
  }

  init(img, isPlayer) {
    this.imgSprite = img;

    this.isPlayer = isPlayer;

    this.reset();
  }

  isInBox(x1, y1, x2, y2) {
    // x is between x1 and x2 if one of the subtraction x-x1 and x-x2 operations gives a negative number
    // check this for both x and y to determine if coordinates are within a box
    return (this.x-x1)*(this.x-x2) < 0 && (this.y-y1)*(this.y-y2) < 0;
  }

  distanceFrom(fromX, fromY) {
    let deltaX = fromX - this.x;
    let deltaY = fromY - this.y;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  }

  goToNear(nearX, nearY, formationPosition, formationDimention) {
    const colNum = formationPosition % formationDimention;
    const rowNum = Math.floor(formationPosition / formationDimention);
    this.goToX = nearX + colNum*this.UNIT_RANK_SPACING;
    this.goToY = nearY + rowNum*this.UNIT_RANK_SPACING;
    //this.goToX = nearX + Math.random()*this.MAX_RAND_DIST_FROM_TARGET * Math.cos(Math.random()*Math.PI*2);
    //this.goToY = nearY + Math.random()*this.MAX_RAND_DIST_FROM_TARGET * Math.sin(Math.random()*Math.PI*2);
  }

  move(opponentUnits) {
    if (this.target !== null) {
      if (this.target.isDead) {
        this.target = null;
        this.goToX = this.x;
        this.goToY = this.y;
      } else if (this.distanceFrom(this.target.x, this.target.y) > this.ATTACK_RANGE) {
        this.goToX = this.target.x;
        this.goToY = this.target.y;
      } else {
        this.target.isDead = true;
        this.goToX = this.x;
        this.goToY = this.y;
        doUnitCleanup = true;
      }
    } else if (!this.isPlayer && opponentUnits !== null) {
      if (Math.random() < 0.01) {
        let nearestOpponentFound = findClosestUnitInRange(this.x, this.y, this.AI_ATTACK_INITIATE, opponentUnits);

        if (nearestOpponentFound != null) {
          this.target = nearestOpponentFound;
        } else {
          this.goToX = this.x - Math.random()*40;
          this.goToY = this.y - Math.random()*40;
        }
      }
    }

    this.stayInBattlefield();

    if (this.x === this.goToX && this.y === this.goToY) {
      return;
    }
    
    let deltaX = this.goToX - this.x;
    let deltaY = this.goToY - this.y;
    this.angle = Math.atan2(deltaY, deltaX);

    let distToGo = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distToGo > this.SPEED) {
      this.x += this.SPEED * Math.cos(this.angle);
      this.y += this.SPEED * Math.sin(this.angle);
    } else {
      this.x = this.goToX;
      this.y = this.goToY;
    }
  }

  stayInBattlefield() {
    if (this.goToX < this.PLAYABLE_AREA_MARGIN) {
      this.goToX = this.PLAYABLE_AREA_MARGIN;
    } else if (this.goToX > canvas.width - this.PLAYABLE_AREA_MARGIN) {
      this.goToX = canvas.width - this.PLAYABLE_AREA_MARGIN;
    }

    if (this.goToY < this.PLAYABLE_AREA_MARGIN) {
      this.goToY = this.PLAYABLE_AREA_MARGIN;
    } else if (this.goToY > canvas.height - this.PLAYABLE_AREA_MARGIN) {
      this.goToY = canvas.height - this.PLAYABLE_AREA_MARGIN;
    }
  }

  setTarget(newTarget) {
    this.target = newTarget;
  }

  drawSelectionBox() {
    drawOutlineRectangleByCoordinates(
      this.x-this.SELECTION_BOX_SIZE_HALF, 
      this.y-this.SELECTION_BOX_SIZE_HALF, 
      this.x+this.SELECTION_BOX_SIZE_HALF, 
      this.y+this.SELECTION_BOX_SIZE_HALF, 
      '#22FF00');
  }

  draw() {
    if (!this.isDead) {
      drawImageCenteredAtLocationWithRotation(this.imgSprite, this.x, this.y, this.angle);
    }
  }
}