import './css/styles.css';
import './css/reset.css';
import './images/prototype.webp';
import './images/bender.webp';
import './images/search.svg';
import './images/star.svg';
import './images/add.svg';
import './classes/RecipeRepository'
import RecipeRepository from "./classes/RecipeRepository";
import Recipe from "./classes/Recipe";
import FactoryRecipeRepo from "./classes/FactoryRecipeRepo";
import IngredientDataRepo from "./classes/IngredientDataRepo";
import UserRepository from "./classes/UserRepository";
import CallsLocalAPI from "./CallsLocalAPI";
import callsLocalAPI from "./CallsLocalAPI";
import Pantry from "./classes/Pantry";

// Create variables targetting the relevant DOM elements here 👇
let userRepo, currentRepo, recipeRepository, favoriteRecipeRepo, toCookRecipeRepo, ingredientDataRepo;
let user;
const secRecipes = document.querySelector('.sec-recipes');
const recipesContainer = secRecipes.querySelector('.grid-container');
const details = document.querySelector('#details');
const input = document.querySelector('#search');
const name = document.querySelector('#name');
const ingredients = document.querySelector('#ingredients');
const searchTitle = document.querySelector('.sec-search__title');
const sectionCheckboxes = document.querySelector('.aside-tags__checkboxes');
const searchTagsButton = document.querySelector('.aside-tags__button');
const favBtn = document.querySelector('.fav-link');
const toCookBtn = document.querySelector('.to-cook-link');
// const popupTable = document.querySelector('.popup__table');

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', loadContent);
// window.addEventListener('load', loadContent);
input.addEventListener('input', findByText);
ingredients.addEventListener('click', () => (changeTitleTo('ingredients')));
name.addEventListener('click', () => (changeTitleTo('name')));
searchTagsButton.addEventListener('click', findByTags);
favBtn.addEventListener('click', toggleFavorite);
toCookBtn.addEventListener('click', toggleToCook);

// Create your event handlers and other functions here 👇
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function toggleFavorite() {
  if (favBtn.innerText === 'show all recipes'.toUpperCase()) {
    showAllRecipes();
  } else if (favBtn.innerText === 'show favorite recipes'.toUpperCase()) {
    showFavorites();
  }
}

function toggleToCook() {
  if (toCookBtn.innerText === 'show to cook recipes'.toUpperCase()) {
    showToCook();
  } else if (toCookBtn.innerText === 'show favorite recipes'.toUpperCase()) {
    showFavorites();
  }
}

function findByTags(ev) {
  ev.preventDefault();
  clearSecRecipes();

  let checkboxes = sectionCheckboxes.querySelectorAll('input[type=checkbox]');
  let filter = Array.prototype.slice.call(checkboxes).filter(checkbox => checkbox.checked).map(input => input.name);
  currentRepo.getRecipesByTags(...filter).forEach(check => injectRecipe(check, recipesContainer));
}

function changeTitleTo(str) {
  searchTitle.textContent = `Find by ${str}`;
  input.focus();
}

function findByText() {
  clearSecRecipes();
  let recipeList;
  if (searchTitle.textContent.includes('name')) {
    recipeList = currentRepo.getRecipesByName(input.value);
  } else {
    recipeList = currentRepo.getRecipesByIngredients(input.value.split(' '));
  }
  recipeList.forEach(recipe => {
    injectRecipe(recipe, recipesContainer);
  });
}

function convertToDollars(cost) {
  return Math.round((cost + Number.EPSILON)) / 100;
}

function addIngredients(ev, input, pantry) {
  ev.preventDefault();
  let ingredientModification = input.value - pantry.getAmountById(input.name | 0);
  CallsLocalAPI.modifyIngredients(user, input.name | 0, ingredientModification > 0 ? ingredientModification : 0).then(r => {
    console.log(r);
    pantry.setIngredients(user.pantry);
    input.min = input.value = pantry.getAmountById(input.name | 0);
  });
}

/*function checkInput(input, pantry) {
  input.min = pantry.getAmountById(input.name | 0);
  if (input.value < input.min) {
    input.value = input.min;
  }
}*/

