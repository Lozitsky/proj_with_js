class RecipeRepository {
  constructor(recipeData, ingredientDataRepo) {
    this.recipeData = recipeData;
    this.ingredientDataRepo = ingredientDataRepo;
  }

  getRecipesByTags(...tags) {
    return this.recipeData.filter(recipe => tags.some(el =>
      el === '' ? !recipe.tags.length : recipe.tags.includes(el)));
  }

  getRecipeByName(name) {
    return this.recipeData.find(recipe => recipe.name === name);
  }

  getRecipesByName(name) {
    return this.recipeData.filter(recipe => recipe.name.includes(name));
  }

  getRecipesByIngredients(ingreds) {
    /*    return this.recipes.filter(
      recipe => recipe.getIngredientsNames().some(name => name.includes(ingreds)));*/

    /*    return this.recipes.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
        this.ingredientsData.some(ing => (ing.name || '').includes(name) && ing.id === ingred.id)
    )));*/
    return this.recipeData.filter(recipe => ingreds.every(name => recipe.ingredients.some(ingred =>
      this.ingredientDataRepo.getName(ingred.id).includes(name)
    )));
  }

  getAllIngredients() {
    return this.recipeData.reduce((arr, recipe) => {
      recipe.getIngredients().forEach(ing => {
        let index = arr.findIndex(ingred => ingred.name === ing.name);
        index > -1 ? arr[index].amount += ing.amount : arr.push(ing);
      });
      return arr;
    });
  }

  getAllRecipes() {
    return this.recipeData;
  }

  getAllTags() {
    return this.recipeData.reduce((arr, recipe) => {
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
