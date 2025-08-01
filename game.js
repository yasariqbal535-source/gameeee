const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const homeScreen = document.getElementById('homeScreen');
const scoreboard = document.getElementById('scoreboard');
const scoreList = document.getElementById('scoreList');
const flapSound = document.getElementById('flapSound');
const hitSound = document.getElementById('hitSound');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.3;
let flapStrength = -6;
let pipes = [];
let score = 0;
let gameRunning = false;
let gameOver = false;
let pipeInterval = null;
let pipeSpeed = 1.5;
let savedState = null;

function startGame() {
  gameRunning = true;
  gameOver = false;
  homeScreen.style.display = 'none';
  scoreboard.style.display = 'none';
  document.getElementById('continueOptions').style.display = 'none';
  document.getElementById('adOverlay').style.display = 'none';
  birdY = 200;
  birdVelocity = 0;
  pipes = [];
  score = 0;

  if (pipeInterval) clearInterval(pipeInterval);
  pipeInterval = setInterval(spawnPipe, 1800);
}

function resetGame() {
  gameRunning = false;
  gameOver = false;
  homeScreen.style.display = 'flex';
  scoreboard.style.display = 'none';
  document.getElementById('continueOptions').style.display = 'none';
  document.getElementById('adOverlay').style.display = 'none';
  if (pipeInterval) clearInterval(pipeInterval);
}

function flap() {
  if (!gameRunning && !gameOver) {
    startGame();
  } else if (gameOver) {
    // Nothing
  } else {
    birdVelocity = flapStrength;
    if (flapSound) flapSound.play();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') flap();
});
canvas.addEventListener('click', flap);
canvas.addEventListener('touchstart', flap);

function spawnPipe() {
  const top = Math.floor(Math.random() * 180) + 40;
  pipes.push({ x: canvas.width, top, scored: false });
}

function update() {
  if (!gameRunning || gameOver) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > canvas.height || birdY < 0) {
    if (hitSound) hitSound.play();
    triggerContinueOptions();
  }

  pipes.forEach(pipe => {
    pipe.x -= pipeSpeed;

    if (
      pipe.x < 80 && pipe.x + 30 > 40 &&
      (birdY < pipe.top || birdY > pipe.top + 140)
    ) {
      if (hitSound) hitSound.play();
      triggerContinueOptions();
    }

    if (!pipe.scored && pipe.x + 30 < 50) {
      score++;
      pipe.scored = true;
    }
  });

  pipes = pipes.filter(pipe => pipe.x > -50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#87CEEB';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 30, pipe.top);
    ctx.f
