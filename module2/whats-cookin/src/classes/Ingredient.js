class Ingredient {
  constructor(name, amount, unit) {
    if (unit === undefined && name !== undefined) {
      this.name = name.name;
      this.amount = name.amount;
      this.unit = name.unit;
    } else {
      this.name = name;
      this.amount = amount;
      this.unit = unit;
    }
  }
}

export default Ingredient;