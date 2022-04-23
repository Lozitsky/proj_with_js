// Global Variables
// let {words} = require('./classes/words.js');
import TurdleAPI from './classes/LocalTurdleAPI';
import './scss/styles.scss';
import './assets/turdle-turtle.png';

let words = [];
let gamesPlayed = [];
let countdown;

let time_count;
const countInit = 4;
let winningWord;
let currentRow;
let guess;
let timeout;

// Query Selectors
const rows = document.querySelectorAll('.table__row');
const cells = document.querySelectorAll('.table__cell');
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
const popup = document.querySelector('.popup');
const time = document.querySelector('.popup__time');

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
  // console.log(key);
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

function resetGame() {
  winningWord = '';
  currentRow = 1;
  guess = '';
  clearRows();
  clearLetters();
  makeRandomWord().then(data => {
    if (data) {
      console.log(data);
      updateInputPermissions();
    }
  }).catch(console.error);
}

function setGame() {
  time_count = countInit;
  setListeners();
  resetGame();
}

function makeRandomWord() {
  return TurdleAPI.getAllWorlds().then(data => {
    words = [...data];
    const randomIndex = Math.floor(Math.random() * words.length);
    winningWord = words[randomIndex];
    return winningWord;
  });
}

function updateInputPermissions() {
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

function getNoticedClass(cellClass) {
  return cellClass.includes('wrong') || cellClass.includes('correct');
}

function clearNoticed(cell) {
  for (const cellClass of cell.className.split(' ')) {
    if (getNoticedClass(cellClass)) {
      cell.classList.remove(cellClass);
    }
  }
}

function clearRows() {
  for (const cell of cells) {
    cell.value = '';
    clearNoticed(cell);
  }
}

function clearLetters() {
  for (const letter of keyLetters) {
    clearNoticed(letter);
  }
}

function saveResult(state) {
  gamesPlayed.push({solved: state, guesses: currentRow});
  console.log(gamesPlayed);
}

function submitGuess() {
  if (checkIsWord()) {
    errorMessage.innerText = '';
    compareGuess();
    if (checkForWin()) {
      declareWinner();
    } else if (currentRow === rows.length) {
      saveResult(false);
      showPopup();
      resetGame();
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
      updateBoxColor(cells[i], 'wrong-location');
      updateKeyColor(guessLetters[i], 'wrong-location-key');
    } else if (winningWord.split('')[i] === guessLetters[i]) {
      updateBoxColor(cells[i], 'correct-location');
      updateKeyColor(guessLetters[i], 'correct-location-key');
    } else {
      updateBoxColor(cells[i], 'wrong');
      updateKeyColor(guessLetters[i], 'wrong-key');
    }
  }
}


function updateBoxColor(cell, className) {
  cell.classList.add(className);
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

function showTime() {
  if (--time_count < 1) {
    console.log('clearInterval', time_count);
    clearTimeout(timeout);
    clearInterval(countdown);
    time_count = countInit;
  }
  time.innerText = time_count;
}

function showPopup() {
  console.log('Popup!', `time_count: ${time_count}`);
  makeVisible(popup);
  timeout = setTimeout(() => makeInvisible(popup), time_count * 1000);
  countdown = setInterval(showTime, 1000);
}

function makeInvisible(target) {
  console.log('makeInvisible');
  target.classList.add('hidden');
}

function makeVisible(target) {
  console.log('makeVisible');
  target.classList.remove('hidden');
}