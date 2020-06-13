class Unit {
  PLACEHOLDER_RADIUS = 8;
  SPEED = 2;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.isDead = false;
  }

  reset() {
    this.isDead = false;
    
    this.x = Math.random()*canvas.width/4;
    this.y = Math.random()*canvas.height/4;

    this.goToX = this.x;
    this.goToY = this.y;
  }

  init(img) {
    this.imgSprite = img;

    this.reset();
  }

  move() {
    let deltaX = this.goToX - this.x;
    let deltaY = this.goToY - this.y;
    let moveAngle = Math.atan2(deltaY, deltaX);
    this.x += this.SPEED * Math.cos(moveAngle);
    this.y += this.SPEED * Math.sin(moveAngle);
  }

  draw() {
    if (!this.isDead) {
      drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y, this.PLACEHOLDER_RADIUS*2, this.PLACEHOLDER_RADIUS*2);
    }
  }
}