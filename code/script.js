const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ghost_block

const player_ghost = {
  x: 0,
  y: 0,
  width: 450,
  height: 480,
  frameX: 1,
  frameY: 0,
  speed: 2,
  moving: false,
};

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

const playerSprite = new Image();
playerSprite.src = "./images/ghost_block.png";

// ghost rest animation

function GhostRestingAnimation() {
  if (player_ghost.frameX === 1 || player_ghost.frameX === 0) {
    if (player_ghost.frameX === 1) {
      setTimeout(ghost_XF0, 200);
    } else if (player_ghost.frameX === 0) {
      setTimeout(ghost_XF1, 200);
    }
  } else if (player_ghost.frameX === 2 || player_ghost.frameX === 3) {
    if (player_ghost.frameX === 2) {
      setTimeout(ghost_XF3, 200);
    } else if (player_ghost.frameX === 3) {
      setTimeout(ghost_XF2, 200);
    }
  }
}

setInterval(GhostRestingAnimation, 200);

function ghost_XF0() {
  player_ghost.frameX = 0;
}

function ghost_XF1() {
  player_ghost.frameX = 1;
}

function ghost_XF2() {
  player_ghost.frameX = 2;
}

function ghost_XF3() {
  player_ghost.frameX = 3;
}

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

// movement

function moveUp() {
  player.dy = -player.speed;
}

function moveDown() {
  player.dy = player.speed;
}

function moveRight() {
  player.dx = player.speed;
  player_ghost.frameX = 2;
}

function moveLeft() {
  player.dx = -player.speed;
  player_ghost.frameX = 1;
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

// main function

function update() {
  clear();

  drawPlayer();

  newPos();

  drawSprite(
    playerSprite,
    player_ghost.width * player_ghost.frameX,
    player_ghost.height * player_ghost.frameY,
    player_ghost.width,
    player_ghost.height,
    200,
    200,
    80,
    85
  );

  requestAnimationFrame(update);
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
