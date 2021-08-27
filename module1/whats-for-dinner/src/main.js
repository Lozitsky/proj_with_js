// Create variables targetting the relevant DOM elements here 👇
const cookBtn = document.querySelector("[type='submit']");
const clearBtn = document.querySelector("[type='reset']");
const form = document.querySelector("form");
const main = document.querySelector("main");
const mealSection = main.lastElementChild;

// Add your event listeners here 👇
cookBtn.addEventListener('click', makeMeal);
clearBtn.addEventListener('click', clearMeal);

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
        case 'meal4':
            return [sides[getRandomIndex(sides)], mains[getRandomIndex(mains)], desserts[getRandomIndex(desserts)]];
        default:
            return undefined;
    }
}

function makeMeal(event) {
    event.preventDefault();
    let randomMeal = getRandomMeal(getSelectedId());
    if (!randomMeal) {
        return undefined;
    }

    mealSection.children[0].hidden = true;
    for (let i = 1; i < mealSection.children.length; i++) {
        mealSection.children[i].hidden = false;
    }
    // toggleVisibility();

    if (typeof randomMeal === "string") {
        clearP();
        mealSection.children[2].textContent = `${randomMeal}!`;
    } else {
        clearSpan();
        // mealSection.children[3].textContent = `${mains[7]} with a side of ${sides[0]} and ${desserts[1]} for desert!`;
        mealSection.children[3].textContent = `${randomMeal[1]} with a side of ${randomMeal[0]} and ${randomMeal[2]} for desert!`;
    }
    return randomMeal;
}

function toggleVisibility() {
    let isImgHidden = mealSection.children[0].hidden;
    mealSection.children[0].hidden = !isImgHidden;
    for (let i = 1; i < mealSection.children.length; i++) {
        mealSection.children[i].hidden = isImgHidden;
    }
}

function clearMeal() {
    toggleVisibility();
    clearSpan();
    clearP();
}

function clearSpan() {
    mealSection.children[2].textContent = '';
}

function clearP() {
    mealSection.children[3].textContent = '';
}
