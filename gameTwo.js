//--init 

var snakeOne = document.getElementsByClassName("snakeOne");
var snakeTwo = document.getElementsByClassName("snakeTwo");
var end = 0;
//starting position
var colOne = 49
var rowOne = 3
snakePosOne = [{col:49,row:3},{col:49,row:2}]

var colTwo = 2
var rowTwo = 48
snakePosTwo = [{col:2,row:48},{col:2,row:49}]

snakeLengthOne = snakePosOne.length
snakeLengthTwo = snakePosTwo.length

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

setTimeout(function(){
document.getElementById("playBox").appendChild(foodCreate);
createFood()
//--movement 


//movement by key
document.onkeydown = checkKey;

var moveOne = 2
var moveTwo = 1

function checkKey(e) {

    e = e || window.event;

    //player one
    //up
    if (e.keyCode == '38' && moveOne != 2) {
      moveOne = 1
    }
    //down
    else if (e.keyCode == '40' && moveOne != 1) {
      moveOne = 2
    }
    //left
    else if (e.keyCode == '37' && moveOne != 4) {
      moveOne = 3
    }
    //right
    else if (e.keyCode == '39' && moveOne != 3) {
      moveOne = 4
    }

    //player two
    //w
    if (e.keyCode == '87' && moveTwo != 2) {
      moveTwo = 1
    }
    //s
    else if (e.keyCode == '83' && moveTwo != 1) {
      moveTwo = 2
    }
    //a
    else if (e.keyCode == '65' && moveTwo != 4) {
      moveTwo = 3
    }
    //d
    else if (e.keyCode == '68' && moveTwo != 3) {
      moveTwo = 4
    }
}
//changing position of snake head
function game(){
   //player one
  switch (moveOne){
    case 1:
      rowOne-=1;
      break;
    case 2:
      rowOne+=1;
      break
    case 3:
      colOne-=1;
      break
    case 4:
      colOne+=1;
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
        break;
      case 2:
        rowTwo+=1;
        break
      case 3:
        colTwo-=1;
        break
      case 4:
        colTwo+=1;
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
      snakeLengthOne+=1
      createFood()
      var div = document.createElement("div");
      div.className = "snakeOne";
      document.getElementById("playBox").appendChild(div);
      document.getElementById("score").innerHTML=`Score: ${snakeLengthOne-2}`;
    }

    if(colTwo == foodcol && rowTwo == foodrow){
      snakeLengthTwo+=1
      createFood()
      var divTwo = document.createElement("div");
      divTwo.className = "snakeTwo";
      document.getElementById("playBox").appendChild(divTwo);
      document.getElementById("scoreTwo").innerHTML=`Score: ${snakeLengthTwo-2}`;
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

}
//adding position of snake head to 0 index
function changePosOne(){
snakePosOne.splice(0,0,{col:colOne,row:rowOne})

//deleting last position if there are more positions than actual snake length
if(snakePosOne.length>snakeLengthOne){
  snakePosOne.splice(-1,1)
}


//adding tail of snake
for(let i=0; i<snakeLengthOne;i++){
  snakeOne[i].style.gridColumn = `${snakePosOne[i].col}`
  snakeOne[i].style.gridRow = `${snakePosOne[i].row}`
  //comparing if head has the same position as rest of body(if it is, you lose)
  if(JSON.stringify(snakePosOne[0]) === JSON.stringify(snakePosOne[i+1])){
    food.style.display = "none"
    lose()

    break
  }
}
}
function changePosTwo(){
snakePosTwo.splice(0,0,{col:colTwo,row:rowTwo})

//deleting last position if there are more positions than actual snake length
  if(snakePosTwo.length>snakeLengthTwo){
    snakePosTwo.splice(-1,1)
  }


//adding tail of snake
  for(let i=0; i<snakeLengthTwo;i++){
    snakeTwo[i].style.gridColumn = `${snakePosTwo[i].col}`
    snakeTwo[i].style.gridRow = `${snakePosTwo[i].row}`
    //comparing if head has the same position as rest of body(if it is, you lose)
     if(JSON.stringify(snakePosTwo[0]) === JSON.stringify(snakePosTwo[i+1])){
      loseTwo()
      break
    }
  }





}
},3000)

function lose(){


let wholeSnakeOne = document.querySelectorAll('.snakeOne');

for(let i=0; i<wholeSnakeOne.length;i++){
  wholeSnakeOne[i].style.display = "none"
}
document.getElementById("instructions").style.backgroundColor="red"
document.getElementById("score").style.backgroundColor="red"
end+=1
console.log(end)
if(end==2){
  endInfo()
}
}





function loseTwo(){
  let wholeSnakeTwo = document.querySelectorAll('.snakeTwo');
  for(let i=0; i<wholeSnakeTwo.length;i++){
  wholeSnakeTwo[i].style.display = "none"
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
  console.log("dupa")
  let divInfo = document.createElement("div");
  let divText = document.createElement("div");
  let divScore = document.createElement("div");

  //ending screen
  divInfo.classList.add("info") 
  document.getElementById("content").appendChild(divInfo)

  if(snakeLengthOne>snakeLengthTwo){
    divText.innerHTML = "Green wins"
    divScore.innerHTML = `Score: ${snakeLengthOne-2}`
  }else if(snakeLengthOne==snakeLengthTwo){
    divText.innerHTML = "Draw"
  }else{
    divText.innerHTML = "Blue wins"
    divScore.innerHTML = `Score: ${snakeLengthTwo-2}`
  }
  document.getElementsByClassName("info")[0].appendChild(divText)
  divScore.style.fontSize = "4vh"
  document.getElementsByClassName("info")[0].appendChild(divScore)

}