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

  getRecipesByIngredients(ingreds) {
    return this.recipes.filter(
      recipe => recipe.getIngredientsNames().some(name => name.includes(ingreds)));
  }

  getAllIngredients() {
    return this.recipes.reduce((arr, recipe) => {
      recipe.getIngredients().forEach(ing => {
        let index = arr.findIndex(ingred => ingred.name === ing.name);
        index > -1 ? arr[index].amount += ing.amount : arr.push(ing);
      });
      return arr;
    });
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
