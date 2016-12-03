const Load = function() {
  this.isPlaying = false;
  this.score = 0;
  this.timeremaining = 2;
}
const $timeDiv = document.getElementById('timeremaining')
const $timeDivValue = document.getElementById('timeremainingvalue')
const $startResetButton = document.getElementById('startreset');
const $gameOver = document.getElementById('gameOver');

let gameState;
const startGame = () => {
  $timeDiv.style.display = 'block'
  $timeDivValue.innerHTML = 2;
  $startResetButton.innerHTML = 'Stop Game'
  gameState = new Load();
  gameState.isPlaying = true
  startTimer = setInterval(() => {
    gameState.timeremaining--
    $timeDivValue.innerHTML = gameState.timeremaining
    if (gameState.timeremaining === 0) {
      stopGame();
      displayResults();
    }
  }, 1000)
}
const stopGame = () => {
  gameState.isPlaying = false
  $startResetButton.innerHTML = 'Reset Game'
  clearInterval(startTimer);
}
const displayResults = () => {
  const goPara = '<p>GAME OVER!<p>'
  const scorePara = `<p>YOUR SCORE IS ${gameState.score}</p>`
  $gameOver.innerHTML = `${goPara}${scorePara}`
  $gameOver.style.display = 'block';
}
const $startreset = document.getElementById('startreset');

$startreset.onclick = () => {
  if (!gameState || !gameState.isPlaying) {
    $gameOver.style.display = 'none';
    startGame()
  } else {
    stopGame()
  }
}
