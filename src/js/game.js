import bricks from './bricks.js';
import {bricksetup} from './bricks.js';

var canvas, 
    context, 
    brickWidth = 117,
    brickHeight = 35,
    maxMob = window.matchMedia('(max-width: 768px)'),
    minTab = window.matchMedia('(min-width: 769px)'),
    maxTab = window.matchMedia('(max-width: 1024px)'),
    minLap = window.matchMedia('(min-width: 1024px)'),
    minLap1 = window.matchMedia('(max-width: 1280px)');

function go() {
  // canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  minLap.matches ? brickWidth = Math.floor(window.innerWidth/8.3): brickWidth = 117;
  console.log(brickWidth++)
  bricksetup(); 
  bricks(context, brickWidth, brickHeight);
}

go();
window.addEventListener("resize", go);






