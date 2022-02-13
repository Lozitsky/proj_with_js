class CallsLocalAPI {

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

  static modifyIngredients(userId, ingredientID, ingredientModification) {
    fetch('http://localhost:3001/api/v1/users', {
      method: "POST",
      body: JSON.stringify({
        userId,
        ingredientID,
        ingredientModification
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }
}

export default CallsLocalAPI;