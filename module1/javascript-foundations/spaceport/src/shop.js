const Part = require("./part");

class Shop {
    constructor(obj) {
        this.name = obj.name;
        this.inventory = {};
    }

    addInventory(part) {
        if (part instanceof Part) {
            this.inventory[part.type] = part;
        }
    }

    outfitShip(ship, type) {
        if (!ship.captain) {
            return "cannot outfit a ship without a captain";
        }
        if (ship.captain.credits < this.inventory[type].value) {
            return `you require ${this.inventory[type].value} more credits to make this purchase`;
        }
        ship.captain.credits -= this.inventory[type].value;
        ship.updatePart(this.inventory[type]);
        this.inventory[type] = undefined;
        return `${type} added to ship`;
    }
}

module.exports = Shop;