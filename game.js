const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const homeScreen = document.getElementById('homeScreen');
const scoreboard = document.getElementById('scoreboard');
const scoreList = document.getElementById('scoreList');

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

function spawnPipe() {
  const top = Math.floor(Math.random() * 180) + 40;
  pipes.push({ x: canvas.width, top, scored: false });
}

function update() {
  if (!gameRunning || gameOver) return;

  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > canvas.height || birdY < 0) {
    triggerContinueOptions();
  }

  pipes.forEach(pipe => {
    pipe.x -= pipeSpeed;

    if (
      pipe.x < 80 && pipe.x + 30 > 40 &&
      (birdY < pipe.top || birdY > pipe.top + 140)
    ) {
      triggerContinueOptions();
    }

    const birdFront = 50;
    const pipeBack = pipe.x + 30;
    if (!pipe.scored && pipeBack < birdFront) {
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
    ctx.fillRect(pipe.x, pipe.top + 140, 30, canvas.height);
  });

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(50, birdY, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText('Score: ' + score, 10, 25);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function triggerContinueOptions() {
  gameOver = true;
  gameRunning = false;
  document.getElementById('continueOptions').style.display = 'flex';
}

function watchAd() {
  document.getElementById('continueOptions').style.display = 'none';
  const adOverlay = document.getElementById('adOverlay');
  adOverlay.style.display = 'flex';
  let countdown = 5;
  const countdownText = document.getElementById('adCountdown');
  countdownText.textContent = countdown;

  const adTimer = setInterval(() => {
    countdown--;
    countdownText.textContent = countdown;
    if (countdown === 0) {
      clearInterval(adTimer);
      adOverlay.style.display = 'none';
      gameOver = false;
      gameRunning = true;
    }
  }, 1000);
}

function confirmQuit() {
  const name = prompt("Game Over! Enter your name:") || "Anonymous";
  saveScore(name, score);
  displayScores();
  document.getElementById('continueOptions').style.display = 'none';
  scoreboard.style.display = 'block';
}

function saveScore(name, score) {
  const scores = JSON.parse(localStorage.getItem("highscores") || "[]");
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(scores.slice(0, 5)));
}

function displayScores() {
  const scores = JSON.parse(localStorage.getItem("highscores") || "[]");
  scoreList.innerHTML = "";
  scores.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name}: ${s.score}`;
    scoreList.appendChild(li);
  });
  scoreboard.style.display = "block";
}

window.startGame = startGame; // <- CRITICAL: exposes to HTML
resetGame();
gameLoop();
