class Pirate {
    constructor(name, job = "scallywag") {
        this.job = job;
        this.name = name;
        this.cursed = false;
        this.booty = 0;
        this.count = 0;
    }

    robShip() {
        this.count++;
        if (this.count < 6) {
            this.booty += 100;
            return "YAARRR!";
        } else {
            this.cursed = true;
            return "ARG! I've been cursed!";
        }
    }

    liftCurse() {
        if (!this.cursed) {
            return "You don't need to lift a curse!";
        }
        this.cursed = false;
        this.booty -= 300;
        this.count = 0;
        return "Your curse has been lifted!";
    }
}

module.exports = Pirate;