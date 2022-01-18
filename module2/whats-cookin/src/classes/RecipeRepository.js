// import ingredients from '../data/ingredients';
// import recipe from "./Recipe";

const {ingredientsData} = require('../data/ingredients');

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

  getRecipesByName(name) {
    return this.recipes.filter(recipe => recipe.name.includes(name));
  }

  getRecipesByIngredients(...ingreds) {
    return this.recipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));
  }

  getAllRecipes() {
    return this.recipes;
  }

  getAllTags() {
    return this.recipes.reduce((arr, recipe) => {
      recipe.tags.forEach(tag => {
        if (!arr.includes(tag)) {
          arr.push(tag);
        }
      });
      return arr;
    }, []);
  }
}

export default RecipeRepository;
