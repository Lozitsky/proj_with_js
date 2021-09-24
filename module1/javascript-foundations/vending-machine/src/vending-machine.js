class VendingMachine {
    constructor(obj) {
        this.id = obj.id;
        this.isBroken = obj.isBroken;
        this.snacks = [];
    }

    addSnacks(snack) {
        if (this.snacks.find(nsnack => nsnack.name === snack.name)) {
            return `Sorry, that snack is already stocked! Try adding a different snack.`;
        }
        this.snacks.push(snack);
        return undefined;
    }

    purchaseSnack(name, money) {
        let snack = this.snacks.find(nsnack => nsnack.name === name);

        if (snack.itemsInStock === 0) {
            return "Sorry, no items in stock. Try another item.";
        }
        if (snack.price > money) {
            return "Sorry, not enough payment. Please add more money."
        }
        snack.removeItem();

        return `Success! Here is \$${money-snack.price} back!`
    }
}

module.exports = VendingMachine;