function createTable(recipe, pantry, table) {
  recipe.getIngredients().forEach(ingredient => {
    let cell = document.createElement('span');
    cell.classList.add('popup__ingredient');
    cell.textContent = `${ingredient.name}:`;
    let cell2 = document.createElement('span');
    cell2.classList.add('popup__ingredient');
    cell2.textContent = `${ingredient.amount} ${ingredient.unit}`;
    let input = document.createElement('input');
    input.classList.add('popup__ingredient');
    input.type = 'number';
    input.size = 3;
    input.min = input.value = pantry.getAmountById(ingredient.id);
    input.max = '1000';
    input.name = ingredient.id;
    // input.addEventListener('change', () => checkInput(input, pantry));
    let addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.addEventListener('click', (ev) => addIngredients(ev, input, pantry));
    table.appendChild(cell);
    table.appendChild(cell2);
    table.appendChild(input);
    table.appendChild(addBtn);
  });
}

function createInstructions(recipe, instructions) {
  recipe.getInstructions().forEach((instruction, i) => {
    let p = document.createElement('p');
    p.textContent = `${(i + 1)}. ${instruction}`;
    instructions.appendChild(p);
  });
}

function cookRecipe(ev, recipe, pantry, table) {
  ev.preventDefault();

  if (pantry.hasIngredients(recipe)) {
    recipe.getIngredients().forEach(ingredient => {
      callsLocalAPI.modifyIngredients(user, ingredient.id, -ingredient.amount)
        .then(r => {
          console.log(r);
          let inputs = table.querySelectorAll('input');
          for (const input of inputs) {
            if ((input.name | 0) === ingredient.id) {
              pantry.setIngredients(user.pantry);
              input.min = input.value = pantry.getAmountById(ingredient.id);
              return;
            }
          }
        });
    });
  }

}

function createDetails(data) {
  let recipe = new Recipe(data, ingredientDataRepo);
  console.log(user);
  let pantry = new Pantry(user);
  console.log(pantry);
  details.innerHTML = '';
  details.classList.add('popup');
  let area = document.createElement('a');
  area.classList.add('popup__area');
  area.setAttribute('href', '#');
  let body = document.createElement('article');
  body.classList.add('popup__body');
  // let content = document.createElement('section');
  let content = document.createElement('form');
  content.classList.add('popup__content');
  let close = document.createElement('a');
  close.classList.add('popup__close');
  close.setAttribute('href', '#');
  close.textContent = 'X';
  let title = document.createElement('section');
  title.classList.add('popup__title');
  title.textContent = recipe.name;
  let cost = document.createElement('h3');
  cost.textContent = `Total cost: $${convertToDollars(recipe.getIngredientsCost())}`;
  let h2 = document.createElement('h2');
  h2.classList.add('popup__subtitle');
  h2.textContent = 'Ingredients';
  let ingredients = document.createElement('section');
  ingredients.classList.add('popup__ingredients');
  let table = document.createElement('section');
  table.classList.add('popup__table');
  createTable(recipe, pantry, table);
  ingredients.appendChild(table);
  let instructions = document.createElement('section');
  instructions.classList.add('popup__text');
  createInstructions(recipe, instructions);
  let cookBtn = document.createElement('button');
  cookBtn.classList.add('popup__btn-cook');
  cookBtn.textContent = 'Cook';
  cookBtn.addEventListener('click', (ev) => cookRecipe(ev, recipe, pantry, table));
  content.appendChild(close);
  content.appendChild(title);
  content.appendChild(cost);
  content.appendChild(h2);
  content.appendChild(ingredients);
  content.appendChild(instructions);
  content.appendChild(cookBtn);
  body.appendChild(content);
  details.appendChild(area);
  details.appendChild(body);
}

function switchFavorite(recipe, svg) {
  switchSelected(recipe, favoriteRecipeRepo, svg, 'card__star-full');
}

function switchToCook(recipe, svg) {
  switchSelected(recipe, toCookRecipeRepo, svg, 'card__add-full');
}

function switchSelected(recipe, repo, svg, img_class) {
  svg.classList.contains(img_class) ? svg.classList.remove(img_class) : svg.classList.add(img_class);
  repo.isInRepoContained(recipe) ? repo.remove(recipe) : repo.add(recipe);
}

