var trex,trexrunning,ground,groundimg,invisible,ground2,cloud,cloudimg,obstacel1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle,cloudgroup,obstaclegroup,gameover,restart,gameoverimg,restartimg,trex2,count;
localStorage["highestscore"]=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jump;
function preload(){
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundimg=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
  trex2=loadImage("trex_collided.png")
  jump=loadSound("jump.mp3")
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,150)
  trex.addAnimation("running",trexrunning)
  trex.addAnimation("collided",trex2)
  trex.scale=0.5 
  ground=createSprite(300,175,600,20)
  ground.addImage("ground",groundimg)
  ground.velocityX=-5
  ground2=createSprite(300,185,600,20)  
  ground2.visible=false
  cloudgroup=new Group()
  obstaclegroup=new Group()
  gameover=createSprite(300,100)
  restart=createSprite(300,140)
  gameover.addImage(gameoverimg)
  restart.addImage(restartimg)
  gameover.visible = false;
    restart.visible = false;
  gameover.scale=0.5
  restart.scale=0.5
  count=0
}

function draw() {
  background(255,255,255);
  text("Score: "+ count, 450,50);
  if(gameState===PLAY){
 count = count + Math.round(getFrameRate()/60);
  if(ground.x<0){
    ground.x=ground.width/2
  }
  if(keyWentDown("space")&&trex.collide(ground2)){ 
  trex.velocityY=-13;
    jump.play();
  }
  trex.velocityY=trex.velocityY+0.8
  trex.collide(ground2)
  spawnclouds();
  spawnobstacles();
  if(obstaclegroup.isTouching(trex)){
  gameState=END  
  }
  }
    else if(gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided",trex2)  
    if(mousePressedOver(restart)) {
    reset();
  }  
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    
  }
  drawSprites() 
}
function spawnclouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,Math.round(random(80,120)),50,30)
    cloud.velocityX=-5
    cloud.addImage("cloud",cloudimg)
    trex.depth=cloud.depth+1
    cloud.lifetime=120
    cloudgroup.add(cloud)
  }
}
function spawnobstacles(){
  if(frameCount%60===0){
    obstacle=createSprite(600,165,10,40)
    obstacle.scale=0.5
    obstacle.velocityX=-5
    var r=Math.round(random(1,6))
    switch(r){
      case 1:obstacle.addImage(obstacle1)
        break;
       case 2:obstacle.addImage(obstacle2)
        break;
         case 3:obstacle.addImage(obstacle3)
        break;
         case 4:obstacle.addImage(obstacle4)
        break;
         case 5:obstacle.addImage(obstacle5)
        break;
         case 6:obstacle.addImage(obstacle6)
        break;
        default:break;
    }
    obstacle.lifetime=120
    obstaclegroup.add(obstacle)
  }
}
function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
  trex.changeAnimation("running",trexrunning);
  if(localStorage["highestscore"]<count){
    localStorage["highestscore"]=count;
    text("HI "+localStorage["highestscore"],350,50)
  }
  count = 0;
  
}
