import bricks from './bricks.js';
import {bricksetup} from './bricks.js';

var canvas, 
    context, 
    brickWidth = 117,
    brickHeight = 35,
    maxMobile = window.matchMedia('(max-width: 768px)'),
    minTablet = window.matchMedia('(min-width: 769px)'),
    maxTablet = window.matchMedia('(max-width: 1024px)'),
    minDesktop = window.matchMedia('(min-width: 1024px)'),
    maxDesktop = window.matchMedia('(max-width: 1440px)');




function go() {
  // canvas
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  if (minDesktop.matches) {
    brickWidth = brickWidth++;
  } else {
    brickWidth = 117;
  }
  bricksetup(); 
  bricks(context, brickWidth, brickHeight);
}

go();
window.addEventListener("resize", go);






