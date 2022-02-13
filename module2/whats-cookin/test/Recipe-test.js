import {expect} from "chai";
import Recipe from "../src/classes/Recipe";
import {ingredientsData} from "../src/data/ingredients";

const ingredients = [
  {
    "id": 20081,
    "quantity": {
      "amount": 1.5,
      "unit": "c"
    }
  },
  {
    "id": 18372,
    "quantity": {
      "amount": 0.5,
      "unit": "tsp"
    }
  },
  {
    "id": 1123,
    "quantity": {
      "amount": 1,
      "unit": "large"
    }
  },
  {
    "id": 19335,
    "quantity": {
      "amount": 0.5,
      "unit": "c"
    }
  },
  {
    "id": 19206,
    "quantity": {
      "amount": 3,
      "unit": "Tbsp"
    }
  },
  {
    "id": 19334,
    "quantity": {
      "amount": 0.5,
      "unit": "c"
    }
  },
  {
    "id": 2047,
    "quantity": {
      "amount": 0.5,
      "unit": "tsp"
    }
  },
  {
    "id": 1012047,
    "quantity": {
      "amount": 24,
      "unit": "servings"
    }
  },
  {
    "id": 10019903,
    "quantity": {
      "amount": 2,
      "unit": "c"
    }
  },
  {
    "id": 1145,
    "quantity": {
      "amount": 0.5,
      "unit": "c"
    }
  },
  {
    "id": 2050,
    "quantity": {
      "amount": 0.5,
      "unit": "tsp"
    }
  }
];

const recipe1 = {
  ingredientsData,
  "id": 595736,
  "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
  ingredients,
  "instructions": [
    {
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    },
    {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    },
    {
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "number": 3
    },
    {
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "number": 4
    },
    {
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "number": 5
    },
    {
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
      "number": 6
    }
  ],
  "name": "Loaded Chocolate Chip Pudding Cookie Cups",
  "tags": [
    "antipasti",
    "starter",
    "snack",
    "appetizer",
    "antipasto",
    "hor d'oeuvre"
  ]
};
const instructions = [
  {
    "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
    "number": 1
  },
  {
    "instruction": "Add egg and vanilla and mix until combined.",
    "number": 2
  },
  {
    "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
    "number": 3
  },
  {
    "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
    "number": 4
  },
  {
    "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
    "number": 5
  },
  {
    "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
    "number": 6
  }
];
const tags = [
  "antipasti",
  "starter",
  "snack",
  "appetizer",
  "antipasto",
  "hor d'oeuvre"
];

describe('Recipe', () => {
  it('should be a function', function () {
    expect(Recipe).to.be.a('function');
  });
  it('should be an instance of Recipe', function () {
    const recipe = new Recipe();
    expect(recipe).to.be.an.instanceof(Recipe)
  });
  it('should store an id', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.id).to.equal(595736);
  });
  it('should store a name', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });
  it('should store an image link', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });
  it('should store array of ingredients', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.ingredients).to.equal(ingredients);
  });
  it('should store array of instructions', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.instructions).to.equal(instructions);
  });
  it('should store array of tags', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.tags).to.equal(tags);
  });
  it('should be initialized with object of Recipe', function () {
    const recipe = new Recipe(recipe1, ingredientsData);
    expect(recipe).to.deep.equal(recipe1);
  });
  it('must contain getIngredientNames method', function () {
    const recipe = new Recipe();
    expect(recipe).to.have.property('getIngredientNames');
  });
  it('must contain getIngredientsCost method', function () {
    const recipe = new Recipe();
    expect(recipe).to.have.property('getIngredientsCost');
  });
  it('must contain getInstructions method', function () {
    const recipe = new Recipe();
    expect(recipe).to.have.property('getInstructions');
  });
  it('should be determine the names of ingredients needed', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.getIngredientsNames()).to.deep.equal(['wheat flour', 'bicarbonate of soda', 'eggs', 'sucrose', 'instant vanilla pudding', 'brown sugar', 'salt', 'fine sea salt', 'semi sweet chips', 'unsalted butter', 'vanilla']);
  });
  it('should return the cost of the recipe ingredients', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    // 5×142.5×582+1×472+.5×902+3×660+.5×559+.5×280+24×528+2×253+.5×617+.5×926;
    expect(recipe.getIngredientsCost()).to.equal(17776);
  });
  it('should return ascending sorted array of instructions', function () {
    const recipe = new Recipe(595736, ingredientsData, 'https://spoonacular.com/recipeImages/595736-556x370.jpg', ingredients, instructions, 'Loaded Chocolate Chip Pudding Cookie Cups', tags);
    expect(recipe.getInstructions()).to.deep.equal(["In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "Add egg and vanilla and mix until combined.",
      "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce."]);
  });

})