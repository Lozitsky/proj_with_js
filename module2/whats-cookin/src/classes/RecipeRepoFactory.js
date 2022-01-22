import {ingredientsData} from "../data/ingredients";

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

let Favorite_Key;
let To_Cook_Key;

class RecipeRepoFactory {
  constructor() {
    Favorite_Key = `favoriteRecipes${localStorage.getItem('userId')}`;
    To_Cook_Key = `favoriteRecipes${localStorage.getItem('userId')}`;
    this.favoriteRecipes = JSON.parse(localStorage.getItem(Favorite_Key) || '[]');
    this.recipesToCook = JSON.parse(localStorage.getItem(To_Cook_Key) || '[]');
  }

  addToFavorite(recipe) {
    if (!this.isInFavoriteContained(recipe)) {
      this.favoriteRecipes.push(recipe);
      localStorage.setItem(Favorite_Key, JSON.stringify(this.favoriteRecipes));
    }
  }

  addToCook(recipe) {
    if (!this.isInCookContained(recipe)) {
      this.recipesToCook.push(recipe);
      localStorage.setItem(To_Cook_Key, JSON.stringify(this.recipesToCook));
    }
  }

  removeFrom(arr, recipe, key) {
    let i;
    arr.find((fav, id) => fav.id === recipe.id && (i = id) > -1);
    arr.splice(i, 1);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  removeFromFavorite(recipe) {
    if (this.isInFavoriteContained(recipe)) {
      this.removeFrom(this.favoriteRecipes, recipe, Favorite_Key);
    }
  }

  removeFromCook(recipe) {
    if (this.isInCookContained(recipe)) {
      this.removeFrom(this.recipesToCook, recipe, To_Cook_Key);
    }
  }

  isInFavoriteContained(newRecipe) {
    return this.isContained(newRecipe, this.favoriteRecipes);
  }

  isInCookContained(newRecipe) {
    return this.isContained(newRecipe, this.recipesToCook);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id * 1 === newRecipe.id * 1);
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

// const recipeRepoFactoryInstance = new RecipeRepoFactory();
// Object.freeze(recipeRepoFactoryInstance);
//
//
// export default recipeRepoFactoryInstance;

export default RecipeRepoFactory;