class IngredientRepository {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
  }

  getIngredientById(id) {
    return this.ingredientsData.find(ingredient => ingredient.id === id);
  }

  getIngredientByName(name) {
    return this.ingredientsData.find(ingredient => ingredient.name === name);
  }
}

export default IngredientRepository;