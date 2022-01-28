let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawing code
  drawBall();

  //move shape
  x += dx;
  y += dy;

  //collision
  if (y + dy < ballRadius || y + dy > canvas.height-ballRadius)
    dy = -dy;

  if (x + dx < ballRadius || x + dx > canvas.width-ballRadius)
    dx = -dx;

  
};
setInterval(draw, 10);
