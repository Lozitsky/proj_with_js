// import {ingredientsData} from "../data/ingredients";

import RecipeRepository from "./RecipeRepository";

/*global.localStorage = {
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
};*/

class FactoryRecipeRepo extends RecipeRepository {

  constructor(key, ingredientDataRepo) {
    super(JSON.parse(localStorage.getItem(`${key}${localStorage.getItem('userId')}`) || '[]'), ingredientDataRepo);
    this.Key = `${key}${localStorage.getItem('userId')}`;
  }

  add(recipe) {
    if (!this.isInRepoContained(recipe)) {
      this.recipeData.push(recipe);
      localStorage.setItem(this.Key, JSON.stringify(this.recipeData));
    }
  }

  removeFrom(arr, recipe, key) {
    let i;
    arr.find((fav, id) => fav.id === recipe.id && (i = id) > -1);
    arr.splice(i, 1);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  remove(recipe) {
    if (this.isInRepoContained(recipe)) {
      this.removeFrom(this.recipeData, recipe, this.Key);
    }
  }

  isInRepoContained(newRecipe) {
    return this.isContained(newRecipe, this.recipeData);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id === newRecipe.id);
  }

}

export default FactoryRecipeRepo;