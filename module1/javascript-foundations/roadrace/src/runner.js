class Runner {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.milesRun = 0;
        this.fitness = 25;
        this.completedRaces = [];
    }

    runSomeMiles(number) {
        this.milesRun+= number;
        this.fitness+= number;
    }

    stretch() {
        this.fitness += .5;
    }

    runRace(name, miles) {
        this.completedRaces.push(name);
        this.runSomeMiles(miles);
    }
}

module.exports = Runner;
