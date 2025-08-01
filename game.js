const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const homeScreen = document.getElementById('homeScreen');

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.3; // easier gravity
let flapStrength = -6; // stronger flap
let pipes = [];
let score = 0;
let gameRunning = false;
let gameOver = false;
let pipeInterval = null;
let pipeSpeed = 1.5; // slower pipes

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
    if (
