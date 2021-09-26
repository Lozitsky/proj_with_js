class Gear {
    constructor(type, quantity) {
        this.type = type;
        this.quantity = quantity;
    }

    checkForValidity() {
        if (["food", "ammunition", "clothes"].includes(this.type)) {
            return `Great, we'll need lots of ${this.type}!`;
        }
        let message = `I don\'t think a ${this.type} will help us.`;
        this.type = null;
        return message;
    }
}

module.exports = Gear;
