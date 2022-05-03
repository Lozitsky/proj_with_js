// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// https://stackoverflow.com/a/64622867/9586230

import './scss/styles.scss';
import './images/turing-logo.png'
import Utils from './class/Utils';
import UserRepository from "./class/user/UserRepository";
import User from "./class/user/User";
import FitlitAPI from './class/FitlitAPI';
import HydrationRepository from "./class/hydration/HydrationRepository";
import Hydration from "./class/hydration/Hydration";
let user;

// Create variables targetting the relevant DOM elements here 👇
// let variables = JSON.parse(localStorage.getItem("variable") || '[]');
const headerName = document.querySelector('.header__name');
const rowData = document.querySelector('.bio__row-data');
const rowCompare = document.querySelector('.compare__row-data');
const rowCurHydr = document.querySelector('.hydration__row-data');
const rowWeekHydr = document.querySelector('.w-h__row-data');
const navList = document.querySelector('.sidenav__list');
const account = document.querySelector('.account__bio');
const goal = document.querySelector('.account__compare');
const hydration = document.querySelector('.account__hydration');
const weekHydr = document.querySelector('.account__w-h');
const userInfBtn = navList.querySelector('.sidenav__link-user');
const allInfBtn = navList.querySelector('.sidenav__link-all');
const curHydrBtn = navList.querySelector('.sidenav__link-cur-hydr');
const weekHydrBtn = navList.querySelector('.sidenav__link-w-h');

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', setupApp);
userInfBtn.addEventListener('click', showUserInfo);
allInfBtn.addEventListener('click', showGoals);
curHydrBtn.addEventListener('click', showCurHydration);
weekHydrBtn.addEventListener('click', showWeeklyHydration);

// Create your event handlers and other functions here 👇
function makeCollapsed(target) {
  target.classList.add('collapsed');
}

function makeVisible(target) {
  target.classList.remove('collapsed');
}

function changeVisibility(mustVisible, ...mustHidden) {
  mustHidden.forEach(item => makeCollapsed(item));
  makeVisible(mustVisible);
}

function showCurHydration() {
  changeVisibility(hydration, account, goal, weekHydr);
}

function showWeeklyHydration() {
  changeVisibility(weekHydr, account, goal, hydration);
}

function showUserInfo() {
  changeVisibility(account, goal, hydration, weekHydr);
}

function showGoals() {
  changeVisibility(goal, account, hydration, weekHydr);
}

function setGreet(user) {
  headerName.innerText = user.getName();
}

function queries(target, selectors = [], data = []) {
  selectors.forEach((selector, i) =>
    target.querySelector('.' + selector).innerText = data[i]);
}

function populateUserInfo(user) {
  queries(rowData, 
    ['bio__data-name', 'bio__data-address',    'bio__data-email',
      'bio__data-stride',     'bio__data-goal',       'bio__data-friends'],
    [user.getFullname(), user.getAddress(),       user.getEmail(),
      user.getStrideLength(), user.getDailyStepGoal(), user.getFriends()]);
}

function populateCompare(user, repo) {
  queries(rowCompare,
    ['compare__data-user', 'compare__data-all'],
    [user.getDailyStepGoal(), repo.getAverageStepGoal()]);
}

function populateCurrentHydration(repo) {
  queries(rowCurHydr, ['hydration__data-cur', 'hydration__data-aver'],
    [new Hydration(repo.getByDate(Utils.getRandomDate(repo.getAll()))).getNumOunces(), 
      repo.getAverageHydration()]);
}

function populateWeeklyHydration(repo) {
  queries(rowWeekHydr, ['w-h__data-1', 'w-h__data-2', 'w-h__data-3', 'w-h__data-4', 
    'w-h__data-5', 'w-h__data-6', 'w-h__data-7'], 
  [...repo.getByLastWeek(Utils.getRandomDate(repo.getAll()))
    .map(hydration => new Hydration(hydration).getNumOunces())]);
}

function populateData(userRepo, hydrationRepo) {
  setGreet(user);
  populateUserInfo(user);
  populateCompare(user, userRepo);
  populateCurrentHydration(hydrationRepo);
  populateWeeklyHydration(hydrationRepo);
}

function setupApp() {
  let userRepo;
  let hydrationRepo;
  Promise.all([FitlitAPI.getUserData(), FitlitAPI.getHydrationData()])
    .then(([uData, hData]) => {
      if (uData) {
        userRepo = new UserRepository(uData.userData);
        user = new User(userRepo.getUserData(Utils.getRandomIndex(userRepo.getAllUsers())));
      }
      if (user && hData) {
        hydrationRepo = new HydrationRepository(hData.hydrationData, user.getId());
      }
      populateData(userRepo, hydrationRepo);
    })
    .catch(console.log);
}

