// ---------------------------------------------------------------
// STARTER SCAFFOLD — Game Studio Workshop
// This is the "walking skeleton": the smallest thing that runs.
// A paddle you can move + a ball that bounces. Everything we build
// tomorrow (Breakout bricks, a second paddle for Pong, enemies for
// Space Invaders...) gets added on top of this loop.
// ---------------------------------------------------------------

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Canvas fills most of the screen, but keeps a game-friendly aspect ratio.
function resizeCanvas() {
  const maxWidth = Math.min(window.innerWidth - 32, 480);
  canvas.width = maxWidth;
  canvas.height = maxWidth * 1.4;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --- Game state ---
const paddle = {
  width: 90,
  height: 14,
  x: 0, // set after resize
  y: 0,
  speed: 6,
};

const ball = {
  x: 0,
  y: 0,
  radius: 8,
  dx: 3,
  dy: -3,
};

function resetPositions() {
  paddle.x = canvas.width / 2 - paddle.width / 2;
  paddle.y = canvas.height - 40;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
}
resetPositions();
window.addEventListener("resize", resetPositions);

// --- Input: keyboard ---
const keys = { left: false, right: false };

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
});
window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

// --- Input: on-screen buttons (mobile) ---
function bindHold(button, onDown, onUp) {
  button.addEventListener("pointerdown", onDown);
  button.addEventListener("pointerup", onUp);
  button.addEventListener("pointerleave", onUp);
}
bindHold(
  document.getElementById("btn-left"),
  () => (keys.left = true),
  () => (keys.left = false)
);
bindHold(
  document.getElementById("btn-right"),
  () => (keys.right = true),
  () => (keys.right = false)
);

// --- Input: drag directly on the canvas (mobile) ---
canvas.addEventListener("pointermove", (e) => {
  if (e.buttons === 0 && e.pointerType !== "touch") return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  paddle.x = Math.min(Math.max(x - paddle.width / 2, 0), canvas.width - paddle.width);
});

// --- Update: move things, check collisions ---
function update() {
  if (keys.left) paddle.x -= paddle.speed;
  if (keys.right) paddle.x += paddle.speed;
  paddle.x = Math.min(Math.max(paddle.x, 0), canvas.width - paddle.width);

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce off side walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx *= -1;
  }
  // Bounce off top
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
  // Bounce off paddle
  const hitsPaddle =
    ball.y + ball.radius >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width;
  if (hitsPaddle) {
    ball.dy *= -1;
    ball.y = paddle.y - ball.radius;
  }
  // Fell off the bottom — reset for now (tomorrow: lose a life / game over)
  if (ball.y - ball.radius > canvas.height) {
    resetPositions();
  }
}

// --- Draw: render current state ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#4cc2ff";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#eef2f7";
  ctx.fill();
}

// --- Game loop ---
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
