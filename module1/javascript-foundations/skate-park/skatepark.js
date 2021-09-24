class Skatepark {
    constructor(obj) {
        this.name = obj.name;
        this.yearFounded = obj.year;
        this.style = obj.type;
        this.features = obj.features;
        this.isPrivate = !!obj.isPrivate;
        this.cost = obj.price ? obj.price : 0;
        this.occupants = [];
    }

    admit(skater) {
        if (this.occupants.length > 2) {
            return "Sorry, we are at max capacity. Thank you for understanding.";
        }
        if (!this.isPrivate) {
            this.occupants.push(skater);
            return `Welcome to the free ${this.name} Skatepark!`;
        }
        if (skater.money < this.cost) {
            return "Sorry, you don't have enough money.";
        }
        skater.money -= this.cost;
        this.occupants.push(skater);
        return `Welcome to Curbside, the cost will be \$${this.cost}.00.`;
    }
}

module.exports = Skatepark;