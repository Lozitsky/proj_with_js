class CallsLocalAPI {
  constructor() {
  }

  static getAllUsers() {
    return fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));
  }

  static getAllIngredients() {
    return fetch('http://localhost:3001/api/v1/ingredients')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));
  }

  static getAllRecipes() {
    return fetch('http://localhost:3001/api/v1/recipes')
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.log(error));
  }

  static modifyIngredients(user, ingredientID, ingredientModification) {
    fetch('http://localhost:3001/api/v1/users', {
      method: "POST",
      body: JSON.stringify({
        userID: user.id,
        ingredientID,
        ingredientModification
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        if (response.statusText === "Created") {
          user.addIngredientsToPantry(ingredientID, ingredientModification);
        }
        return  response.json();
      })
      .then(json => console.log(json));
  }
}

export default CallsLocalAPI;