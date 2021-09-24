const Bag = require("../lib/bag");

class TrickOrTreater {
    constructor(dressedUpAs) {
        this.dressedUpAs = dressedUpAs.style;
        this.bag = new Bag();
        this.hasCandy = false;
        this.countCandies = 0;
    }

    putCandyInBag(candy) {
        this.bag.fill(candy);
        this.countCandies = this.bag.count;
        this.hasCandy = true;
    }

    eat() {
        // this.bag.candies.shift();
        this.bag.candies.pop();
        this.countCandies--;
    }
}

module.exports = TrickOrTreater;