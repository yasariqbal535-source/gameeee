const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const homeScreen = document.getElementById('homeScreen');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.3; // Easier gravity
let flapStrength = -6; // Stronger flap
let pipes = [];
let score = 0;
let gameRunning = false;
let gameOver = false;
let pipeInterval = null;
let pipeSpeed = 1.5; // Slower pipes

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
  }, 1800); // More time between pipes
}

function resetGame() {
  gameRunning = false;
  gameOver = false;
  homeScreen.style.display = 'flex';
  if (pipeInterval) clearInterval(pipeInterval);
}

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

window.startGame = startGame;

function spawnPipe() {
  const top = Math.floor(Math.random() * 180) + 40;
  pipes.push({ x: canvas.width, top, scored: false });
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
    pipe.x -= pipeSpeed;

    // Collision detection
    if (
      pipe.x < 80 && pipe.x + 30 > 40 && // bird x-range = 40–60
      (birdY < pipe.top || birdY > pipe.top + 140) // Wider pipe gap
    ) {
      gameOver = true;
      gameRunning = false;
    }

    // Scoring
    if (!pipe.scored && pipe.x + 30 < 40) {
      pipe.scored = true;
      score++;
    }
  });

  pipes = pipes.filter(p => p.x > -50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 30, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 140, 30, canvas.height); // Bigger gap
  });

  // Bird
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(50, birdY, 12, 0, Math.PI * 2); // Bigger bird
  ctx.fill();

  // Score
  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText('Score: ' + score, 10, 25);

  // Game Over
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
