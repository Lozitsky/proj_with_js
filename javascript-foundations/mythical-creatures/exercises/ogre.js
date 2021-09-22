class Ogre {
    constructor(obj) {
        this.name = obj.name;
        this.home = "Swamp";
        this.swings = 0;
        if (obj.abode) {
            this.home = obj.abode;
        }
    }

    encounter(human) {
        human.encounterCounter++;
        if (human.noticesOgre()) {
            this.swings++;
        }
        human.knockedOut = (this.swings > 0) && !(this.swings % 2);
    }

    swingAt(human) {
        this.swings++;
    }

    apologize(human) {
        human.knockedOut = false;
    }
}

module.exports = Ogre;