import {ingredientsData} from "../data/ingredients";

global.localStorage = {
  data: {},
  getItem(key) {
    const val = this.data[key]
    if (val) {
      return val
    }
    return null
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  }
};

class RecipeRepoFactory {
  constructor() {
    this.favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    this.recipesToCook = JSON.parse(localStorage.getItem('recipesToCook') || '[]');
  }

  addToFavorite(recipe) {
    if (!this.isInFavoriteContained(recipe)) {
      this.favoriteRecipes.push(recipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes));
    }
  }

  addToCook(recipe) {
    if (!this.isInCookContained(recipe)) {
      this.recipesToCook.push(recipe);
      localStorage.setItem('recipesToCook', JSON.stringify(this.recipesToCook));
    }
  }

  removeFromFavorite(recipe) {
    if (this.isInFavoriteContained(recipe)) {
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(r => r.id === recipe.id), 1);
      console.log(JSON.stringify(this.favoriteRecipes));
      localStorage.setItem('favoriteRecipes', JSON.stringify(this.favoriteRecipes));
    }
  }

  removeFromCook(recipe) {
    if (this.isInCookContained(recipe)) {
      this.recipesToCook.splice(this.recipesToCook.indexOf(r => r.id === recipe.id), 1);
      localStorage.setItem('recipesToCook', JSON.stringify(this.recipesToCook));
    }
  }

  isInFavoriteContained(newRecipe) {
    return this.isContained(newRecipe, this.favoriteRecipes);
  }

  isInCookContained(newRecipe) {
    return this.isContained(newRecipe, this.recipesToCook);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id === newRecipe.id);
  }

  getFavoriteRecipesByTags(...tags) {
    return this.favoriteRecipes.filter(recipe => tags.some(el =>
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getFavoriteRecipeByName(name) {
    return this.favoriteRecipes.find(recipe => recipe.name === name);
  }

  getFavoriteRecipesByName(name) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(name));
  }

  getFavoriteRecipesByIngredients(...ingreds) {
    return this.favoriteRecipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));
  }

}

const recipeRepoFactoryInstance = new RecipeRepoFactory();
Object.freeze(recipeRepoFactoryInstance);


export default recipeRepoFactoryInstance;