function injectRecipe(recipe, target) {
  let a = document.createElement('a');
  a.classList.add('card__popup-link');
  a.setAttribute('href', '#details');

  let article = document.createElement('article');
  article.classList.add('card');

  let section = document.createElement('section');
  section.classList.add('card__label');

  let img = document.createElement('img');
  img.classList.add('card__img');
  img.setAttribute('src', recipe.image);
  img.setAttribute('alt', 'no image available');

  let p = document.createElement('p');
  p.classList.add('card__name');
  p.textContent = recipe.name;

  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add('card__star');
  favoriteRecipeRepo.isInRepoContained(recipe) ? svg.classList.add('card__star-full') : '';
  svg.addEventListener('click', () => switchFavorite(recipe, svg));
  let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttributeNS(null, 'href', 'images/star.svg#star');

  let svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg2.classList.add('card__add');
  toCookRecipeRepo.isInRepoContained(recipe) ? svg2.classList.add('card__add-full') : '';
  svg2.addEventListener('click', () => switchToCook(recipe, svg2));
  let use2 = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use2.setAttributeNS(null, 'href', 'images/add.svg#add');

  section.appendChild(img);
  section.appendChild(p);
  a.appendChild(section);
  a.addEventListener('click', () => createDetails(recipe));
  svg.appendChild(use);
  svg2.appendChild(use2);
  article.appendChild(a);
  article.appendChild(svg)
  article.appendChild(svg2)
  target.appendChild(article);
}

function injectTag(tag, target) {
  let section = document.createElement('section');
  section.classList.add('block-form__input');
  let label = document.createElement('label');
  label.classList.add('checkbox');
  let input = document.createElement('input');
  input.setAttribute('name', tag);
  input.setAttribute('type', 'checkbox');
  let span = document.createElement('span');
  span.classList.add('checkmark');
  span.textContent = tag;
  label.appendChild(input);
  label.appendChild(span);
  section.appendChild(label);
  target.appendChild(section);
}

function initData(usersData, ingredientsData, recipeData) {
  userRepo = new UserRepository(usersData);
  user = userRepo.getUserById(getRandomIndex(usersData));

  ingredientDataRepo = new IngredientDataRepo(ingredientsData);

  favoriteRecipeRepo = new FactoryRecipeRepo('favoriteRecipes', ingredientDataRepo);
  Object.freeze(favoriteRecipeRepo);
  toCookRecipeRepo = new FactoryRecipeRepo('toCookRecipes', ingredientDataRepo);
  Object.freeze(toCookRecipeRepo);
  recipeRepository = new RecipeRepository(recipeData, ingredientDataRepo);
}

function loadContent() {
  // // https://marcrodrigfelix.github.io/fetch_request_with_a_js_class
  Promise.all([CallsLocalAPI.getAllUsers(), CallsLocalAPI.getAllRecipes(), CallsLocalAPI.getAllIngredients()])
    .then(([usersData, recipeData, ingredientsData]) => {
      initData(usersData, ingredientsData, recipeData);
      showTags();
      showAllRecipes();
    });
}

function showTags() {
  sectionCheckboxes.innerHTML = '';
  let tags = recipeRepository.getAllTags();
  tags.forEach(tag => {
    injectTag(tag, sectionCheckboxes);
  });
}

function showAllRecipes() {
  favBtn.innerText = 'show favorite recipes'.toUpperCase();
  toCookBtn.innerText = 'show to cook recipes'.toUpperCase();
  currentRepo = recipeRepository;
  showRecipes();
}

function showFavorites() {
  favBtn.innerText = 'show all recipes'.toUpperCase();
  toCookBtn.innerText = 'show to cook recipes'.toUpperCase();
  currentRepo = favoriteRecipeRepo;
  showRecipes();
}

function showToCook() {
  favBtn.innerText = 'show all recipes'.toUpperCase();
  toCookBtn.innerText = 'show favorite recipes'.toUpperCase();
  currentRepo = toCookRecipeRepo;
  showRecipes();
}

function showRecipes() {
  clearSecRecipes();
  currentRepo.getAllRecipes().forEach(recipe => {
    injectRecipe(recipe, recipesContainer)
  });
}

function clearSecRecipes() {
  recipesContainer.innerHTML = '';
}