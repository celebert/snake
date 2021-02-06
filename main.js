var snake = document.getElementById("snake");
var food = document.getElementById("food");
var col = 25
var row = 25
var points = 0
tailPos = []

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
  
  if(tailPos.length>points){
    tailPos.shift()
  }

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
      col=51;
    }
    if(row==0){
      row=51;
    }

    if(col == foodcol && row == foodrow){
      points+=1
      createFood()
      div = document.createElement("div");
      div.className = "tail";
      document.getElementById("playBox").appendChild(div);
    }



  changePos()

}
setInterval(game, 200)


function createFood(){
  foodcol = Math.floor(Math.random() * 51);  
  foodrow = Math.floor(Math.random() * 51);  
  food.style.gridColumn = `${foodcol}`
  food.style.gridRow = `${foodrow}`
  
}

function changePos(){
  snake.style.gridColumn = `${col}`
  snake.style.gridRow = `${row}`

  tailPos.push({
    col: col,
    row: row
  })

  for(let i=1; i<points;i++){
    if(tailPos[i-1].col==col && tailPos[i-1].row==row){
      alert("ugryzles sei w dupala")
    }
  }
  for(let i=0; i<points;i++){


    document.getElementsByClassName(`tail`)[i].style.gridColumn = `${tailPos[i].col}`
    document.getElementsByClassName(`tail`)[i].style.gridRow = `${tailPos[i].row}`
  }
}
