import './css/styles.css';
import './css/reset.css';
import './images/prototype.webp';
import './images/bender.webp';
import './classes/RecipeRepository'
import RecipeRepository from "./classes/RecipeRepository";
// import apiCalls from './apiCalls';


// Create variables targetting the relevant DOM elements here 👇
// let variables = JSON.parse(localStorage.getItem("variable") || '[]');
const {recipeData} = require('../src/data/recipes');
const recipeRepository = new RecipeRepository(recipeData);
const secRecipes = document.querySelector('.sec-recipes');
const recipesContainer = secRecipes.querySelector('.grid-container');

// Add your event listeners here 👇
document.addEventListener('DOMContentLoaded', showAllCards);

// Create your event handlers and other functions here 👇
/*function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}*/

function injectRecipe(recipe, target) {
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
  target.appendChild(article);
}

function showAllCards() {
  console.log(recipeData);
  clearSecRecipes();
  recipeRepository.getAllRecipes().forEach(recipe => {
    injectRecipe(recipe, recipesContainer);
  });
}

function clearSecRecipes() {
  recipesContainer.innerHTML = '';
}




console.log('Hello world');
