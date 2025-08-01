const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const homeScreen = document.getElementById('homeScreen');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.5;
let flapStrength = -8;
let pipes = [];
let score = 0;
let gameRunning = false;
let gameOver = false;
let pipeInterval = null;

// Start the game
function startGame() {
  gameRunning = true;
  gameOver = false;
  homeScreen.style.display = 'none';
  birdY = 200;
  birdVelocity = 0;
  pipes = [];
  score = 0;

  if (pipeInterval) clearInterval(pipeInterval);
  pipeInterval = setInterval(() => {
    if (gameRunning) spawnPipe();
  }, 1500);
}

// Restart after game over
function resetGame() {
  gameRunning = false;
  gameOver = false;
  homeScreen.style.display = 'flex';
  if (pipeInterval) clearInterval(pipeInterval);
}

// Handle keypress
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameRunning && !gameOver) {
      startGame();
    } else if (gameOver) {
      resetGame();
    } else {
      birdVelocity = flapStrength;
    }
  }
});

// Also expose startGame for the button click
window.startGame = startGame;

function spawnPipe() {
  const top = Math.floor(Math.random() * 200) + 50;
  pipes.push({ x: canvas.width, top });
}

function update() {
  if (!gameRunning || gameOver) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > canvas.height || birdY < 0) {
    gameOver = true;
    gameRunning = false;
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      pipe.x < 60 && pipe.x + 30 > 40 &&
      (birdY < pipe.top || birdY > pipe.top + 100)
    ) {
      gameOver = true;
      gameRunning = false;
    }

    if (pipe.x === 25) score++;
  });

  pipes = pipes.filter(p => p.x > -50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 30, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 100, 30, canvas.height);
  });

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(50, birdY, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText('Score: ' + score, 10, 25);

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

resetGame();
gameLoop();
