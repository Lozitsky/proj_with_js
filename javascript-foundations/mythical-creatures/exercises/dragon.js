class Dragon {
    constructor(name, rider) {
        this.rider = rider;
        this.name = name;
        this.hungry = true;
        this.count = 0;
    }

    greet() {
        return `Hi, ${this.rider}!`;
    }

    eat() {
        this.hungry = ++this.count < 3;
    }
}

module.exports = Dragon;
