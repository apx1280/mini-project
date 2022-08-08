// import bricks from "./bricks.js";
import customPop from "./custompopup.js";
// import { bricksetup } from "./bricks.js";
import leaderBoard from "../../leaderboard/js/leaderboard.js";

var canvas,
  context,
  brickWidth = 117,
  brickHeight = 35,
  minLap = window.matchMedia("(min-width: 1024px)"),
  paddleHeight = 10,
  paddleWidth = 100,
  paddleX = (document.documentElement.clientWidth - paddleWidth) / 2,
//  brickRow = 1,
//   brickCol = 8,
  brickPadding = 5,
  r,
  c,
  b,
  lives = 3,
  radius=8,
  profiledetails = localStorage.getItem("currentuser"),
  score = 0,
  scorearray = [];
let LEVEL = 1;
const MAX_LEVEL = 3;
var str = '\u2764\uFE0F';
var star = '\u2B50\uFE0F';
var level = "\uD83D\uDEA9";

// CREATE THE BRICKS
const brick = {
  row : 1,
  column : 9,
  width : 117,
  height : 35,
  offSetLeft : 30,
  offSetTop : 20,
  marginTop : 40,
  fillColor : "#2e3548",
  strokeColor : "#FFF"
}

let bricks = [];

console.log(scorearray);

function resize() {
  // canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  paddleX = (canvas.width - paddleWidth) / 2;

  brick.marginTop =  canvas.height/3;
  brick.column  = Math.round(canvas.width / 177) ;

  minLap.matches
    ? (brickWidth = Math.floor(window.innerWidth / 8.3))
    : (brickWidth = 117);
   createBricks();
   drawBricks();
  
  drawBall();
  drawPaddle();
  var strt = document.getElementById("start");
  var pau = document.getElementById("pause");
  strt.addEventListener("click", game_start_action, false);
  pau.addEventListener("click", game_pause_action, false);
}
resize();
window.addEventListener("resize", resize);

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var flag = 0;
var velx = 2;
var vely = -2;

var rightPressed = false;
var leftPressed = false;
var maxVel;
var relativeX;

//DRAW PADDLE
function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight - 60,
    paddleWidth,
    paddleHeight - 20
  );
  context.fillStyle = "#2e3548";
  context.fill();
  context.closePath();
}

//DRAW BALL
function drawBall() {
  context.beginPath();
  context.arc(x, y - 60, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}


function createBricks(){
  for(let r = 0; r < brick.row; r++){
      bricks[r] = [];
      for(let c = 0; c < brick.column; c++){
          bricks[r][c] = {
              x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
              y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
              status : true
          }
      }
  }
}

createBricks();

// draw the bricks
function drawBricks(){
  for(let r = 0; r < brick.row; r++){
      for(let c = 0; c < brick.column; c++){
          let b = bricks[r][c];
          // if the brick isn't broken
          if(b.status){
              context.fillStyle = brick.fillColor;
              context.fillRect(b.x, b.y, brick.width, brick.height);
              
              context.strokeStyle = brick.strokeColor;
              context.strokeRect(b.x, b.y, brick.width, brick.height);
          }
      }
  }
}

// level up
function levelUp(){
  let isLevelDone = true;
  
  // check if all the bricks are broken
  for(let r = 0; r < brick.row; r++){
      for(let c = 0; c < brick.column; c++){
          isLevelDone = isLevelDone && ! bricks[r][c].status;
      }
  }
  
  if(isLevelDone){
      WIN.play();
      
      if(LEVEL >= MAX_LEVEL){
          showYouWin();
          flag = 0;
          return;
      }
      brick.row++;

      brick.marginTop =  document.documentElement.clientHeight/4;

      createBricks();
      paddleX = (canvas.width - paddleWidth) / 2;
      x = paddleX + paddleWidth / 2;
      y = canvas.height - paddleHeight - radius;
      velx = 2;
      vely = -2;
      
      LEVEL++;
           
  }
}
// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY){
  // draw text
  context.fillStyle = "Black";
  context.font = "25px Germania One";
  context.fillText(text, textX, textY);
  
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  
   drawBricks();
   collision();
   levelUp();
    // SHOW SCORE
    showGameStats(star +' '+score, 35, canvas.height - 20 , SCORE_IMG, 5, 5);
    showGameStats(str +' '+lives, canvas.width - 85, canvas.height - 20, LIFE_IMG, canvas.width-55, 5); 
    // SHOW LEVEL
    showGameStats(level + ' ' +LEVEL, canvas.width/2, 25, LEVEL_IMG, canvas.width/2 - 30, 5);
    showuser();


  x += velx;
  y += vely;

  if (x + velx > canvas.width - ballRadius || x + velx < ballRadius) {
    velx = -velx;
    WALL_HIT.play();
  }

  if (y - 60 + vely < ballRadius) {
    vely = -vely;
    WALL_HIT.play();
  } else if (
    y + vely == canvas.height - ballRadius - paddleHeight &&
    x >= paddleX &&
    x <= paddleX + paddleWidth
  ) {
    vely = -vely;
    PADDLE_HIT.play();

    // Change velx based on where the ball strikes the paddle
    var center = paddleX + paddleWidth / 2;
    var hitPos = x - center;

    velx = velx + hitPos / 7.5; // Keeping the max change on paddle hit to +-5

    // Limit maximum x-velocity. Play with these values to get optimum settings
    maxVel = 6;
    if (velx > maxVel) {
      velx = maxVel;
    } else if (velx < -maxVel) {
      velx = -maxVel;
    }
  } else if (y -60 + vely > canvas.height - ballRadius) {
        
          score =  score;
          //  document.location.reload();     //reload page
    lives--;
    LIFE_LOST.play();
    flag = 0;
    if(lives == 0){
        alert("Game Over. Your Score is : "+score);
        scorearray.push(score);
        score = 0;
    } else {
        flag = 1;
        paddleX = (canvas.width - paddleWidth) / 2;
        x = paddleX + paddleWidth / 2;
        y = canvas.height - paddleHeight - radius;
        velx = 2;
        vely = -2;
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth - 5) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 5) {
    paddleX -= 3;
  }

  if (flag == 1) {
    requestAnimationFrame(draw);
  }
}

