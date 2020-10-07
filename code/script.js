const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const circle = {
  x: 100,
  y: 15,
  size: 15,
  dx: 0,
  dy: 2,
};

// player configuration

const image = document.getElementById("player");

const player = {
  w: 90,
  h: 90,
  x: 300,
  y: 300,
  speed: 5,
  dx: 0,
  dy: 0,
};

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

// function safeZone() {
//   ctx.lineWidth = 1;
//   ctx.strokeStyle = "#333";
//   ctx.strokeRect(200, 0, 1, canvas.height);
//   ctx.strokeRect(400, 0, 1, canvas.height);

//   // fillText()
//   ctx.font = "20px Arial";
//   ctx.fillStyle = "#333";
//   ctx.fillText("SAFE ZONE", 245, 100);
// }

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  player.x += player.dx;
  player.y += player.dy;

  detectWalls();
}

function detectWalls() {
  // Left wall
  if (player.x < 0) {
    player.x = 0;
  }

  // Right Wall
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  // Top wall
  if (player.y < 0) {
    player.y = 0;
  }

  // Bottom Wall
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.h;
  }
}

// ghost_block

function update() {
  clear();

  drawPlayer();

  newPos();

  // drawCircle();

  // safeZone();

  // change position

  circle.x += circle.dx;
  circle.y += circle.dy;

  // Detect side walls
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    circle.dx *= -1;
  }
  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  requestAnimationFrame(update);
}

function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveRight() {
  player.dx = player.speed;
}

function moveLeft() {
  player.dx = -player.speed;
}

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    moveRight();
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveLeft();
  } else if (e.key === "ArrowUp" || e.key === "Up") {
    moveUp();
  } else if (e.key === "ArrowDown" || e.key === "Down") {
    moveDown();
  }
}

function keyUp(e) {
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
