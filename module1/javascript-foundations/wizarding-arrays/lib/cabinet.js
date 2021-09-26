const Potion = require("./potion");

class Cabinet {
    constructor() {
        this.potions = [];
    }

    isEmpty() {
        return !this.potions.length;
    }

    add(potion) {
        if (potion instanceof Potion) {
            this.potions.push(potion);
        } else {
            this.potions = [...this.potions, ...potion];
        }
    }

    takeFirstPotion() {
        return this.potions.shift();
    }

    takePotionWithName(name) {
        let index;
        this.potions.find((potion, i) => {
            if (potion.name === name) {
                index = i;
            }
        });

        return this.potions.splice(index, 1)[0];
    }

    count(name) {
        return this.potions.filter(potion => potion.name === name).length;
    }
}

module.exports = Cabinet;