// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// https://stackoverflow.com/a/64622867/9586230

import './scss/styles.scss';
import './images/turing-logo.png'
import userData from './data/users';
import Utils from './class/Utils';
import UserRepository from "./class/user/UserRepository";
import User from "./class/user/User";
import FitlitAPI from './class/FitlitAPI';
let userRepo;
let user;

// Create variables targetting the relevant DOM elements here 👇
// let variables = JSON.parse(localStorage.getItem("variable") || '[]');
const headerName = document.querySelector('.header__name');
const rowData = document.querySelector('.bio__row-data');
const rowCompare = document.querySelector('.compare__row-data');
const navList = document.querySelector('.sidenav__list');
const account = document.querySelector('.account__bio');
const compare = document.querySelector('.account__compare');
const userInfBtn = navList.querySelector('.sidenav__link-user');
const allInfBtn = navList.querySelector('.sidenav__link-all');

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', setupApp);
userInfBtn.addEventListener('click', showUserInfo);
allInfBtn.addEventListener('click', showGoals);

// Create your event handlers and other functions here 👇
function makeCollapsed(target) {
  target.classList.add('collapsed');
}

function makeVisible(target) {
  // isCollapsed(compare) ? target.classList.remove('collapsed') : '';
  target.classList.remove('collapsed');
}

function changeVisibility(mustVisible, ...mustHidden) {
  mustHidden.forEach(item => makeCollapsed(item));
  makeVisible(mustVisible);
}

function showUserInfo() {
  changeVisibility(account, compare);
}

function showGoals() {
  changeVisibility(compare, account);
}

function setGreet(user) {
  headerName.innerText = user.getName();
}

function populateUserInfo(user) {
  rowData.querySelector('.bio__data-name').innerText = user.getFullname();
  rowData.querySelector('.bio__data-address').innerText = user.getAddress();
  rowData.querySelector('.bio__data-email').innerText = user.getEmail();
  rowData.querySelector('.bio__data-stride').innerText = user.getStrideLength();
  rowData.querySelector('.bio__data-goal').innerText = user.getDailyStepGoal();
  rowData.querySelector('.bio__data-friends').innerText = user.getFriends();
}

function populateCompare(user, repo) {
  rowCompare.querySelector('.compare__data-user').innerText = user.getDailyStepGoal();
  rowCompare.querySelector('.compare__data-all').innerText = repo.getAverageStepGoal();
}

function populateData() {
  setGreet(user);
  populateUserInfo(user);
  populateCompare(user, userRepo);
}

function setupApp() {
  FitlitAPI.getUserData().then(data => {
    if (data) {
      // console.log(data);
      userRepo = new UserRepository(userData);
      user = new User(userRepo.getUserData(Utils.getRandomIndex(userRepo.getAllUsers())));
      populateData();
    }
  }).catch(console.log);
}

