class Chef {
  constructor(name, restaurant) {
    this.name = name;
    this.restaurant = restaurant;
  }

  greetCustomer(name, isMorning) {

    return isMorning ? `Good morning, ${name}!` : `Hello, ${name}!`;
  }

  checkForFood(meal) {
    if (this.restaurant.menus[meal.type].includes(meal)) {
      return `Yes, we're serving ${meal.name} today!`;
    } else {
      return `Sorry, we aren't serving ${meal.name} today.`;
    }
  }
}

module.exports = Chef;