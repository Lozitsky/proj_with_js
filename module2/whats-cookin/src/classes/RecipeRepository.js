// import ingredients from '../data/ingredients';
// import recipe from "./Recipe";
const { ingredientsData } = require('../data/ingredients');

class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getRecipesByTags(...tags) {
    return this.recipes.filter(recipe => tags.some(el => 
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getRecipeByName(name) {
    return this.recipes.find(recipe => recipe.name === name);
  }

  getRecipesByIngredients(...ingreds) {
    return this.recipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred => 
      ingred.id === ingredientsData.find(ing => ing.name === name).id)));
  }

}

export default RecipeRepository;
