// import {ingredientsData} from "../data/ingredients";

class ToCookRecipeRepo {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
    this.To_Cook_Key = `favoriteRecipes${localStorage.getItem('userId')}`;
    this.recipesToCook = JSON.parse(localStorage.getItem(this.To_Cook_Key) || '[]');
  }

  add(recipe) {
    if (!this.isInRepoContained(recipe)) {
      this.recipesToCook.push(recipe);
      localStorage.setItem(this.To_Cook_Key, JSON.stringify(this.recipesToCook));
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
      this.removeFrom(this.recipesToCook, recipe, this.To_Cook_Key);
    }
  }

  isInRepoContained(newRecipe) {
    return this.isContained(newRecipe, this.recipesToCook);
  }

  isContained(newRecipe, repo) {
    return repo.some(recipe => recipe.id * 1 === newRecipe.id * 1);
  }

  getRecipesByTags(...tags) {
    return this.recipesToCook.filter(recipe => tags.some(el =>
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getRecipeByName(name) {
    return this.recipesToCook.find(recipe => recipe.name === name);
  }

  getRecipesByName(name) {
    return this.recipesToCook.filter(recipe => recipe.name.includes(name));
  }

  getRecipesByIngredients(...ingreds) {
    return this.recipesToCook.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      this.ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));
  }

  getAllRecipes() {
    return this.recipesToCook;
  }

}

export default ToCookRecipeRepo;