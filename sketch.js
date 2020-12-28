  //creating variables globally
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var survivalTime=0;
var score=0;

function preload(){
  
    //loading monkey images
  monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    //loading banana and obstacle images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
    //creating canvas 
  createCanvas(400,400);

    //creating monkey sprite
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

    //creating ground sprite
  ground=createSprite(400,350,900,100);
  ground.shapeColor="green";
  ground.velocityX=-4;
  ground.x=ground.width/2;
    //console log
  console.log(ground.x);

    //creating groups for obstacles and banana
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();  
}


function draw() {
  
    //setting background colour to pink
  background("pink")

    //infinite ground
  if(ground.x<0){
   ground.x=ground.width/2;
  }

    //making mankey to jump
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY=-12;
  }

    //giving gravity to monkey
  monkey.velocityY=monkey.velocityY+0.8; monkey.collide(ground);

    //calling functions for bananas and obstacles
  spawnBananas();
  spawnObstacles();  
  drawSprites();

    //functions if monkey is touching any obstacle
  if(monkey.isTouching(obstaclesGroup)){
  ground.velocityY=0;
  monkey.velocityY=0;
  bananaGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  bananaGroup.setLifetimeEach(-1)
  obstaclesGroup.setLifetimeEach(-1)

  }

    //displaying survival time properly
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
}


  //function for bananas
function spawnBananas(){
    if(frameCount%80===0){
    banana=createSprite(280,120,10,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-2;
    banana.lifetime=300;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

  
  //functions for obstacles
function spawnObstacles(){
    if(frameCount%300===0){
    obstacle=createSprite(600,285,10,40);
    //obstacle.y=Math.round(random(165,235));
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
    }  

}


