const Load = function() {
  this.isPlaying = false;
  this.score = 0;
  this.timeremaining = 60;
  this.currentQuestion = 0;
}
const $timeDiv = document.getElementById('timeremaining')
const $timeDivValue = document.getElementById('timeremainingvalue')
const $startResetButton = document.getElementById('startreset');
const $gameOver = document.getElementById('gameOver');
const $box1 = document.getElementById('box1');
const $box2 = document.getElementById('box2');
const $box3 = document.getElementById('box3');
const $box4 = document.getElementById('box4');
const $scorevalue = document.getElementById('scorevalue');
const $correct = document.getElementById('correct');
const $wrong = document.getElementById('wrong');

$box1.onclick = (e) => {
  if (questions[gameState.currentQuestion].solutions[0].correct) {
    correctResponse();
  } else {
    incorrectResponse();
  }
}
$box2.onclick = (e) => {
  if (questions[gameState.currentQuestion].solutions[1].correct) {
    correctResponse();
  } else {
    incorrectResponse();
  }
}
$box3.onclick = (e) => {
  if (questions[gameState.currentQuestion].solutions[2].correct) {
    correctResponse();
  } else {
    incorrectResponse();
  }
}
$box4.onclick = (e) => {
  if (questions[gameState.currentQuestion].solutions[3].correct) {
    correctResponse();
  } else {
    incorrectResponse();
  }
}
const incorrectResponse = () => {
  $correct.style.display = 'none'
  $wrong.style.display = 'block';
}
const correctResponse = () => {
  $wrong.style.display = 'none';
  $correct.style.display = 'block'
  gameState.score += 1;
  $scorevalue.innerHTML = gameState.score;
  gameState.currentQuestion += 1
  if (gameState.currentQuestion === questions.length) {
    complete()
  } else {
    $box1.innerHTML = questions[gameState.currentQuestion].solutions[0].text;
    $box2.innerHTML = questions[gameState.currentQuestion].solutions[1].text;
    $box3.innerHTML = questions[gameState.currentQuestion].solutions[2].text;
    $box4.innerHTML = questions[gameState.currentQuestion].solutions[3].text;
    $question.innerHTML = questions[gameState.currentQuestion].question;
  }
}
const complete = () => {
  gameState.isPlaying = false
  $startResetButton.innerHTML = 'Reset Game'
  clearInterval(startTimer);
  displayResults();
}
const $question = document.getElementById('question');
let gameState;
const startGame = () => {
  $timeDiv.style.display = 'block'
  $timeDivValue.innerHTML = 60;
  $startResetButton.innerHTML = 'Stop Game'
  gameState = new Load();
  gameState.isPlaying = true;
  $box1.innerHTML = questions[0].solutions[0].text;
  $box2.innerHTML = questions[0].solutions[1].text;
  $box3.innerHTML = questions[0].solutions[2].text;
  $box4.innerHTML = questions[0].solutions[3].text;
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
let questions = []

const xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', './questions.json', true);
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    const obj = JSON.parse(xmlhttp.responseText);
    questions = obj.questions;
  }
};
xmlhttp.send(null);
