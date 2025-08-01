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
  pipeInterval =
