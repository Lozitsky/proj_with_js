import {modifyIngredients} from "../CallsLocalAPI";

class Pantry {
  constructor(user) {
    this.user = user;
  }

  getAllIngredients() {
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

  addIngredients(id, amount) {
    let userId = localStorage.getItem('userId');
    modifyIngredients(userId, id, amount);
  }

  removeIngredients(id, amount) {
    let userId = localStorage.getItem('userId');
    modifyIngredients(userId, id, amount)
  }

}

export default Pantry;