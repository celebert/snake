var snake = document.getElementsByClassName("snake");
var food = document.getElementById("food");
var col = 26
var row = 25
snakePos = [{col:26,row:25},{col:25,row:25}]
snakeLength = snakePos.length
createFood()
for(let i=0; i<snakeLength;i++){
    snake[i].style.gridColumn = `${snakePos[i].col}`
    snake[i].style.gridRow = `${snakePos[i].row}`
}

document.onkeydown = checkKey;

var move = 4

function checkKey(e) {

    e = e || window.event;
    //up
    if (e.keyCode == '38' && move != 2) {
      move = 1
    }
    //down
    else if (e.keyCode == '40' && move != 1) {
      move = 2
    }
    //left
    else if (e.keyCode == '37' && move != 4) {
      move = 3
    }
    //right
    else if (e.keyCode == '39' && move != 3) {
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
      let div = document.createElement("div");
      div.className = "snake";
      document.getElementById("playBox").appendChild(div);
    }



  changePos()

}

var play = setInterval(game, 50)


function createFood(){
  foodcol = Math.floor(Math.random() * 50)+1;  
  foodrow = Math.floor(Math.random() * 50)+1;  
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
      break
    }
  }

}


function lose(){

  let div = document.createElement("div");     
  let wholeSnake = document.querySelectorAll('.snake');
  let state = 1

  div.classList.add("info")
  div.innerHTML = "You lose"
  document.getElementById("content").appendChild(div)
  

  
  setInterval(function(){

    if(state%2==0){
      for(let i=0; i<wholeSnake.length;i++)
      wholeSnake[i].style.removeProperty('display')
      state+=1
    }else{
      for(let i=0; i<wholeSnake.length;i++)
      wholeSnake[i].style.display = "none"
      state+=1
      
    }
    
    
    }, 750);


}
