const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.5;
let flapStrength = -8;
let pipes = [];
let score = 0;
let gameRunning = false;
let gameOver = false;

function resetGame() {
  birdY = 200;
  birdVelocity = 0;
  pipes = [];
  score = 0;
  gameRunning = false;
  gameOver = false;
}

function spawnPipe() {
  const top = Math.floor(Math.random() * 200) + 50;
  pipes.push({ x: canvas.width, top });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameRunning && !gameOver) {
      gameRunning = true;
    } else if (gameOver) {
      resetGame();
    } else {
      birdVelocity = flapStrength;
    }
  }
});

function update() {
  if (!gameRunning || gameOver) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > canvas.height || birdY < 0) {
    gameOver = true;
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Collision
    if (
      pipe.x < 60 && pipe.x + 30 > 40 &&
      (birdY < pipe.top || birdY > pipe.top + 100)
    ) {
      gameOver = true;
    }

    if (pipe.x === 25) score++;
  });

  pipes = pipes.filter(p => p.x > -50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 30, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 100, 30, canvas.height);
  });

  // Bird
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(50, birdY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Score
  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText('Score: ' + score, 10, 25);

  // Start / Game Over text
  if (!gameRunning && !gameOver) {
    ctx.fillText('Press Space to Start', 60, 200);
  }

  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '30px sans-serif';
    ctx.fillText('Game Over', 90, 200);
    ctx.font = '20px sans-serif';
    ctx.fillText('Press Space to Restart', 65, 240);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

setInterval(() => {
  if (gameRunning && !gameOver) spawnPipe();
}, 1500);

resetGame();
gameLoop();
