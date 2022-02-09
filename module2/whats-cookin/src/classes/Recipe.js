import Ingredient from "./Ingredient";

class Recipe {
  constructor(id, ingredientsData, image, ingredients, instructions, name, tags) {
    this.ingredientsData = ingredientsData;
    if (tags === undefined && id !== undefined) {
      this.id = id.id;
      this.image = id.image;
      this.ingredients = id.ingredients;
      this.instructions = id.instructions;
      this.name = id.name;
      this.tags = id.tags;
    } else {
      this.id = id;
      this.image = image;
      this.ingredients = ingredients;
      this.instructions = instructions;
      this.name = name;
      this.tags = tags;
    }
  }

  getIngredientNames() {
    return this.ingredients.map(ingredient => this.ingredientsData.find(ingred => ingred.id === ingredient.id).name);
  }

  getIngredientsCost() {
    return this.ingredients.reduce((sum, ingr) => sum + this.ingredientsData.find(ingred => ingred.id === ingr.id).estimatedCostInCents * ingr.quantity.amount, 0);
  }

  getInstructions() {
    return this.instructions.sort((a, b) => a.number - b.number).map(instruct => instruct.instruction);
  }

  getIngredients() {
    return this.ingredients.map(ingredient => {
      let name = this.ingredientsData.find(ingred => ingred.id === ingredient.id).name;
      return new Ingredient(name, ingredient.quantity.amount, ingredient.quantity.unit);
    });
  }


}

export default Recipe;