class Ingredient {
  constructor(id, name, amount, unit) {
    if (unit === undefined && id !== undefined) {
      this.id = id.id;
      this.name = id.name;
      this.amount = id.amount;
      this.unit = id.unit;
    } else {
      this.id = id;
      this.name = name;
      this.amount = amount;
      this.unit = unit;
    }
  }
}

export default Ingredient;