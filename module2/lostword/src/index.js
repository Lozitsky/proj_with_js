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
  rows.forEach(row => row.addEventListener('keyup', moveToNextInput));
  
  keyLetters.forEach(key => key.addEventListener('click', clickLetter));
  
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
  return activeIndex < cells.length ? !cells[activeIndex].focus() : false;
}

function getCurrentRow() {
  return document.querySelector(`.table__row-${currentRow}`);
}

function getCurrentCells() {
  return getCurrentRow().querySelectorAll('.table__cell');
}

function clickLetter(e) {
  let cells = Array.prototype.slice.call(getCurrentCells());
  cells.find((cell, i) => {
    if (!cell.value) {
      cell.value = e.target.innerText;
      return setFocusToInput(i + 1, cells);
    }
  });
}

function resetGame() {
  getStats();
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

function populateStats(param_gues) {
  let total = stats.querySelector('.main__stats-total');
  total.innerText = gamesPlayed.length;

  let percent = stats.querySelector('.main__stats-percent');
  let percent_correct = gamesPlayed.reduce((sum, item) => item.solved ? ++sum : sum, 0) * 100 / gamesPlayed.length;
  percent.innerText = percent_correct | 0;

  let average = stats.querySelector('.main__stats-average');
  let average_guesses = gamesPlayed.reduce((acc, item) => acc + item[param_gues], 0) / gamesPlayed.length;
  average.innerText = average_guesses | 0;
}

function getStats() {
  // console.log('getStats');
  const param_gues = "numGuesses";
  TurdleAPI.getStats().then(arr => {
    gamesPlayed = [...arr];
    // console.log(gamesPlayed);
    populateStats(param_gues);
  });
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
  let all_raws = Array.prototype.slice.call(rows);
  all_raws.forEach(row => Array.prototype.slice.call(row.querySelectorAll('.table__cell'))
    .forEach(cell => cell.disabled = !row.className.includes(`-${currentRow}`)));

  all_raws.find(row => row.className.includes(`-${currentRow}`))
    .querySelector('.table__cell').focus();
}

function getNoticedClass(cellClass) {
  return cellClass.includes('wrong') || cellClass.includes('correct');
}

function clearNoticed(cell) {
  cell.className.split(' ')
    .forEach(sClass => getNoticedClass(sClass) ? cell.classList.remove(sClass) : undefined);
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
  let current_state = {solved: state, guesses: currentRow};
  TurdleAPI.addStats(current_state)
    .then(isSaved => isSaved ? 
      (gamesPlayed.push(current_state) ? resetGame() : console.error("Error! Unable to save to local"))
      : console.error("Error! Unable to save to server"));
  // console.log(gamesPlayed);

  if (state) {
    declareWinner();
  } else {
    showPopup();
  }
}

function submitGuess() {
  if (checkIsWord()) {
    errorMessage.innerText = '';
    compareGuess();
    if (checkForWin()) {
      saveResult(true);
    } else if (currentRow === rows.length) {
      saveResult(false);
    } else {
      changeRow();
    }
  } else {
    errorMessage.innerText = 'Not a valid word. Try again!';
  }
}

function checkIsWord() {
  guess = Array.prototype.slice.call(getCurrentCells())
    .reduce((word, cell) => word + cell.value, '');
  return words.includes(guess);
}

function compareGuess() {
  guess.split('').forEach((letter, i) => {
    let wrongClass = getWrongClass(i, letter);
    updateBoxColor(getCurrentCells()[i], wrongClass);
    updateKeyColor(letter, `${wrongClass}-key`);
  });
}

function getWrongClass(index, letter) {
  return winningWord.includes(letter) && winningWord.split('')[index] !== letter ? 
    'wrong-location' : winningWord[index] === letter ?
      'correct-location' : 
      'wrong';
}

function updateBoxColor(cell, className) {
  cell.classList.add(className);
}

function updateKeyColor(letter, className) {
  Array.prototype.slice.call(keyLetters)
    .find(key => key.innerText === letter ? !key.classList.add(className) : false);
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
    // console.log('clearInterval', time_count);
    clearTimeout(timeout);
    clearInterval(countdown);
    time_count = countInit;
  }
  time.innerText = time_count;
}

function showPopup() {
  // console.log('Popup!', `time_count: ${time_count}`);
  makeVisible(popup);
  timeout = setTimeout(() => makeInvisible(popup), time_count * 1000);
  countdown = setInterval(showTime, 1000);
}

function makeInvisible(target) {
  // console.log('makeInvisible');
  target.classList.add('hidden');
}

function makeVisible(target) {
  // console.log('makeVisible');
  target.classList.remove('hidden');
}