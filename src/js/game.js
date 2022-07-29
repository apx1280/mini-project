import bricks from "./bricks.js";
import customPop from "./custompopup.js";
import {
  bricksetup
} from "./bricks.js";

var canvas,
  context,
  brickWidth = 117,
  brickHeight = 35,
  minLap = window.matchMedia("(min-width: 1024px)"),
  paddleHeight = 10,
  paddleWidth = 100,
  paddleX = (document.documentElement.clientWidth - paddleWidth) / 2;;
  

function go() {
  // canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight - 50;
  paddleX = (canvas.width - paddleWidth) / 2;
  minLap.matches ?
    (brickWidth = Math.floor(window.innerWidth / 8.3)) :
    (brickWidth = 117);
  bricksetup();
  bricks(context, brickWidth, brickHeight);
  //draw();
  drawBall();
  drawPaddle();
  var strt = document.getElementById("start");
  var pau = document.getElementById("pause");
  strt.addEventListener("click", game_start_action, false);
  pau.addEventListener("click", game_pause_action, false);
}
go();
window.addEventListener("resize", go);

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
var score = 0;
var lives = 3;

function drawPaddle() {
  context.beginPath();
  context.rect(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight - 20
  );
  context.fillStyle = "#e38c95";
  context.fill();
  context.closePath();
}

function drawBall() {
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI * 2);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  minLap.matches ?
    (brickWidth = Math.floor(window.innerWidth / 8.3)) :
    (brickWidth = 117);
  bricksetup();
  bricks(context, brickWidth, brickHeight);
  // drawBricks();
  // collision();
  // drawScore();
  // drawLives();

  x += velx;
  y += vely;

  if (x + velx > canvas.width - ballRadius || x + velx < ballRadius) {
    velx = -velx;
  }

  if (y + vely < ballRadius) {
    vely = -vely;
  } else if (
    y + vely == canvas.height - ballRadius - paddleHeight &&
    x >= paddleX &&
    x <= paddleX + paddleWidth
  ) {
    vely = -vely;

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
  } else if (y + vely > canvas.height - ballRadius) {
    //        alert("Game Over");
    //        document.location.reload();     //reload page

    lives--;
    flag = 0;
    if (lives == 0) {
      customPop("Game Over");
      // alert("Game Over. Your Score is : " + score);
      //document.location.reload();
      score = 0;
    } else {
      flag = 1;
      paddleX = (canvas.width - paddleWidth) / 2;
      x = paddleX + paddleWidth / 2;
      y = canvas.height - paddleHeight - ballRadius;
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
  //    clientX property returns the horizontal coordinate
  //    clientY property returns the vertical coordinate
  //    var x = event.clientX;     // Get the horizontal coordinate
  //    var y = event.clientY;     // Get the vertical coordinate
  //    relativeX is equal to relative horizontal posn of mouse pointer
  //    relativeX=e.clientX;

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
