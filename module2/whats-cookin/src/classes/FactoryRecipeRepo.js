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

  constructor(key) {
    super(JSON.parse(localStorage.getItem(`${key}${localStorage.getItem('userId')}`) || '[]'));
    this.Key = `${key}${localStorage.getItem('userId')}`;
  }

  add(recipe) {
    if (!this.isInRepoContained(recipe)) {
      this.recipes.push(recipe);
      localStorage.setItem(this.Key, JSON.stringify(this.recipes));
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
      this.removeFrom(this.recipes, recipe, this.Key);
    }
  }

  isInRepoContained(newRecipe) {
    return this.isContained(newRecipe, this.recipes);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id === newRecipe.id);
  }

}

export default FactoryRecipeRepo;