function getNextStatusCranky() {
    if (this.cranky) {
        return true;
    }
    this.count++;
    if (this.count > 2) {
        this.cranky = true;
    }
}

class Centaur {
    constructor(obj) {
        if (obj.type) {
            this.name = obj.name;
            this.breed = obj.type;
        } else {
            this.name = obj;
        }
        this.cranky = false;
        this.standing = true;
        this.count = 0;
        this.layingDown = false;
    }

    shootBow() {
        return getNextStatusCranky.call(this) || this.layingDown ? "NO!" : "Twang!!!";
    }

    run() {
        return getNextStatusCranky.call(this) || this.layingDown ? "NO!" : "Clop clop clop clop!!!";
    }

    sleep() {
        this.cranky = false;
        return this.layingDown ? "ZZZZ" : "NO!";
    }

    layDown() {
        this.standing = false;
        this.layingDown = true;
    }

    standUp() {
        this.standing = true;
        this.layingDown = false;
    }

    drinkPotion() {
        if (this.layingDown) {
            return "Not while I'm laying down!";
        }
        this.cranky = false;
    }
}

module.exports = Centaur;