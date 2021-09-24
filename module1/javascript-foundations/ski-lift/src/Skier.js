class Skier {
    constructor(name, hasLiftTicket = false) {
        this.name = name;
        this.hasLiftTicket = hasLiftTicket;
        this.skillLevel = 1;
        this.nextSlope = "green circle";
        this.complexity = {
            1: "green circle",
            3: "blue square",
            5: "black diamond"
        }
    }

    takeLesson() {
        this.skillLevel++;
        // this.nextSlope = this.complexity[this.skillLevel++ | 1];
    }

    pickSlope() {
        this.nextSlope = this.complexity[this.skillLevel -1 | 1];
    }
}

module.exports = Skier;