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
import SleepRepository from "./class/sleep/SleepRepository";

// Create variables targetting the relevant DOM elements here 👇
// let variables = JSON.parse(localStorage.getItem("variable") || '[]');
const headerName = document.querySelector('.header__name');
const headerDate = document.querySelector('.header__date');
const rowData = document.querySelector('.bio__row-data');
const rowStepGoal = document.querySelector('.step-goal__row-data');
const rowCurHydr = document.querySelector('.hydration__row-data');
const rowCurSleep = document.querySelector('.sleep__row-data');
const tableWeekHydr = document.querySelector('.w-h__table');
const tableWeekSleep = document.querySelector('.w-s__tbody');
// const rowWeekHydr = tableWeekHydr.querySelector('.w-h__row-data');
const navList = document.querySelector('.sidenav__list');
const account = document.querySelector('.account__bio');
const goal = document.querySelector('.account__step-goal');
const hydration = document.querySelector('.account__hydration');
const weekHydr = document.querySelector('.account__w-h');
const sleep = document.querySelector('.account__sleep');
const weekSleep = document.querySelector('.account__w-s');
const userInfBtn = navList.querySelector('.sidenav__link-user');
const stepGoalInfBtn = navList.querySelector('.sidenav__link-step-goal');
const curHydrBtn = navList.querySelector('.sidenav__link-cur-hydr');
const curSleepBtn = navList.querySelector('.sidenav__link-cur-sleep');
const weekHydrBtn = navList.querySelector('.sidenav__link-w-h');
const weekSleepBtn = navList.querySelector('.sidenav__link-w-s');
let user;
let currentDate = '2021/12/21';
// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', setupApp);
userInfBtn.addEventListener('click', showUserInfo);
stepGoalInfBtn.addEventListener('click', showGoals);
curHydrBtn.addEventListener('click', showCurHydration);
weekHydrBtn.addEventListener('click', showWeeklyHydration);
curSleepBtn.addEventListener('click', showCurSleep);
weekSleepBtn.addEventListener('click', showWeeklySleep);

// Create your event handlers and other functions here 👇
function makeCollapsed(target) {
  target.classList.add('collapsed');
}

function makeVisible(target) {
  target.classList.remove('collapsed');
}

function changeVisibility(mustVisible) {
  const mustHidden = [hydration, account, goal, weekHydr, sleep, weekSleep];
  mustHidden.forEach(item => item !== mustVisible ? makeCollapsed(item) : makeVisible(item));
}

function showCurHydration() {
  changeVisibility(hydration);
}

function showWeeklyHydration() {
  changeVisibility(weekHydr);
}

function showCurSleep() {
  changeVisibility(sleep);
}

function showWeeklySleep() {
  changeVisibility(weekSleep);
}

function showUserInfo() {
  changeVisibility(account);
}

function showGoals() {
  changeVisibility(goal);
}

function setGreet(user) {
  headerName.innerText = user.getName();
}

function queries(target, selectors = [], data = []) {
  selectors.forEach((selector, i) => {
    return target.querySelector('.' + selector).innerText = data[i];
  });
}

function populateUserInfo(user) {
  queries(rowData, 
    ['bio__data-name', 'bio__data-address',    'bio__data-email',
      'bio__data-stride',     'bio__data-goal',       'bio__data-friends'],
    [user.getFullname(), user.getAddress(),       user.getEmail(),
      user.getStrideLength(), user.getDailyStepGoal(), user.getFriends()]);
}

function populateStepGoal(user, repo) {
  queries(rowStepGoal,
    ['step-goal__data-user', 'step-goal__data-all'],
    [user.getDailyStepGoal(), repo.getAverageStepGoal()]);
}

function populateCurrentHydration(repo) {
  queries(rowCurHydr, ['hydration__data-cur', 'hydration__data-aver'],
    [new Hydration(repo.getByDate(currentDate)).getNumOunces(),
      repo.getAverageHydration()]);
}

function populateCurrentSleep(repo) {
  queries(rowCurSleep, ['sleep__data-hours', 'sleep__data-quality'],
    [repo.getSleptHoursByDate(currentDate),
      repo.getSleepQualityByDate(currentDate)]);
}

function populateWeeklyHydration(repo) {
  queries(tableWeekHydr, ['w-h__head-1', 'w-h__data-1', 'w-h__head-2', 'w-h__data-2', 'w-h__head-3', 'w-h__data-3', 'w-h__head-4', 'w-h__data-4',
    'w-h__head-5', 'w-h__data-5', 'w-h__head-6', 'w-h__data-6', 'w-h__head-7', 'w-h__data-7'],
  [...repo.getByLastWeek(currentDate)
    .flatMap(hydration => {
      let hydr = new Hydration(hydration);
      return [hydr.getDate(), hydr.getNumOunces()];
    })]);
}

function populateWeeklySleep(repo) {
  repo.getByLastWeek(currentDate).forEach((sleep, i) => queries(
    tableWeekSleep.querySelector(`.w-s__row-data-${i + 1}`),
    ['w-s__data-date', 'w-s__data-hours', 'w-s__data-quality'],
    [sleep.getDate(), sleep.getSleptHours(), sleep.getSleepQuality()]));
}

function setDate(hydrationRepo) {
  currentDate = Utils.getRandomDate(hydrationRepo.getAll());
  headerDate.innerText = currentDate;
}

function populateData(userRepo, hydrationRepo, sleepRepo) {
  setDate(hydrationRepo);
  setGreet(user);
  populateUserInfo(user);
  populateStepGoal(user, userRepo);
  populateCurrentHydration(hydrationRepo);
  populateWeeklyHydration(hydrationRepo);
  populateCurrentSleep(sleepRepo);
  populateWeeklySleep(sleepRepo);
}

function setupApp() {
  let userRepo;
  let hydrationRepo, sleepRepo;
  Promise.all([FitlitAPI.getUserData(), FitlitAPI.getHydrationData(), FitlitAPI.getSleepData()])
    .then(([uData, hData, sData]) => {
      if (uData) {
        userRepo = new UserRepository(uData.userData);
        user = new User(userRepo.getUserData(Utils.getRandomIndex(userRepo.getAllUsers())));
      }
      if (user && hData) {
        hydrationRepo = new HydrationRepository(hData.hydrationData, user.getId());
      }
      if (user && sData) {
        sleepRepo = new SleepRepository(sData.sleepData, user.getId());
      }
      populateData(userRepo, hydrationRepo, sleepRepo);
    })
    .catch(console.log);
}

