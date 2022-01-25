// Your fetch requests will live here!
function getAllUsers() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
    .then(response => response.json())
    .then(data => data.usersData)
    .catch(error => console.log(error));
}

function getAllIngredients() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
    .then(response => response.json())
    .then(data => data.ingredientsData)
    .catch(error => console.log(error));
}

function getAllRecipes() {
  return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
    .then(response => response.json())
    .then(data => data.recipeData)
    .catch(error => console.log(error));
}
// console.log('I will be a fetch request!')


export {
  getAllUsers,
  getAllIngredients,
  getAllRecipes
}