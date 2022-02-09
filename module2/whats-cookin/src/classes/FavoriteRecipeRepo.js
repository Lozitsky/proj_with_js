// import {ingredientsData} from "../data/ingredients";

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

// let Favorite_Key;

class FavoriteRecipeRepo {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
    this.Favorite_Key = `favoriteRecipes${localStorage.getItem('userId')}`;
    this.favoriteRecipes = JSON.parse(localStorage.getItem(this.Favorite_Key) || '[]');
  }

  add(recipe) {
    if (!this.isInRepoContained(recipe)) {
      this.favoriteRecipes.push(recipe);
      localStorage.setItem(this.Favorite_Key, JSON.stringify(this.favoriteRecipes));
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
      this.removeFrom(this.favoriteRecipes, recipe, this.Favorite_Key);
    }
  }

  isInRepoContained(newRecipe) {
    return this.isContained(newRecipe, this.favoriteRecipes);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id * 1 === newRecipe.id * 1);
  }

  getRecipesByTags(...tags) {
    return this.favoriteRecipes.filter(recipe => tags.some(el =>
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getRecipeByName(name) {
    return this.favoriteRecipes.find(recipe => recipe.name === name);
  }

  getRecipesByName(name) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(name));
  }

  getRecipesByIngredients(ingreds) {
    return this.favoriteRecipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      this.ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));
  }

  getAllRecipes() {
    return this.favoriteRecipes;
  }

}

// const recipeRepoFactoryInstance = new RecipeRepoFactory();
// Object.freeze(recipeRepoFactoryInstance);
//
//
// export default recipeRepoFactoryInstance;

export default FavoriteRecipeRepo;