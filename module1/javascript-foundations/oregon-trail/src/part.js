class Part {
    constructor(type) {
        this.type = type;
        this.broken = false;
        this.isOnce = true;
    }

    break() {
        this.broken = true;
    }

    repair() {
        if (this.isOnce) {
            this.broken = false;
            this.isOnce = false;
            return `This ${this.type} has seen better days, we'll need a brand new one!`;
        }
        return `This ${this.type} has seen better days, we\'ll need a brand new one!`;
    }
}

module.exports = Part;
