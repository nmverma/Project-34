var dog,happyDog,dogImg;
var database;
var foodS,foodStock;

function preload(){
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
dog = createSprite(250,300,150,150);
 dog.addImage(dogImg);
 dog.scale = 0.15;
  foodStock = database.ref('Food');
    foodStock.on("value",readStock, showError);
    textSize(20);
}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

if(keyWentUp(UP_ARROW)){
  
  dog.addImage(dogImg);
}

if(foodS===0){
  foodS=20;
}

console.log(happyDog);
  drawSprites();
  fill("yellow");
  strokeWeight(5);
  stroke("Red");
  text("Food remaning :"+foodS,170,200);
  textSize(15);
  text("Note : Press up_arrow key to feed milk to Gennie ",130,10,400,20);

}

function showError(){
  console.log("Error in writing to the database");
}


function readStock(data){
  foodS = data.val();
  }
  
  function writeStock(x){
    if(x <= 0){
      x = 0;
    }
    else{
      x = x-1;
    }
      database.ref("/").update({
        Food : x,
      })
    }

