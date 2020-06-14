// Common graphics functions

function drawRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function drawOutlineRectangleByCoordinates(x1, y1, x2, y2, drawColor) {
  canvasContext.strokeStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.rect(x1,y1,x2-x1,y2-y1);
  canvasContext.stroke();
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
  canvasContext.fill();
}

function drawImageCenteredAtLocationWithRotation(graphic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x,y);
  canvasContext.rotate(angle);	//	sets	the	rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
  canvasContext.restore();
}

function drawImageCenteredAtLocationWithScaling(graphic, x, y, width, height) {
  canvasContext.save();
  canvasContext.translate(x,y);
  canvasContext.drawImage(graphic,-width/2,-height/2, width, height);
  canvasContext.restore();
}
