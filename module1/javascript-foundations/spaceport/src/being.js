class Being {
    constructor(name, species) {
        this.name = name;
        this.isAlive = true;
        this.species = species;
        this.credits = 0;
    }

    updateCredits(number) {
        this.credits += number;
    }
}

module.exports = Being;
