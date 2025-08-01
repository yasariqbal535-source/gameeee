const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.5;
let flapStrength = -8;
let pipes = [];
let score = 0;

document.addEventListener('keydown', () => {
  birdVelocity = flapStrength;
});

function spawnPipe() {
  const gap = 100;
  const top = Math.floor(Math.random() * 200) + 50;
  pipes.push({ x: canvas.width, top });
}

function update() {
  birdVelocity += gravity;
  birdY += birdVelocity;

  if (birdY > canvas.height || birdY < 0) location.reload();

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (
      pipe.x < 50 && pipe.x > 20 &&
      (birdY < pipe.top || birdY > pipe.top + 100)
    ) {
      location.reload(); // collision
    }

    if (pipe.x === 25) score++;
  });

  pipes = pipes.filter(p => p.x > -50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(50, birdY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Draw pipes
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 30, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 100, 30, canvas.height);
  });

  // Draw score
  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.fillText('Score: ' + score, 10, 25);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

setInterval(spawnPipe, 1500);
gameLoop();
