let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawing code
  drawBall();
  drawPaddle();

  //move shape
  x += dx;
  y += dy;

  //collision
  // y + dy < ballRadius || y + dy > canvas.height - ballRadius
  //   ? (dy = -dy)
  //   : null;
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  x + dx < ballRadius || x + dx > canvas.width - ballRadius ? (dx = -dx) : null;

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
};

const keyDownHandler = (e) => {
  e.key === "Right" || e.key === "ArrowRight"
    ? (rightPressed = true)
    : e.key == "Left" || e.key == "ArrowLeft"
    ? (leftPressed = true)
    : null;
};

const keyUpHandler = (e) => {
  e.key == "Right" || e.key == "ArrowRight"
    ? (rightPressed = false)
    : e.key == "Left" || e.key == "ArrowLeft"
    ? (leftPressed = false)
    : null;
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);
