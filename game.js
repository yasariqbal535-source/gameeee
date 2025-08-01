<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Flappy Clone</title>
  <style>
    body {
      margin: 0;
      background: #87CEEB;
      font-family: sans-serif;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      height: 100vh;
    }
    #leaderboard-wrapper {
      width: 200px;
      padding: 10px;
      color: white;
    }
    #scoreboard {
      text-align: left;
    }
    #scoreList {
      list-style: none;
      padding-left: 0;
      font-size: 16px;
    }
    #homeScreen {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.6);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    #homeScreen button {
      padding: 10px 20px;
      font-size: 1.2em;
      cursor: pointer;
    }
    canvas {
      background: #87CEEB;
    }
    #adOverlay, #continueOptions {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      z-index: 20;
    }
    #adOverlay {
      background: black;
    }
    #continueOptions {
      background: rgba(0, 0, 0, 0.6);
      z-index: 15;
    }
    button {
      margin: 5px;
      padding: 10px 15px;
    }
  </style>
</head>
<body>
  <div id="homeScreen">
    <h1>Flappy Clone</h1>
    <p>Press Space or Click Start</p>
    <button onclick="startGame()">Start</button>
  </div>

  <div id="leaderboard-wrapper">
    <div id="scoreboard" style="display:none;">
      <h2>Leaderboard</h2>
      <ul id="scoreList"></ul>
    </div>
  </div>

  <canvas id="gameCanvas" width="320" height="480"></canvas>

  <div id="adOverlay">
    <p>Playing ad... please wait</p>
    <p id="adCountdown">5</p>
  </div>

  <div id="continueOptions">
    <h2>Game Over</h2>
    <button onclick="watchAd()">Watch Ad to Continue</button>
    <button onclick="confirmQuit()">Quit</button>
  </div>

  <script src="game.js"></script>
</body>
</html>
