import './css/styles.css';
import './css/reset.css';
import './images/prototype.webp';
import './images/bender.webp';
import './images/search.svg';
import './classes/RecipeRepository'
import RecipeRepository from "./classes/RecipeRepository";
import Recipe from "./classes/Recipe";
// import apiCalls from './apiCalls';


// Create variables targetting the relevant DOM elements here 👇
// let variables = JSON.parse(localStorage.getItem("variable") || '[]');
const {recipeData} = require('../src/data/recipes');
const recipeRepository = new RecipeRepository(recipeData);
const secRecipes = document.querySelector('.sec-recipes');
const recipesContainer = secRecipes.querySelector('.grid-container');
const details = document.querySelector('#details');
const input = document.querySelector('#search');
const name = document.querySelector('#name');
const ingredients = document.querySelector('#ingredients');
const searchTitle = document.querySelector('.sec-search__title');
const sectionCheckboxes = document.querySelector('.aside-tags__checkboxes');
const searchTagsButton = document.querySelector('.aside-tags__button');

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', loadContent);
input.addEventListener('input', findByText);
ingredients.addEventListener('click', () => (changeTitleTo('ingredients')));
name.addEventListener('click', () => (changeTitleTo('name')));
searchTagsButton.addEventListener('click', findByTags);
// asideTags.addEventListener('')
// Create your event handlers and other functions here 👇
/*function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}*/

function findByTags(ev) {
  ev.preventDefault();
  clearSecRecipes();

  let checkboxes = sectionCheckboxes.querySelectorAll('input[type=checkbox]');
  let filter = Array.prototype.slice.call(checkboxes).filter(checkbox => checkbox.checked).map(input => input.name);
  recipeRepository.getRecipesByTags(...filter).forEach(check => injectRecipe(check, recipesContainer));

}

function changeTitleTo(str) {
  searchTitle.textContent = `Find by ${str}`;
  input.focus();
}

function findByText() {
  clearSecRecipes();
  let recipeList;
  if (searchTitle.textContent.includes('name')) {
    recipeList = recipeRepository.getRecipesByName(input.value);
  } else {
    recipeList = recipeRepository.getRecipesByIngredients(...input.value.split(' '));
  }
  recipeList.forEach(recipe => {
    injectRecipe(recipe, recipesContainer);
  });
}

function createDetails(data) {
  let recipe = new Recipe(data);
  details.innerHTML = '';
  details.classList.add('popup');
  let area = document.createElement('a');
  area.classList.add('popup__area');
  area.setAttribute('href', '#');
  let body = document.createElement('article');
  body.classList.add('popup__body');
  let content = document.createElement('section');
  content.classList.add('popup__content');
  let close = document.createElement('a');
  close.classList.add('popup__close');
  close.setAttribute('href', '#');
  close.textContent = 'X';
  let title = document.createElement('section');
  title.classList.add('popup__title');
  title.textContent = recipe.name;
  let cost = document.createElement('h3');
  cost.textContent = `Total cost: $${Math.round((recipe.getIngredientsCost() + Number.EPSILON)) / 100}`;
  let h2 = document.createElement('h2');
  h2.textContent = 'Ingredients';
  let ingredients = document.createElement('section');
  let ul = document.createElement('ul');
  recipe.getIngredients().forEach(ingredient => {
    let li = document.createElement('li');
    li.textContent = `${ingredient.name}: ${ingredient.amount} ${ingredient.unit}`;
    ul.appendChild(li);
  });
  ingredients.appendChild(ul);
  let instructions = document.createElement('section');
  instructions.classList.add('popup__text');
  recipe.getInstructions().forEach((instruction, i) => {
    let p = document.createElement('p');
    p.textContent = `${(i + 1)}. ${instruction}`;
    instructions.appendChild(p);
  });
  content.appendChild(close);
  content.appendChild(title);
  content.appendChild(cost);
  content.appendChild(h2);
  content.appendChild(ingredients);
  content.appendChild(instructions);
  body.appendChild(content);
  details.appendChild(area);
  details.appendChild(body);
}

function injectRecipe(recipe, target) {
  let a = document.createElement('a');
  a.classList.add('popup-link');
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
  section.appendChild(img);
  section.appendChild(p);
  article.appendChild(section);
  a.appendChild(article);
  a.addEventListener('click', () => createDetails(recipe));
  target.appendChild(a);
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

function loadContent() {
  showTags();
  showAllCards();
}

function showTags() {
  sectionCheckboxes.innerHTML = '';
  let tags = recipeRepository.getAllTags();
  console.log(tags);
  tags.forEach(tag => {
    injectTag(tag, sectionCheckboxes);
  });
}

function showAllCards() {
  clearSecRecipes();
  recipeRepository.getAllRecipes().forEach(recipe => {
    injectRecipe(recipe, recipesContainer);
  });
}

function clearSecRecipes() {
  recipesContainer.innerHTML = '';
}