draw();
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  // 37 for left key
  // 39 for right key
  // 32 for spacebar key

  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 32) {
    spacebar_action();
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  relativeX = e.clientX - canvas.offsetLeft;

  if (
    relativeX > paddleWidth / 2 &&
    relativeX + paddleWidth / 2 < canvas.width
  ) {
    // paddleX=relativeX;
    paddleX = relativeX - paddleWidth / 2;
  }
}

function spacebar_action() {
  if (flag == 0) {
    game_start_action();
  } else {
    game_pause_action();
  }
}

function game_start_action() {
  if (flag == 0) {
    flag = 1;
    draw();
  }

  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#pause").classList.remove("hidden");
}

function game_pause_action() {
  flag = 0;
  document.querySelector("#pause").classList.add("hidden");
  document.querySelector("#start").classList.remove("hidden");
  // $("#pause").addClass('hidden');
  // $('#start').removeClass('hidden');
}

function showuser(){
  var data = JSON.parse(localStorage.getItem('currentuser'));
  document.getElementById("initial").innerHTML = data[0].username.charAt(0).toUpperCase();
  document.getElementById("initial1").innerHTML = data[0].username.charAt(0).toUpperCase();
  document.getElementById("username").innerHTML = data[0].username;
  document.getElementById("useremail").innerHTML = data[0].useremail;
  //document.getElementById("highscore").innerHTML = score;
}

/*VIEW PROFILE POP UP*/
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

//LOGOUT
const logout = document.getElementById("logout-btn");
logout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("currentuser")
        window.location.replace("/login.html");
    
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function collision(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
        let b = bricks[r][c];
          
          // @todo 
          // all 4 of these conditions should be satisfied for changing direction when collision takes place
          
          if(b.status == 1){
            if(x + ballRadius > b.x && x - ballRadius < b.x + brickWidth &&
              y - 60 + ballRadius > b.y && y - 60 - ballRadius < b.y +  brickHeight){

                      vely =- vely;

                      BRICK_HIT.play();
                      ballRadius += 5;
                        drawBall();
                      setTimeout(()=>{
                        ballRadius = 10;
                        drawBall();
                      },200);
                      
                      b.status = 0;
                      score++;
              }
          }
      }
  }
}

function leaderB(){
  let ele = document.querySelector(".leaderboard");
  ele.addEventListener('click', ()=>{
    leaderBoard();
  })
}

leaderB();


const gameover = document.getElementById("gameover");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

const updateScore = () => {
  var id = JSON.parse(localStorage.getItem("currentuser"))[0].id;
  JSON.parse(localStorage.getItem("allusrs")).forEach((ele) => {
    if(ele.id == id){ 
      console.log(score);
        ele.score = score;
    }
});
}

updateScore();
