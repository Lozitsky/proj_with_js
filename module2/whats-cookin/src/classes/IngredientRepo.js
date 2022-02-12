class IngredientRepo {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
  }

  getIngredientById(id) {
    return this.ingredientsData.find(ingredient => ingredient.id === id);
  }

  getIngredientByName(name) {
    return this.ingredientsData.find(ingredient => ingredient.name === name);
  }

  getAllIngredients() {
    return this.ingredientsData;
  }
}

export default IngredientRepo;