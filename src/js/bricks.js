var brickRow = 5,
    brickCol = 8,
    brickPadding = 5,
    r,
    c,
    brickX,
    brickY,
    num,
    count = 0,
    colors = [
        "#1f1f1f",
    ];

export const bricksetup = () => {
  for (c = 0; c < brickCol; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRow; r++) {
      bricks[c][r] = {
        x: 0,
        y: 0,
        status: 1,
      };

      num = parseInt((Math.random() * 10) % colors.length);
      bricks[c][r].color = colors[num];
      count++;
    }
  }
};

function bricks(context, brickWidth, brickHeight) {
  for (c = 0; c < brickCol; c++) {
    for (r = 0; r < brickRow; r++) {
      if (bricks[c][r].status == 1) {
        brickX = c * (brickWidth + brickPadding) + brickPadding;
        brickY = r * (brickHeight + brickPadding) + brickPadding;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        context.beginPath();
        context.rect(brickX, brickY, brickWidth, brickHeight);
        context.fillStyle = bricks[c][r].color;
        context.fill();
        context.closePath();
      }
    }
  }
}
     
export default bricks;
