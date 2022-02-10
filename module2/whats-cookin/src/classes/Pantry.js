
class Pantry {
  constructor(user, ingredients) {
    this.user = user;
    this.ingredients = ingredients;
  }

  getAllIngredients() {
    return this.ingredients;
  }

  hasIngredients(recipe) {
    return recipe.ingredients.reduce((acc, ingr) => acc && ingr.quantity.amount <= this.user.pantry.amount);
  }
}

export default Pantry;