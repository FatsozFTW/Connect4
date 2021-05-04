//connect 4
let canvas;
let moves = 0;
let context;
let t = 0;
let i = 0;
let win = 0;
let Player = "Player X's Turn";
let model = {
  next: "X",
}


function tick() {
  window.requestAnimationFrame(splat);
}

function splat(n) {
  //let d = n - t;
  t = n;
  context.clearRect(0,0,canvas.width,canvas.height)

  for(let i = 0;i < 6;i++) {
    context.beginPath();
    context.moveTo(0, 100 + i * 100);
    context.lineTo(700, 100 + i * 100);
    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.stroke();
    context.beginPath();
    context.moveTo(100 + i * 100, 0);
    context.lineTo(100 + i * 100, 600);
    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.stroke();
  }
    context.beginPath();
    context.moveTo(700, 0);
    context.lineTo(700, 600);
    context.strokeStyle = '#000000';
    context.lineWidth = 5;
    context.stroke();

  context.font = "28pt Calibri"
  context.fillStyle = "blue";  

  for(let i = 0; i < w; i++) {
    for(let j = 0; j < 6; j++) {
      let me = myGrid[i][j];
      if (me != '.') {
	    context.fillText(me, 50 + i * 100, 50 + j * 100);
      }
    }
  }
  //context.font = "20pt Calibri"
  //context.fillStyle = "green";

  context.fillText(JSON.stringify(Player), 200, 700);
  
  tick();
}

document.addEventListener("DOMContentLoaded", () => { 
  canvas = document.querySelector("#myCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  console.log(context);
  splat();
})

function roundMe(x){ return Math.ceil((x)/105)-1 }

document.addEventListener("click", e => {
    const [i,j] = [e.x,e.y].map(roundMe);
    if (i < 0 || i > 7) return;
    if (j < 0 || j > 6) return;
    console.log(e.x, e.y);
    console.log(i,j, i+j*7);
    if (myGrid[i][j] != '.') {
    return;
    }
    if(myGrid[i][j+1] == ".")
    {
        return;
    }
    myGrid[i][j] = model.next;

    if(checkWin(model.next))
    {
        
        //change here
        if(win == 1)
        {
            reset();
        }
        else 
        {
            console.log("winner winner");
            alert(model.next + " Won! Click anywhere on the board to reset");
            win = 1;
            
        }
        
        return;
    }
    else{
        if (model.next == 'X') {
        model.next = 'O'
        Player = "Player O's Turn"
        moves++;
        } else if (model.next == 'O') {
        model.next = 'X'
        Player = "Player X's Turn"
        moves++;
        }
    }

    
    if(tied())
    {

        console.log("tied");
        if(confirm("Do you want to reset?") == true)
        {
            reset();
        }
        return;
    }
    
  
})

function tied() {
    if(moves == 42)
    {
        return true;
    }
}
function checkWin(test)
{
    
    //column
    let chain = 0;
    for(let i =0; i <7;i++) {
        for(let j = 0; j < 6; j++)
        {
            if(myGrid[i][j] == test)
            {
                chain++;
            }
            else
            {
                chain=0;
            }
            if(chain >= 4) 
                {
                    return true;
                }
        }
        chain = 0;
    }
    //row
    chain = 0;
    for(let i =0; i <6;i++) {
        for(let j = 0; j <7; j++)
        {
            if(myGrid[j][i] == test)
            {
                chain++;
            }
            else
            {
                chain=0;
            }
            if(chain >= 4) 
                {
                    return true;
                }
        }
        chain = 0;
    }
    //diagonal
    for(let i = 0; i<4;i++) {
        for(let j = 0; j < 3; j++)
        {
            if((myGrid[i][j] == test) && (myGrid[i+1][j+1] == test) && (myGrid[i+2][j+2] == test) && (myGrid[i+3][j+3] == test))
            {
                return true;
            }
            if((myGrid[6-i][j] == test) && (myGrid[5-i][j+1] == test) && (myGrid[4-i][j+2] == test) && (myGrid[3-i][j+3] == test))
            {
                return true;
            }
        }
    }
    return false;

}

let r= 0;
let w = 7;
let h = 6; 
let myGrid = [];
for(let i = 0; i< w;i++)
{
    myGrid[i] = [];
    for(let j=0; j<h;j++)
    {
        myGrid[i][j] = ".";
    }
}

function reset()
{
    for(let i = 0; i< w;i++)
    {
        myGrid[i] = [];
        for(let j=0; j<h;j++)
        {
            myGrid[i][j] = ".";
        }
    }
    win = 0;
}