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
const headerName = document.querySelector('.header__name');
const headerDate = document.querySelector('.header__date');
const rowData = document.querySelector('.bio__row-body');
const rowStepGoal = document.querySelector('.step-goal__row-body');
const rowCurHydr = document.querySelector('.hydration__row-body');
const tableWeekHydr = document.querySelector('.w-h__table');
const rowCurSleep = document.querySelector('.sleep__row-body');
const tableWeekSleep = document.querySelector('.w-s__tbody');
const rowAverageSleep = document.querySelector('.a-s__row-body');

let user;
let currentDate = '2021/12/21';
// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', setupApp);

// Create your event handlers and other functions here 👇

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
    ['bio__data-full-name', 'bio__data-address',    'bio__data-email',
      'bio__data-stride-length',     'bio__data-daily-step-goal',       'bio__data-friends'],
    [user.getFullname(), user.getAddress(),       user.getEmail(),
      user.getStrideLength(), user.getDailyStepGoal(), user.getFriends()]);
}

function populateStepGoal(user, repo) {
  queries(rowStepGoal,
    ['step-goal__data-person', 'step-goal__data-average'],
    [user.getDailyStepGoal(), repo.getAverageStepGoal()]);
}

function populateCurrentHydration(repo) {
  queries(rowCurHydr, ['hydration__data-consumed-today', 'hydration__data-average-consume'],
    [new Hydration(repo.getByDate(currentDate)).getNumOunces(),
      repo.getAverageHydration()]);
}

function populateCurrentSleep(repo) {
  queries(rowCurSleep, ['sleep__data-hours-slept', 'sleep__data-quality-of-sleep'],
    [repo.getSleptHoursByDate(currentDate),
      repo.getSleepQualityByDate(currentDate)]);
}

function populateAverageSleep(repo) {
  queries(rowAverageSleep, ['a-s__data-average-hours-slept', 'a-s__data-average-quality-of-sleep'],
    [repo.getAverageHoursSleptPerDay(),
      repo.getAverageSleepQualityPerDay()]);
}

function populateWeeklyHydration(repo) {
  function getDateSel(id) {
    return `w-h__row-body-${id} > .w-h__data-date > .w-h__span`;
  }
  function getOunSel(id) {
    return `w-h__row-body-${id} > .w-h__data-ounces-of-water > .w-h__span`;
  }

  queries(tableWeekHydr,
    [getDateSel(1), getOunSel(1), getDateSel(2), getOunSel(2), getDateSel(3), getOunSel(3), getDateSel(4), getOunSel(4), getDateSel(5), getOunSel(5), getDateSel(6), getOunSel(6), getDateSel(7), getOunSel(7), ],
    [...repo.getByLastWeek(currentDate)
      .flatMap(hydration => {
        let hydr = new Hydration(hydration);
        return [hydr.getDate(), hydr.getNumOunces()];
      })]);
}

function populateWeeklySleep(repo) {
  repo.getByLastWeek(currentDate).forEach((sleep, i) => queries(
    tableWeekSleep.querySelector(`.w-s__row-body-${i + 1}`),
    ['w-s__data-date > .w-s__span', 'w-s__data-hours-slept > .w-s__span', 'w-s__data-quality-of-sleep > .w-s__span'],
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
  populateAverageSleep(sleepRepo);
}

function setupApp() {
  let userRepo, hydrationRepo, sleepRepo;
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

