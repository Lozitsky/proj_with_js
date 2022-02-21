/*global.localStorage = {
  data: {},
  getItem(key) {
    const val = this.data[key]
    if (val) {
      return val
    }
    return null
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  }
};*/

class User {
  constructor(id, name, pantry) {
    if (pantry === undefined && id !== undefined) {
      this.id = id.id;
      this.name = id.name;
      this.pantry = id.pantry;
    } else {
      this.id = id;
      this.name = name;
      this.pantry = pantry;
    }
    localStorage.setItem('userId', this.id);
  }

  addIngredientsToPantry(id, amount) {
    let index = this.pantry.findIndex(ingred => ingred.ingredient === id);
    if (index > -1) {
      this.pantry[index].amount += amount;
    } else {
      this.pantry.push({
        "ingredient": id,
        amount
      });
    }
  }
}


export default User;