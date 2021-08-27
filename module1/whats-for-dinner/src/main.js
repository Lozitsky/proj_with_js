// Create variables targetting the relevant DOM elements here 👇
const cookButton = document.querySelector("[type='submit']");
const form = document.querySelector("form");
const main = document.querySelector("main");

// Add your event listeners here 👇
cookButton.addEventListener('click', makeMeal);

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getSelectedId() {
    let list = form.querySelectorAll("[name='meal']");
    for (let meal of list) {
        if (meal.checked) {
            return meal.id;
        }
    }
    return undefined;
}

function getRandomMeal(meal_id) {
    switch (meal_id) {
        case 'meal1':
            return sides[getRandomIndex(sides)];
        case 'meal2':
            return mains[getRandomIndex(mains)];
        case 'meal3':
            return desserts[getRandomIndex(desserts)];
        default:
            return undefined;
    }
}

function makeMeal(event) {
    event.preventDefault();
    let randomMeal = getRandomMeal(getSelectedId());
    main.lastElementChild.innerHTML = `<em>You should make:</em><span>${randomMeal}!</span><button type="reset">CLEAR</button>`;
    return randomMeal;
}