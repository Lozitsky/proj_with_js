// In v1 API we have 3 endpoints with ingredients data:
// 1) ingredients(id, name, estimatedCostInCents) - all possible ingredients;
// 2) users.pantry(ingredient, amount) - part of ingredients data;
// 3) recipes.ingredients(id, quantity.amount, quantity.unit) -
// part of ingredients data, but it has additional info named 'unit'.
class IngredientDataRepo {
  constructor(ingredientsData) {
    this.ingredientsData = ingredientsData;
  }

  getById(id) {
    return this.ingredientsData.find(ingredient => ingredient.id === id);
  }

  getByName(name) {
    return this.ingredientsData.find(ingredient => ingredient.name === name);
  }

  getName(id) {
    return this.getById(id).name;
  }

  getAll() {
    return this.ingredientsData;
  }

  isContained(name) {
    return this.ingredientsData.some(ing => (ing.name || '').includes(name))
  }
}

export default IngredientDataRepo;