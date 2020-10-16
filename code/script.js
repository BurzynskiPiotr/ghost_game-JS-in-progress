const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ghost_block

const player_ghost = {
  x: 200,
  y: 200,
  width: 450,
  height: 480,
  dx: 0,
  dy: 0,
  frameX: 1,
  frameY: 0,
  speed: 5,
  moving: false,
};

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

const playerSprite = new Image();
playerSprite.src = "./images/ghost_block.png";

// ghost rest animation

function GhostRestingAnimationLeft() {
  if (player_ghost.frameX === 1 || player_ghost.frameX === 0) {
    if (player_ghost.frameX === 1) {
      setTimeout(ghost_XF0, 200);
    } else if (player_ghost.frameX === 0) {
      setTimeout(ghost_XF1, 200);
    }
  }
}

function GhostRestingAnimationRight() {
  if (player_ghost.frameX === 2 || player_ghost.frameX === 3) {
    if (player_ghost.frameX === 2) {
      setTimeout(ghost_XF3, 200);
    } else if (player_ghost.frameX === 3) {
      setTimeout(ghost_XF2, 200);
    }
  }
}

// var GhostaAnimationLeft = setInterval(GhostRestingAnimationLeft, 200);
// var GhostaAnimationRight = setInterval(GhostRestingAnimationRight, 200);

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

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
  player_ghost.x += player_ghost.dx;
  player_ghost.y += player_ghost.dy;

  detectWalls();
}

function detectWalls() {
  // Left wall
  if (player_ghost.x < 0) {
    player_ghost.x = 0;
  }

  // Right Wall
  if (player_ghost.x + 80 > canvas.width) {
    player_ghost.x = canvas.width - 80;
  }

  // // Top wall
  if (player_ghost.y < 0) {
    player_ghost.y = 0;
  }

  // // Bottom Wall
  if (player_ghost.y + 90 > canvas.height) {
    player_ghost.y = canvas.height - 90;
  }
}

// movement

function moveUp() {
  player_ghost.dy = -player_ghost.speed;
}

function moveDown() {
  player_ghost.dy = player_ghost.speed;
}

function moveRight() {
  player_ghost.dx = player_ghost.speed;
  player_ghost.frameX = 2;
}

function moveLeft() {
  player_ghost.dx = -player_ghost.speed;
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
    player_ghost.dx = 0;
    player_ghost.dy = 0;
  }
}

// main function

function update() {
  clear();

  newPos();

  drawSprite(
    playerSprite,
    player_ghost.width * player_ghost.frameX,
    player_ghost.height * player_ghost.frameY,
    player_ghost.width,
    player_ghost.height,
    player_ghost.x,
    player_ghost.y,
    80,
    85
  );

  requestAnimationFrame(update);
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
