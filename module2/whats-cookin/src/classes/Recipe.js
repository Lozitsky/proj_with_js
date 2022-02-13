import Ingredient from "./Ingredient";

class Recipe {
  constructor(id, ingredientDataRepo, image, ingredients, instructions, name, tags) {
    this.ingredientDataRepo = ingredientDataRepo;
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

  getIngredientsNames() {
    return this.ingredients.map(ingredient => this.ingredientDataRepo.getName(ingredient.id));
  }

  getIngredientsCost() {
    return this.ingredients.reduce((sum, ingr) => sum + this.ingredientDataRepo.getAll().find(ingred => ingred.id === ingr.id).estimatedCostInCents * ingr.quantity.amount, 0);
  }

  getInstructions() {
    return this.instructions.sort((a, b) => a.number - b.number).map(instruct => instruct.instruction);
  }

  getIngredients() {
    return this.ingredients.map(ingredient =>
      new Ingredient(this.ingredientDataRepo.getName(ingredient.id), ingredient.quantity.amount, ingredient.quantity.unit)
    );
  }

}

export default Recipe;