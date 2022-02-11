// import {ingredientsData} from "../data/ingredients";

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

class ToCookRecipeRepo {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
    this.To_Cook_Key = `toCookRecipes${localStorage.getItem('userId')}`;
    this.toCookRecipes = JSON.parse(localStorage.getItem(this.To_Cook_Key) || '[]');
  }

  add(recipe) {
    if (!this.isInRepoContained(recipe)) {
      this.toCookRecipes.push(recipe);
      localStorage.setItem(this.To_Cook_Key, JSON.stringify(this.toCookRecipes));
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
      this.removeFrom(this.toCookRecipes, recipe, this.To_Cook_Key);
    }
  }

  isInRepoContained(newRecipe) {
    return this.isContained(newRecipe, this.toCookRecipes);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id * 1 === newRecipe.id * 1);
  }

  getRecipesByTags(...tags) {
    return this.toCookRecipes.filter(recipe => tags.some(el =>
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getRecipeByName(name) {
    return this.toCookRecipes.find(recipe => recipe.name === name);
  }

  getRecipesByName(name) {
    return this.toCookRecipes.filter(recipe => recipe.name.includes(name));
  }

  getRecipesByIngredients(ingreds) {
    return this.toCookRecipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      this.ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));
  }

  getAllRecipes() {
    return this.toCookRecipes;
  }

}

export default ToCookRecipeRepo;