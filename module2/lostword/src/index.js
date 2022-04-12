// Global Variables
let {words} = require('./words.js');
import './scss/styles.scss';
import './assets/turdle-turtle.png';

let winningWord = '';
let currentRow = 1;
let guess = '';

// Query Selectors
const rows = document.querySelectorAll('.table__row');
const guessButton = document.querySelector('.guess__button');
const keyLetters = document.querySelectorAll('.key-section__key');
const errorMessage = document.querySelector('.guess__error');
const viewRulesButton = document.querySelector('.nav__btn-rules');
const viewGameButton = document.querySelector('.nav__btn-play');
const viewStatsButton = document.querySelector('.nav__btn-stats');
const gameBoard = document.querySelector('.main__game');
const letterKey = document.querySelector('.key-section');
const rules = document.querySelector('.main__rules');
const stats = document.querySelector('.main__stats');

// Event Listeners
window.addEventListener('load', setGame);

function setListeners() {
  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('keyup', moveToNextInput);
  }

  for (let i = 0; i < keyLetters.length; i++) {
    keyLetters[i].addEventListener('click', clickLetter);
  }

  guessButton.addEventListener('click', submitGuess);

  viewRulesButton.addEventListener('click', viewRules);

  viewGameButton.addEventListener('click', viewGame);

  viewStatsButton.addEventListener('click', viewStats);
}

// Functions
function moveToNextInput(e) {
  const cells = e.currentTarget.querySelectorAll('.table__cell');
  let key = e.keyCode || e.charCode;
  if (key !== 8 && key !== 46) {
    let indexOfNext = parseInt(e.target.className.split(' ')
      .find(c => c.includes('-'))
      .split('-')[1]);
    setFocusToInput(indexOfNext, cells);
  }
}

function setFocusToInput(activeIndex, cells) {
  if (activeIndex < cells.length) {
    cells[activeIndex].focus();
  }
}

function getCurrentRow() {
  return document.querySelector(`.table__row-${currentRow}`);
}

function getCurrentCells() {
  return getCurrentRow().querySelectorAll('.table__cell');
}

function clickLetter(e) {
  const cells = getCurrentCells();
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].value) {
      cells[i].value = e.target.innerText;
      setFocusToInput(i + 1, cells);
      return;
    }
  }
}

function setGame() {
  winningWord = getRandomWord();
  setListeners();
  console.log(winningWord);
  updateInputPermissions();
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function updateInputPermissions() {
  // let rows = document.querySelectorAll(`.table__row`);
  let cell0;
  let cells;
  for (let i = 0; i < rows.length; i++) {
    cells = rows[i].querySelectorAll('.table__cell');
    if (rows[i].className.includes(`-${currentRow}`)) {
      cell0 = cells[0];
    }
    for (let j = 0; j < rows[i].length; j++) {
      cells[j].disabled = !rows[i].className.includes(`-${currentRow}`);
    }
  }
  if (cell0) {
    cell0.focus();
  }
}

function submitGuess() {
  if (checkIsWord()) {
    errorMessage.innerText = '';
    compareGuess();
    if (checkForWin()) {
      declareWinner();
    } else {
      changeRow();
    }
  } else {
    errorMessage.innerText = 'Not a valid word. Try again!';
  }
}

function checkIsWord() {
  guess = '';
  let cells = getCurrentCells();
  for (let i = 0; i < cells.length; i++) {
    guess += cells[i].value;
  }

  return words.includes(guess);
}

function compareGuess() {
  let guessLetters = guess.split('');
  let cells = getCurrentCells();

  for (let i = 0; i < guessLetters.length; i++) {
    if (winningWord.includes(guessLetters[i]) && winningWord.split('')[i] !== guessLetters[i]) {
      updateBoxColor(cells, i, 'wrong-location');
      updateKeyColor(guessLetters[i], 'wrong-location-key');
    } else if (winningWord.split('')[i] === guessLetters[i]) {
      updateBoxColor(cells, i, 'correct-location');
      updateKeyColor(guessLetters[i], 'correct-location-key');
    } else {
      updateBoxColor(cells, i, 'wrong');
      updateKeyColor(guessLetters[i], 'wrong-key');
    }
  }
}

function updateBoxColor(cells, letterLocation, className) {
  cells[letterLocation].classList.add(className);
}

function updateKeyColor(letter, className) {
  let keyLetter = null;

  for (let i = 0; i < keyLetters.length; i++) {
    if (keyLetters[i].innerText === letter) {
      keyLetter = keyLetters[i];
    }
  }

  keyLetter.classList.add(className);
}

function checkForWin() {
  return guess === winningWord;
}

function changeRow() {
  currentRow++;
  updateInputPermissions();
}

function declareWinner() {
  console.log('winner!');
}

function viewRules() {
  letterKey.classList.add('hidden');
  gameBoard.classList.add('collapsed');
  rules.classList.remove('collapsed');
  stats.classList.add('collapsed');
  viewGameButton.classList.remove('active');
  viewRulesButton.classList.add('active');
  viewStatsButton.classList.remove('active');
}

function viewGame() {
  letterKey.classList.remove('hidden');
  gameBoard.classList.remove('collapsed');
  rules.classList.add('collapsed');
  stats.classList.add('collapsed');
  viewGameButton.classList.add('active');
  viewRulesButton.classList.remove('active');
  viewStatsButton.classList.remove('active');
}

function viewStats() {
  letterKey.classList.add('hidden');
  gameBoard.classList.add('collapsed');
  rules.classList.add('collapsed');
  stats.classList.remove('collapsed');
  viewGameButton.classList.remove('active');
  viewRulesButton.classList.remove('active');
  viewStatsButton.classList.add('active');
}
