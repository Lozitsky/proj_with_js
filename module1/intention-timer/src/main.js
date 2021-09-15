// Create variables targetting the relevant DOM elements here 👇
const goalEl = document.querySelector("#goal");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const main_title = document.querySelector(".main__title");
const formEl = document.querySelector(".form");
const card_boxEl = document.querySelector(".aside__card-box");
const aside_textEl = document.querySelector(".aside__text");
const categoryEl = formEl.querySelector(".form__category");
const questionEl = formEl.querySelector(".form__questions");
const timerEl = formEl.querySelector(".form__timer");
const activity_newEl = formEl.querySelector(".form__activity-new");
const descriptionEl = timerEl.querySelector(".form__description");
const timeEl = timerEl.querySelector(".form__time");
const form_panel = formEl.querySelector(".form__panel");
const panel_warning = formEl.querySelector(".form__panel-warning");
const goal_warning = formEl.querySelector(".form__goal-warning");
const minutes_warning = formEl.querySelector(".form__minutes-warning");
const seconds_warning = formEl.querySelector(".form__seconds-warning");
const circleBtn = timerEl.querySelector(".form__circle-btn");
const submitBtn = formEl.querySelector(".submit");
const logBtn = formEl.querySelector(".log-btn");
const createBtn = activity_newEl.querySelector(".create");
let activity;
let blocked;

// Add your event listeners here 👇
submitBtn.addEventListener('click', makeActivity);
goalEl.addEventListener('input', () => toggleWarning(goalEl, goal_warning));
minutesEl.addEventListener('input', () => toggleWarning(minutesEl, minutes_warning));
secondsEl.addEventListener('input', () => toggleWarning(secondsEl, seconds_warning));
form_panel.addEventListener('click', listenRadio);
circleBtn.addEventListener("click", startActivity);
logBtn.addEventListener('click', savePast);
createBtn.addEventListener('click', getFormActivity);

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function toggleWarning(target, target_warning) {

    let value = target.value;
    if (!value && !target.classList.contains("warning") || value && target.classList.contains("warning")) {
        target_warning.hidden = !target_warning.hidden;
        target.classList.toggle("warning");
    }
    return value;
}

function makeActivity(ev) {
    ev.preventDefault();
    let category;
    let description;
    let minutes;
    let seconds;
    category = checkCategory();
    if (category) {
        description = toggleWarning(goalEl, goal_warning);
        if (description) {
            minutes = toggleWarning(minutesEl, minutes_warning);
            if (minutes) {
                seconds = toggleWarning(secondsEl, seconds_warning);
                if (seconds) {
                    activity = new Activity(categories[category], description, minutes, seconds, Date.now());
                    showCurrentActivity();
                }
            }
        }
    }
}

function getTimeFormat(number) {
    return ("0" + number).slice(-2);
}

function getActivityColor() {
    let color;
    switch (activity.category) {
        case 'Study' :
            color = '#B3FD78';
            break;
        case 'Meditate' :
            color = '#C278FD';
            break;
        case 'Exercise' :
            color = '#FD8078';
            break;
    }
    return color;
}

function showCurrentActivity() {
    categoryEl.hidden = true;
    questionEl.hidden = true;
    timerEl.hidden = false;
    main_title.textContent = "Current Activity";
    descriptionEl.textContent = activity.description;
    timeEl.children[0].textContent = getTimeFormat(activity.minutes);
    if ((activity.minutes | 0) === 0 && (activity.seconds | 0) === 0) {
        activity.seconds = 1;
    }
    timeEl.children[2].textContent = getTimeFormat(activity.seconds);
    circleBtn.style.borderColor = getActivityColor();
}

function startActivity(ev) {
    ev.preventDefault();
    if (!activity.completed && !blocked) {
        activity.countdown(timeEl.children[0], timeEl.children[2]);
        let number = activity.minutes * 60 + (activity.seconds | 0);
        setTimeout(toggleCompleteForm, number * 1000, "COMPLETE!");
    }
}

function toggleCompleteForm(mes) {
    blocked = !blocked;
    circleBtn.textContent = mes ? mes : "START";
    logBtn.classList.toggle('hidden');
}


function hidePanelWarning() {
    if (!panel_warning.hidden) {
        panel_warning.hidden = true;
        form_panel.classList.remove("warning");
    }
}

function listenRadio(ev) {
    if (ev.target.classList.contains("input-box")) {
        hidePanelWarning();
    }
}

function checkCategory() {
    let categoryList = form_panel.querySelectorAll("[name='category']");
    for (let category of categoryList) {
        if (category.checked) {
            hidePanelWarning();
            return category.id;
        }
    }
    panel_warning.hidden = false;
    form_panel.classList.add("warning");
    return undefined;
}

function savePast(ev) {
    ev.preventDefault();
    toggleCompleteForm();
    aside_textEl.hidden = true;
    timerEl.hidden = true;
    activity_newEl.hidden = false;
    let section = document.createElement("section");
    section.classList.add("aside__card", "front-style");
    let main = document.createElement("div");
    main.classList.add("aside__main");
    let text = document.createElement("div");
    text.classList.add("aside__main-text");
    let category = document.createElement("div");
    category.classList.add("aside__category");
    category.textContent = activity.category;
    let time = document.createElement("div");
    time.classList.add("aside__time", "text-grey");
    time.textContent = `${activity.minutes} MIN ${activity.seconds} SECONDS`;
    let description = document.createElement("div");
    description.classList.add("aside__description", "text-grey");
    description.textContent = activity.description;
    let line = document.createElement("div");
    line.classList.add("color-line");
    line.style.borderColor = getActivityColor();
    text.appendChild(category);
    text.appendChild(time);
    main.appendChild(text);
    main.appendChild(description);
    section.appendChild(main);
    section.appendChild(line);
    card_boxEl.appendChild(section);
}

function getFormActivity(ev) {
    ev.preventDefault();
    categoryEl.hidden = false;
    questionEl.hidden = false;
    activity_newEl.hidden = true;
}