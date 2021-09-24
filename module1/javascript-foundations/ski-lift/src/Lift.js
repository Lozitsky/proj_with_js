var Skier = require('./Skier');

class Lift {
    constructor(limit) {
        this.inService = true;
        this.limit = limit;
        this.skiers = [];
        this.safetyBar = "up";
    }

    admitSkier(name, hasLiftTicket) {
        if (!hasLiftTicket) {
            return `Sorry, ${name}. You need a lift ticket!`;
        }
        if (!this.limit || this.limit <= this.skiers.length) {
            return `Sorry, ${name}. Please wait for the next lift!`;
        }
        this.skiers.push(new Skier(name, hasLiftTicket));
    }

    startLift() {
        if (this.limit <= this.skiers.length) {
            this.safetyBar = "down";
        } else {
            let number = this.limit - this.skiers.length;
            return `We still need ${number} more skier${number > 1 ? 's!' : '!'}`;
        }
    }
}

module.exports = Lift;