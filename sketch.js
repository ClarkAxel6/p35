var balloon, balloonIMG;
var backgroundIMG;
var database;
var position;

function preload(){
  backgroundIMG = loadImage('background.jpg');
  balloonIMG = loadImage('balloon.png'); 
}

function setup() {
  createCanvas(1200,800);
  balloon = createSprite(200, 200, 50, 50);
  balloon.addImage(balloonIMG);
  balloon.scale = 0.6;

  database = firebase.database();
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on('value', readPosition);
}

function draw() {
  background(backgroundIMG);

  fill('green');
  textSize(24);
  text('Use arrow keys to move around', 100, 40);

  if(position != undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        balloon.scale = balloon.scale + 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        balloon.scale = balloon.scale - 0.01;
    }
}

  drawSprites();
}

function readPosition(data){
  console.log(data.val());
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function changePosition(x,y){
  database.ref('balloon/position').set({
      x: position.x + x,
      y: position.y + y
  });
}
