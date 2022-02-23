import CallsLocalAPI from "../CallsLocalAPI";

class Pantry {
  constructor(user) {
    this.pantry = user.pantry;
  }

  getIngredients() {
    return this.pantry;
  }

  setIngredients(pantry) {
    return this.pantry = pantry;
  }

  getAmountById(id) {
    if (this.pantry !== undefined) {
      let find = this.pantry.find(unit => unit.ingredient === id);
      if (find !== undefined) {
        return find.amount;
      }
    }
    return 0;
  }

  hasIngredients(recipe) {
    return recipe.ingredients.reduce((acc, ingr) => acc && ingr.quantity.amount <= this.getAmountById(ingr.id));
  }

  getMissingIngredients(recipe) {
    return recipe.ingredients.reduce((arr, ingr) => {
      let amount = ingr.quantity.amount - this.pantry.find(ingred => ingred.ingredient === ingr.id).amount;
      if (amount > 0) {
        arr.push({id: `${ingr.id}`, amount: `${amount}`});
      }
      return arr;
    });
  }

  addIngredients(id, amount) {
    let userId = localStorage.getItem('userId');
    CallsLocalAPI.modifyIngredients(userId, id, amount);
  }

  removeIngredients(id, amount) {
    let userId = localStorage.getItem('userId');
    CallsLocalAPI.modifyIngredients(userId, id, amount)
  }

}

export default Pantry;