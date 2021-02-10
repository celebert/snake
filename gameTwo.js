//--init 

var end = 0;
//starting position

var colOne = 49
var rowOne = 3
snakeOnePos = [{col:49,row:3},{col:49,row:2}]

var colTwo = 2
var rowTwo = 48
snakeTwoPos = [{col:2,row:48},{col:2,row:49}]

allPoints = 0

//create both snakes
for(i=0; i<2; i++){
let div = document.createElement("div")
let divTwo = document.createElement("div")
div.classList.add("snakeOne")
document.getElementById("playBox").appendChild(div)
divTwo.classList.add("snakeTwo")
document.getElementById("playBox").appendChild(divTwo)
}
snakeOne = document.getElementsByClassName("snakeOne");
snakeTwo = document.getElementsByClassName("snakeTwo");

snakeOneLength = snakeOnePos.length
snakeTwoLength = snakeTwoPos.length

for(let i=0; i<snakeOneLength;i++){
  snakeOne[i].style.gridColumn = `${snakeOnePos[i].col}`
  snakeOne[i].style.gridRow = `${snakeOnePos[i].row}`
}
for(let i=0; i<snakeTwoLength;i++){
  snakeTwo[i].style.gridColumn = `${snakeTwoPos[i].col}`
  snakeTwo[i].style.gridRow = `${snakeTwoPos[i].row}`
}


var foodCreate = document.createElement("div");
foodCreate.id = "food"


// //create board
for (let i = 1; i < 51; i++) {
  if(i%2==0){
  for (let n = 1; n < 51; n+=2) {
  var div = document.createElement("div");
  div.classList.add("darker")
  div.style.gridColumn = n
  div.style.gridRow = i
  document.getElementById("board").appendChild(div);
  }}else{
    for (let n = 2; n < 51; n+=2) {
      var div = document.createElement("div");
      div.classList.add("darker")
      div.style.gridColumn = n
      div.style.gridRow = i
      document.getElementById("board").appendChild(div);
  }
}
}


