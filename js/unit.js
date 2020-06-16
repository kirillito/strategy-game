class Unit {
  PLACEHOLDER_RADIUS = 8;
  SELECTION_BOX_SIZE_HALF = 8;
  SPEED = 2;
  MAX_RAND_DIST_FROM_TARGET = 100;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.isDead = false;
  }

  reset() {
    this.isDead = false;
    
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.angle = 0;

    this.goToX = this.x;
    this.goToY = this.y;
  }

  init(img) {
    this.imgSprite = img;

    this.reset();
  }

  isInBox(x1, y1, x2, y2) {
    // x is between x1 and x2 if one of the subtraction x-x1 and x-x2 operations gives a negative number
    // check this for both x and y to determine if coordinates are within a box
    return (this.x-x1)*(this.x-x2) < 0 && (this.y-y1)*(this.y-y2) < 0;
  }

  goToNear(nearX, nearY) {
    this.goToX = nearX + Math.random()*this.MAX_RAND_DIST_FROM_TARGET * Math.cos(Math.random()*Math.PI*2);
    this.goToY = nearY + Math.random()*this.MAX_RAND_DIST_FROM_TARGET * Math.sin(Math.random()*Math.PI*2);
  }

  move() {
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