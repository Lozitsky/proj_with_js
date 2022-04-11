// Global Variables
// import words from './words';
let {words} = require('./words.js');
import './scss/styles.scss';
import './assets/turdle-turtle.png';

let winningWord = '';
let currentRow = 1;
let guess = '';

// Query Selectors
const inputs = document.querySelectorAll('.table__input');
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

let i;
for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function () {
    moveToNextInput(event)
  });
}

for (i = 0; i < keyLetters.length; i++) {
  keyLetters[i].addEventListener('click', function () {
    clickLetter(event)
  });
}

guessButton.addEventListener('click', submitGuess);

viewRulesButton.addEventListener('click', viewRules);

viewGameButton.addEventListener('click', viewGame);

viewStatsButton.addEventListener('click', viewStats);

// Functions
function setGame() {
  winningWord = getRandomWord();
  console.log(winningWord);
  updateInputPermissions();
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * 2500);
  return words[randomIndex];
}

function updateInputPermissions() {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].id.includes(`-${currentRow}-`)) {
      inputs[i].disabled = true;
    } else {
      inputs[i].disabled = false;
    }
  }

  inputs[0].focus();
}

function moveToNextInput(e) {
  let key = e.keyCode || e.charCode;

  if (key !== 8 && key !== 46) {
    let indexOfNext = parseInt(e.target.id.split('-')[2]) + 1;
    inputs[indexOfNext].focus();
  }
}

function clickLetter(e) {
  let activeInput = null;
  let activeIndex = null;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id.includes(`-${currentRow}-`) && !inputs[i].value && !activeInput) {
      activeInput = inputs[i];
      activeIndex = i;
    }
  }

  activeInput.value = e.target.innerText;
  inputs[activeIndex + 1].focus();
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

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id.includes(`-${currentRow}-`)) {
      guess += inputs[i].value;
    }
  }

  return words.includes(guess);
}

function compareGuess() {
  let guessLetters = guess.split('');

  for (let i = 0; i < guessLetters.length; i++) {

    if (winningWord.includes(guessLetters[i]) && winningWord.split('')[i] !== guessLetters[i]) {
      updateBoxColor(i, 'wrong-location');
      updateKeyColor(guessLetters[i], 'wrong-location-key');
    } else if (winningWord.split('')[i] === guessLetters[i]) {
      updateBoxColor(i, 'correct-location');
      updateKeyColor(guessLetters[i], 'correct-location-key');
    } else {
      updateBoxColor(i, 'wrong');
      updateKeyColor(guessLetters[i], 'wrong-key');
    }
  }

}

function updateBoxColor(letterLocation, className) {
  const row = [];

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id.includes(`-${currentRow}-`)) {
      row.push(inputs[i]);
    }
  }

  row[letterLocation].classList.add(className);
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
