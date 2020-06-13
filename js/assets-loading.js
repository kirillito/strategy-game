var bgPic = new Image();
var playerPic = new Image();
var enemyPic = new Image();
var tilePics = [];

var imagesToLoad = 0;

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = new Image();
  beginLoadingImage(tilePics[tileCode], fileName);
}

function loadImages() {
  var	imageList	=	[
     {imgNode:playerPic,	fileName:"unit.png"},
     {imgNode:enemyPic, fileName:"enemy.png"},
     {imgNode:bgPic, fileName:"bg.jpg"},

    ];
    
  imagesToLoad = imageList.length;

  for (img of imageList) {
    if (img.tileCode !== undefined) {
      loadImageForTileCode(img.tileCode, img.fileName);
    } else {
      beginLoadingImage(img.imgNode,img.fileName);
    }    
  }
}

function beginLoadingImage(imgNode, fileName) {
  imgNode.src = "images/" + fileName;
  imgNode.onload = setAssetAsLoadedAndLaunchIfReady();
}

function setAssetAsLoadedAndLaunchIfReady() {
  imagesToLoad--;
  this.launchIfReady();
}