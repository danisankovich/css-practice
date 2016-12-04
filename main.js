const Load = function() {
  this.isPlaying = false;
  this.score = 0;
  this.timeremaining = 60;
  this.currentQuestion = 0;
  this.wrongGuesses = 0;
}
const $timeDiv = document.getElementById('timeremaining')
const $timeDivValue = document.getElementById('timeremainingvalue')
const $startResetButton = document.getElementById('startreset');
const $gameOver = document.getElementById('gameOver');
const $question = document.getElementById('question');
const $box1 = document.getElementById('box1');
const $box2 = document.getElementById('box2');
const $box3 = document.getElementById('box3');
const $box4 = document.getElementById('box4');
const $scorevalue = document.getElementById('scorevalue');
const $correct = document.getElementById('correct');
const $wrong = document.getElementById('wrong');
let questions = []

const $boxes = [$box1, $box2, $box3, $box4]
$boxes.forEach((e, i) => {
  e.onclick = () => {
    questions[gameState.currentQuestion].solutions[i].correct ? correctResponse() : incorrectResponse();
  }
})
const incorrectResponse = () => {
  $correct.style.display = 'none';
  $wrong.style.display = 'block';
  gameState.wrongGuesses += 1;
}
const correctResponse = () => {
  $wrong.style.display = 'none';
  $correct.style.display = 'block'
  gameState.score += 1;
  gameState.currentQuestion += 1
  $scorevalue.innerHTML = gameState.score;
  if (gameState.currentQuestion === questions.length) {
    completeGame()
  } else {
    $boxes.forEach((e, i) => {
      e.innerHTML = questions[gameState.currentQuestion].solutions[i].text;
    });
    $question.innerHTML = questions[gameState.currentQuestion].question;
  }
}
const completeGame = () => {
  gameState.isPlaying = false
  $startResetButton.innerHTML = 'Reset Game'
  clearInterval(startTimer);
  displayResults();
}
let gameState;
const startGame = () => {
  $timeDiv.style.display = 'block'
  $timeDivValue.innerHTML = 60;
  $startResetButton.innerHTML = 'Stop Game'
  gameState = new Load();
  gameState.isPlaying = true;
  $boxes.forEach((e, i) => {
    e.innerHTML = questions[0].solutions[i].text;
  })
  $question.innerHTML = questions[0].question;
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
  const scorePara = `<p>YOUR SCORE IS ${gameState.score} with ${gameState.wrongGuesses} wrong guesses</p>`
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

const xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', './questions.json', true);
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    const obj = JSON.parse(xmlhttp.responseText);
    questions = obj.questions;
  }
};
xmlhttp.send(null);
