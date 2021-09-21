class Magician {
    // favoriteAccessory = "top hat";

    constructor(obj) {
        this.name = `The Great ${obj.name}`;
        this.assistant = obj.assistant;
        this.favoriteAccessory = obj.clothing ? obj.clothing : "top hat";
        this.confidencePercentage = 10;
    }

    performIncantation(abracadabra) {
        return `${abracadabra.toUpperCase()}!`;
    }

    performTrick() {
        this.confidencePercentage += 10;
        return this.favoriteAccessory === "top hat" ? "PULL RABBIT FROM TOP HAT" : "PULL DOVE FROM SLEEVE";
    }

    performShowStopper() {
        return this.assistant && this.confidencePercentage >= 100 ? "WOW! The magician totally just sawed that person in half!" : "Oh no, this trick is not ready!";
    }
}

module.exports = Magician;