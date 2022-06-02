// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// https://stackoverflow.com/a/64622867/9586230

import './scss/styles.scss';
import './images/turing-logo.png'
import Utils from './class/Utils';
import UserRepository from "./class/user/UserRepository";
// import User from "./class/user/User";
import FitlitAPI from './class/FitlitAPI';
import HydrationRepository from "./class/hydration/HydrationRepository";
// import Hydration from "./class/hydration/Hydration";
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

function getCName(prefix) {
  return function (cName) {
    return `${prefix}__data-${cName} > .${prefix}__span`;
  }
}

function populateUserInfo(user) {
  let cName = getCName('bio');
  console.log(cName('full-name'));
  queries(rowData,
    [cName('full-name'), cName('address'), cName('email')
      , cName('stride-length'), cName('daily-step-goal'), cName('friends')],
    [user.getFullname(), user.getAddress(), user.getEmail(),
      user.getStrideLength(), user.getDailyStepGoal(), user.getFriends()]);
}

function populateStepGoal(user, repo) {
  let cName = getCName('step-goal');

  queries(rowStepGoal,
    [cName('person'), cName('average')],
    [user.getDailyStepGoal(), repo.getAverageStepGoal()]);
}

function populateCurrentHydration(repo) {
  let cName = getCName('hydration');
  queries(rowCurHydr,
    [cName('consumed-today'), cName('average-consume')],
    [repo.getByDate(currentDate).getNumOunces(),
      repo.getAverageHydration()]);
}

function populateCurrentSleep(repo) {
  let cName = getCName('sleep');
  queries(rowCurSleep,
    [cName('hours-slept'), cName('quality-of-sleep')],
    [repo.getSleptHoursByDate(currentDate),
      repo.getSleepQualityByDate(currentDate)]);
}

function populateAverageSleep(repo) {
  let cName = getCName('a-s');
  queries(rowAverageSleep,
    // ['a-s__data-average-hours-slept', 'a-s__data-average-quality-of-sleep'],
    [cName('average-hours-slept'), cName('average-quality-of-sleep')],
    [repo.getAverageHoursSleptPerDay(),
      repo.getAverageSleepQualityPerDay()]);
}

function getTarget(prefix) {
  return function (cName) {
    let id = 1;
    return function () {
      return `${prefix}__row-body-${id++} > .${prefix}__data-${cName} > .${prefix}__span`;
    };
  }
}

function populateWeeklyHydration(repo) {
  let w_h = getTarget('w-h');
  let date = w_h('date');
  let ounces = w_h('ounces-of-water');
  queries(tableWeekHydr,
    Array(7).fill(0).flatMap(() => [date(), ounces()]),
    [...repo.getByLastWeek(currentDate)
      .flatMap(hydration => [hydration.getDate(), hydration.getNumOunces()])]);
}

function populateWeeklySleep(repo) {
  let cName = getCName('w-s');
  repo.getByLastWeek(currentDate).forEach((sleep, i) => queries(
    tableWeekSleep.querySelector(`.w-s__row-body-${i + 1}`),
    [cName('date'), cName('hours-slept'), cName('quality-of-sleep')],
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
        // user = new User(userRepo.getUserData(Utils.getRandomIndex(userRepo.getAllUsers())));
        user = userRepo.getById(Utils.getRandomIndex(userRepo.getAllUsers()));
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

