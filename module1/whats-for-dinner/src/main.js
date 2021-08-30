// Create variables targetting the relevant DOM elements here 👇
const main = document.querySelector("main");
let mealForm = main.children[0].querySelector("form");
const showSection = main.children[1];
const recipeBar = main.children[2];
const cookBtn = mealForm.querySelector("[type='submit']");
const clearBtn = showSection.querySelector("[type='reset']");
const addRecipeBtn = document.querySelector("header button");
const addNewBtn = recipeBar.querySelector("[type='submit']");

// Add your event listeners here 👇
cookBtn.addEventListener('click', makeMeal);
clearBtn.addEventListener('click', clearMeal);
addRecipeBtn.addEventListener('click', addRecipeBar);
addNewBtn.addEventListener('click', addNewRecipe);

// Create your event handlers and other functions here 👇

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function getSelectedId() {
    let list = mealForm.querySelectorAll("[name='meal']");
    for (let meal of list) {
        if (meal.checked) {
            return meal.id;
        }
    }
    return undefined;
}

function getRandomMeal(meal_id) {
    if (meal_id === "Entire Meal") {
        return [sides[getRandomIndex(sides)], mains[getRandomIndex(mains)], desserts[getRandomIndex(desserts)]];
    } else {
        return meal_id || allMeals[meal_id] ? allMeals[meal_id][getRandomIndex(allMeals[meal_id])] : undefined;
    }
}

function showInfoBox() {
    showSection.children[0].hidden = true;
    for (let i = 1; i < showSection.children.length; i++) {
        showSection.children[i].hidden = false;
    }
}

function showMealInfo(meal) {
    clearP();
    showSection.children[2].textContent = `${meal}!`;
}

function makeMeal(event) {
    event.preventDefault();
    let randomMeal = getRandomMeal(getSelectedId());
    if (!randomMeal) {
        return undefined;
    }
    showInfoBox();

    if (typeof randomMeal === "string") {
        showMealInfo(randomMeal);
    } else {
        clearSpan();
        // showSection.children[3].textContent = `${mains[7]} with a side of ${sides[0]} and ${desserts[1]} for desert!`;
        showSection.children[3].textContent = `${randomMeal[1]} with a side of ${randomMeal[0]} and ${randomMeal[2]} for desert!`;
    }
    return randomMeal;
}

function toggleVisibility() {
    let isImgHidden = showSection.children[0].hidden;
    showSection.children[0].hidden = !isImgHidden;
    for (let i = 1; i < showSection.children.length; i++) {
        showSection.children[i].hidden = isImgHidden;
    }
}

function clearMeal() {
    toggleVisibility();
    clearSpan();
    clearP();
}

function clearSpan() {
    showSection.children[2].textContent = '';
}

function clearP() {
    showSection.children[3].textContent = '';
}

function addRecipeBar() {
    recipeBar.hidden = false;
}

function putNewRecipe(type, name) {
    if (allMeals.hasOwnProperty(type)) {
        if (!allMeals[type].includes(name)) {
            allMeals[type].push(name);
            return true;
        }
    }
    alert(`The "${type}" type is incorrect!`);
    return false;
}

function getRecipeType() {
    let type = recipeBar.querySelector("[name='type']");
    return type.value;
}

function getRecipeName() {
    return recipeBar.querySelector("[name='name']").value;
}

function addNewRecipe(event) {
    event.preventDefault();
    let recipeType = getRecipeType();
    let recipeName = getRecipeName();
    if (recipeType && recipeName && putNewRecipe(recipeType, recipeName)) {
        showInfoBox();
        showMealInfo(recipeName);
    }
}