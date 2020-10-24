var PLAY = 1;
var END = 0;
var gameState = PLAY

var ghost , ghostImage , ghost_Jump , ghost_Jump_Image 
var tower , towerImage
var climber , climberImage
var door , doorImage
var block

function preload(){
  towerImage = loadImage ("tower.png")
  ghostImage = loadImage ("ghost-standing.png")
  climberImage = loadImage ("climber.png")
  doorImage = loadImage ("door.png")
  ghost_Jump_Image = loadImage ("ghost-jumping.png")
}

function setup (){
  createCanvas (600,600)
  
 doorGroup = new Group ();
 climberGroup = new Group();
 blockGroup = new Group();
  
  tower = createSprite (300,300,60,60)
  tower.addImage (towerImage)
  tower.scale = 1
  
   
  ghost = createSprite (300,300,40,40)
  ghost.addImage (ghostImage)
  ghost.addImage (ghost_Jump_Image)
  ghost.scale = 0.5
  
}

function draw (){
  background ("black")
if (gameState === PLAY)  {

  
  tower.velocityY = 3
  if (tower.y>400){
    tower.y = 300
  }  
  
  if(keyDown("space")){
    ghost.velocityY = -6
    ghost.addImage(ghost_Jump_Image)
  }
  ghost.velocityY = ghost.velocityY +1
  
  if (keyDown("right")){
    ghost.x = ghost.x + 6
    

  }
  
  if (keyDown("left")){
    ghost.x = ghost.x - 6
  }
    spawndoor();
  
if (ghost.isTouching(climberGroup)){
  ghost.velocityY = 0
}
  if (ghost.isTouching(blockGroup)){
    ghost.destroy();
    gameState = END;
  }
}
 if (gameState === END){
    tower.velocityY = 0
    doorGroup.setVelocityYEach(0)
    climberGroup.setVelocityYEach(0)
    blockGroup.setVelocityYEach(0) 
   
   doorGroup.setLifetimeEach(-1)
   climberGroup.setLifetimeEach(-1)
   blockGroup.setLifetimeEach(-1)
 }

  drawSprites();
  if (gameState === END){
       fill("white")
   textSize(20)
   text("Game Over",300,300)
  }
}

function spawndoor (){
  if (frameCount%240 === 0){
    door = createSprite (300,0,40,40)
    door.addImage(doorImage)
    door.scale =  1.0
    door.velocityY = 3
    door.lifetime = 500
    
    door.x = Math.round (random(100,500))


doorGroup.add(door)
    
    climber = createSprite (300,50,door.width,5)
    climber.addImage (climberImage)
    climber.velocityY = 3
    climber.lifetime = 500
        climber.x = door.x
     
climberGroup.add(climber)    
    
    block = createSprite (300,70,60,2)
    block.debug = true
    block.velocityY = 3
    block.lifetime = 500
        block.x = door.x   
blockGroup.add(block)
    
        ghost.depth = door.depth+1
  }
}

