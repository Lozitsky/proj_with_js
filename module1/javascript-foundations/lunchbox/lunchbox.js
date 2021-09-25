class LunchBox {
    constructor(obj) {
        this.owner = obj.owner;
        this.material = obj.madeOf;
        this.shape = obj.shape;
        this.color = obj.color;
        this.snacks = [];
    }

    acquireSnack(snack) {
        this.snacks.push(snack);
        snack.isInLunchBox = true;
    }

    findHealthySnacks() {
        return this.snacks.filter(snack => snack.checkForHealthy()).map(snack => snack.type);
    }
}

module.exports = LunchBox;
