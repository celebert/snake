var snake = document.getElementsByClassName("snake");
var food = document.getElementById("food");
var col = 26
var row = 25
snakePos = [{col:26,row:25},{col:25,row:25}]
snakeLength = snakePos.length
createFood()


document.onkeydown = checkKey;

var move = 4

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
      move = 1
    }
    else if (e.keyCode == '40') {
      move = 2
    }
    else if (e.keyCode == '37') {
      move = 3
    }
    else if (e.keyCode == '39') {
      move = 4
    }
}

function game(){

  switch (move){
    case 1:
      row-=1;
      break;
    case 2:
      row+=1;
      break
    case 3:
      col-=1;
      break
    case 4:
      col+=1;
      break
  }

    if(col==51){
      col=1;
    }
    if(row==51){
      row=1;
    }
    if(col==0){
      col=50;
    }
    if(row==0){
      row=50;
    }

    if(col == foodcol && row == foodrow){
      snakeLength+=1
      createFood()
      div = document.createElement("div");
      div.className = "snake";
      document.getElementById("playBox").appendChild(div);
    }



  changePos()

}

var play = setInterval(game, 50)


function createFood(){
  foodcol = Math.floor(Math.random() * 51);  
  foodrow = Math.floor(Math.random() * 51);  
  food.style.gridColumn = `${foodcol}`
  food.style.gridRow = `${foodrow}`
  
}

function changePos(){
  snakePos.splice(0,0,{col:col,row:row})

  if(snakePos.length>snakeLength){
    snakePos.splice(-1,1)
  }

  for(let i=0; i<snakeLength;i++){
    snake[i].style.gridColumn = `${snakePos[i].col}`
    snake[i].style.gridRow = `${snakePos[i].row}`

  
    if(JSON.stringify(snakePos[0]) === JSON.stringify(snakePos[i+1])){
      food.style.display = "none"
      lose()
      clearInterval(play)
     
      setInterval(lose, 1000)
      break
    }
  }

}


function lose(){
  
console.log("dupa")


}
