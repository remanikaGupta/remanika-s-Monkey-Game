
var monkey , monkey_running,monkeyAnimate;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyAnimate = loadAnimation("sprite_3.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight)
 monkey=createSprite(100,height-40,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.11
  
  // banana=createSprite(220,200,30,30)
 //banana.addImage("banana_image",bananaImage);
 //banana.scale=0.1
  
 //  obstacle=createSprite(220,360,30,30)
//obstacle.addImage("obstacle_image",obstacleImage);
//obstacle.scale=0.13
  
 ground=createSprite(250,height-40,width+1500,16)
 ground.velocityX=-8;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.addAnimation("monkeyAnimation", monkeyAnimate)
}


function draw() {
background("lightblue")
  textSize(18)
  text("Score: "+ score,300 ,height-500);
  
 if(gameState===PLAY){
   
  if(foodGroup.isTouching(monkey)){
    score=score+2
    foodGroup[0].destroy(); 
  }
    
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(touches.length>0 || keyDown("space")&& monkey.y >= height-100 ) {
        monkey.velocityY = -14 ;
    touches = [];
}
  
monkey.velocityY = monkey.velocityY + 0.8
 
  
  spawnObstacle();
  spawnFood();
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
 }

  
  if(gameState===END){
   
    ground.velocityX = 0;
     
    foodGroup.destroyEach();
   obstacleGroup.destroyEach();
    
    monkey.changeAnimation("monkeyAnimation",monkeyAnimate);
    
  }
   monkey.collide(ground)
   drawSprites();
}

function spawnObstacle() {
  
  if (frameCount % 100 === 0) {
       obstacle = createSprite(width,height-70,30,30);
       obstacle.addImage(obstacleImage)
      obstacle.scale=0.13
      obstacle.velocityX=-7
      obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);
    }
  
}

function spawnFood() {
 
  if (frameCount % 90 === 0) {
    banana = createSprite(600,height-100,40,10);
    banana.y = Math.round(random(height-300,height-100));
    banana.addImage( bananaImage);
    banana.scale = 0.1
    banana.velocityX = -4; 
    banana.lifetime = 300;
     foodGroup.add(banana);
}
  }
  