//--init
//starts after 3 seconds
setTimeout(function(){
document.getElementById("playBox").appendChild(foodCreate);
createFood()
  
//--movement init

var moveOne = 2
var moveTwo = 1

var keyPressedOne = false
var keyPressedTwo = false

document.onkeydown = checkKey;


function checkKey(e) {

    e = e || window.event;

    //player one
    //up
    if(keyPressedOne == false){
      if (e.keyCode == '38' && moveOne != 2) {
      keyPressedOne = true
      moveOne = 1
      }
    }
    //down
    if(keyPressedOne == false){
      if (e.keyCode == '40' && moveOne != 1) {
      keyPressedOne = true
      moveOne = 2
      }
    }
    //left
    if(keyPressedOne == false){
      if (e.keyCode == '37' && moveOne != 4) {
      keyPressedOne = true
      moveOne = 3
      }
    }
    //right
    if(keyPressedOne == false){
      if (e.keyCode == '39' && moveOne != 3) {
      keyPressedOne = true
      moveOne = 4
      }
    }
    //player two
    //w
    if(keyPressedTwo == false){
      if (e.keyCode == '87' && moveTwo != 2) {
        keyPressedTwo = true
        moveTwo = 1
      }
    }
    //s
    if(keyPressedTwo == false){
      if (e.keyCode == '83' && moveTwo != 1) {
        keyPressedTwo = true
        moveTwo = 2
      }
    }
    //a
    if(keyPressedTwo == false){
      if (e.keyCode == '65' && moveTwo != 4) {
        keyPressedTwo = true
        moveTwo = 3
      }
    }
    //d
    if(keyPressedTwo == false){
      if (e.keyCode == '68' && moveTwo != 3) {
        keyPressedTwo = true
        moveTwo = 4
      }
    }
}

function game(){
  
  //movement by key

   //player one
  switch (moveOne){
    case 1:
      rowOne-=1;
      keyPressedOne = false
      break;
    case 2:
      rowOne+=1;
      keyPressedOne = false
      break
    case 3:
      colOne-=1;
      keyPressedOne = false
      break
    case 4:
      colOne+=1;
      keyPressedOne = false
      break
    case 5:
      colOne+=0;
      rowOne+=0;
      break
  }
  //possibility to move through walls
    if(colOne==51){
      colOne=1;
    }
    if(rowOne==51){
      rowOne=1;
    }
    if(colOne==0){
      colOne=50;
    }
    if(rowOne==0){
      rowOne=50;
    }
    
  //player two
    switch (moveTwo){
      case 1:
        rowTwo-=1;
        keyPressedTwo = false
        break;
      case 2:
        rowTwo+=1;
        keyPressedTwo = false
        break
      case 3:
        colTwo-=1;
        keyPressedTwo = false
        break
      case 4:
        colTwo+=1;
        keyPressedTwo = false
        break
      case 5:
        colTwo+=0;
        rowTwo+=0;
        break
    }
    //possibility to move through walls
      if(colTwo==51){
        colTwo=1;
      }
      if(rowTwo==51){
        rowTwo=1;
      }
      if(colTwo==0){
        colTwo=50;
      }
      if(rowTwo==0){
        rowTwo=50;
      }

    //if food picked, increase length of snake and create new food
    if(colOne == foodcol && rowOne == foodrow){

      snakeOneLength+=1
      createFood()
      var div = document.createElement("div");
      div.className = "snakeOne";
      document.getElementById("playBox").appendChild(div);
      document.getElementById("scoreOne").innerHTML=`Score: ${snakeOneLength-2}`;
    }

    if(colTwo == foodcol && rowTwo == foodrow){
      snakeTwoLength+=1
      createFood()
      var divTwo = document.createElement("div");
      divTwo.className = "snakeTwo";
      document.getElementById("playBox").appendChild(divTwo);
      document.getElementById("scoreTwo").innerHTML=`Score: ${snakeTwoLength-2}`;
    }

  changePosOne()
  changePosTwo()



}
//how fast the game updates
play = setInterval(game, 50)

//--movement


//creating food at random position
function createFood(){
var food = document.getElementById("food");
foodcol = Math.floor(Math.random() * 50)+1;  
foodrow = Math.floor(Math.random() * 50)+1;  
food.style.gridColumn = `${foodcol}`
food.style.gridRow = `${foodrow}`
allPoints+=1

}
//adding position of snake head to 0 index
function changePosOne(){
let allSnakeLength = snakeOneLength+snakeTwoLength
snakeOnePos.splice(0,0,{col:colOne,row:rowOne})

//deleting last position if there are more positions than actual snake length
if(snakeOnePos.length>snakeOneLength){
  snakeOnePos.splice(-1,1)
}


//adding tail of snake
for(let i=0; i<allSnakeLength;i++){
  let wholeSnakeOne = document.querySelectorAll('.snakeOne');
  if(wholeSnakeOne.length>0 && i<snakeOneLength ){
    snakeOne[i].style.gridColumn = `${snakeOnePos[i].col}`
    snakeOne[i].style.gridRow = `${snakeOnePos[i].row}`
    //comparing if head has the same position as rest of body(if it is, you lose)
    snakeOneHead = JSON.stringify(snakeOnePos[0])
    snakeOneBody = JSON.stringify(snakeOnePos[i+1])
    //comparing if head has the same position as rest of body(if it is, you lose)
    if(snakeOneHead === snakeOneBody){
    
      moveOne=5
      lose()
      break
    }
  }
  
  if(i<snakeTwoLength ){
    snakeTwoBody = JSON.stringify(snakeTwoPos[i])
    if(snakeOneHead === snakeTwoBody){
      lose()
  }
  }
}
}


function changePosTwo(){
snakeTwoPos.splice(0,0,{col:colTwo,row:rowTwo})
let allSnakeLength = snakeOneLength+snakeTwoLength
//deleting last position if there are more positions than actual snake length
  if(snakeTwoPos.length>snakeTwoLength){
    snakeTwoPos.splice(-1,1)
  }


//adding tail of snake
  for(let i=0; i<allSnakeLength;i++){
    let wholeSnakeTwo = document.querySelectorAll('.snakeTwo');
    if(wholeSnakeTwo.length>0 && i<snakeTwoLength ){
    snakeTwo[i].style.gridColumn = `${snakeTwoPos[i].col}`
    snakeTwo[i].style.gridRow = `${snakeTwoPos[i].row}`
    //comparing if head has the same position as rest of body(if it is, you lose)
    snakeTwoHead = JSON.stringify(snakeTwoPos[0])
    snakeTwoBody = JSON.stringify(snakeTwoPos[i+1])
     if(snakeTwoHead === snakeTwoBody){
      moveTwo=5
      loseTwo()
      break
    }
  }
  if(i<snakeOneLength ){
    snakeOneBody = JSON.stringify(snakeOnePos[i])
    if(snakeTwoHead === snakeOneBody){
      loseTwo()
  }
}
  }




}
},3000)

function lose(){
  
  let wholeSnakeOne = document.querySelectorAll('.snakeOne');
  for(let i=0; i<wholeSnakeOne.length;i++){
    wholeSnakeOne[i].remove()
  }


document.getElementById("instructionsOne").style.backgroundColor="red"
document.getElementById("scoreOne").style.backgroundColor="red"
end+=1
console.log(end)
if(end==2){
  endInfo()
}
}





function loseTwo(){
  

wholeSnakeTwo = document.querySelectorAll('.snakeTwo');
for(let i=0; i<wholeSnakeTwo.length;i++){
  wholeSnakeTwo[i].remove()
}

document.getElementById("instructionsTwo").style.backgroundColor="red"
document.getElementById("scoreTwo").style.backgroundColor="red"
end+=1
if(end==2){
  endInfo()
}

}
function retry(){
  location.reload();
}

function endInfo(){
  document.getElementById("food").style.display = "none"
  let divInfo = document.createElement("div");
  let divText = document.createElement("div");
  let divScore = document.createElement("div");

  //ending screen
  divInfo.classList.add("info") 
  document.getElementById("content").appendChild(divInfo)

  if(snakeOneLength>snakeTwoLength){
    divText.innerHTML = "Green wins"
    divScore.innerHTML = `Score: ${snakeOneLength-2}`
  }else if(snakeOneLength==snakeTwoLength){
    divText.innerHTML = "Draw"
  }else{
    divText.innerHTML = "Blue wins"
    divScore.innerHTML = `Score: ${snakeTwoLength-2}`
  }
  document.getElementsByClassName("info")[0].appendChild(divText)
  divScore.style.fontSize = "4vh"
  document.getElementsByClassName("info")[0].appendChild(divScore)

}
