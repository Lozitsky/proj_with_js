// Create variables targetting the relevant DOM elements here 👇
const goal = document.querySelector("#goal");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
// const question_goal = document.querySelector(".form__goal");
const form = document.querySelector(".form");
const form_panel = form.querySelector(".form__panel");
const submitBtn = form.querySelector(".submit");
const panel_warning = form.querySelector(".form__panel-warning");
const goal_warning = form.querySelector(".form__goal-warning");
const minutes_warning = form.querySelector(".form__minutes-warning");
const seconds_warning = form.querySelector(".form__seconds-warning");


// Add your event listeners here 👇
submitBtn.addEventListener('click', makeActivity);
goal.addEventListener('input', () => toggleWarning(goal, goal_warning));
minutes.addEventListener('input', () => toggleWarning(minutes, minutes_warning));
seconds.addEventListener('input', () => toggleWarning(seconds, seconds_warning));
form_panel.addEventListener('click', showChecked);
// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function toggleWarning(target, target_warning) {
    if (!target.value && !target.classList.contains("warning") || target.value && target.classList.contains("warning")) {
        target_warning.hidden = !target_warning.hidden;
        target.classList.toggle("warning");
        // console.log('target.value: ' + target.value);
    }
}

function makeActivity(ev) {
    ev.preventDefault();
    checkCategory();
    toggleWarning(goal, goal_warning);
    toggleWarning(minutes, minutes_warning);
    toggleWarning(seconds, seconds_warning);
}

function hidePanelWarning() {
    if (!panel_warning.hidden) {
        panel_warning.hidden = true;
        form_panel.classList.remove("warning");
    }
}

function showChecked(ev) {
    if (ev.target.classList.contains("input-box")) {
        hidePanelWarning();
    }
    // console.log(ev.target);
}

function checkCategory() {
    let categoryList = form_panel.querySelectorAll("[name='category']");
    for (let category of categoryList) {
        if (category.checked) {
            // toggleWarning(form_panel, panel_warning);
            hidePanelWarning();
            return true;
        }
        // console.log(category);
    }
    // toggleWarning(form_panel, panel_warning);
    panel_warning.hidden = false;
    form_panel.classList.add("warning");
    return undefined;
    // console.log(categoryList);
}