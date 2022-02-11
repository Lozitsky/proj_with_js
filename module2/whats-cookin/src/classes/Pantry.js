class Pantry {
  constructor(user, ingredients) {
    this.user = user;
    this.ingredients = ingredients;
  }

  getAllIngredients() {
/*    return this.user.pantry.map(unit =>
      this.ingredients.find(ingredient => ingredient.id === unit.ingredient).name
    );*/
    return this.user.pantry;
  }

  hasIngredients(recipe) {
    return recipe.ingredients.reduce((acc, ingr) => acc && ingr.quantity.amount <= this.user.pantry.find(ingred => ingred.ingredient === ingr.id).amount);
  }

  getMissingIngredients(recipe) {
    return recipe.ingredients.reduce((arr, ingr) => {
      let amount = ingr.quantity.amount - this.user.pantry.find(ingred => ingred.ingredient === ingr.id).amount;
      if (amount > 0) {
        arr.push({id: `${ingr.id}`, amount: `${amount}`});
      }
      return arr;
    });
  }

  addIngredients(ingredients) {
  }

}

export default Pantry;