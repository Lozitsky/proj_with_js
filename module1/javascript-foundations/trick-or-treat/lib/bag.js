class Bag {
    constructor() {
        this.empty = true;
        this.count = 0;
        this.candies = [];
    }

    fill(candy) {
        this.candies.push(candy);
        this.count = this.candies.length;
        // return true;
    }

    contains(type) {
        return this.candies.find(candy => candy.type === type) !== undefined;
    }
}

module.exports = Bag;