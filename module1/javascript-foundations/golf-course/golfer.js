class Golfer {
    constructor(golfer) {
        this.name = golfer.name;
        this.handicap = golfer.handicap;
        this.frustration = 0;
        this.confidence = 0;
    }

    calculateAvg(average) {
        return `I usually shoot a ${this.handicap + average} on average.`;
    }

    playRound(course) {
        if (course.difficulty === "hard") {
            this.frustration = 500;
        } else if (course.difficulty === "moderate") {
            this.frustration = 100;
        }
    }

    hitTheRange() {
        this.confidence+=10;
    }

    marvel(course) {
        return `I love the ${course.features[0]} and ${course.features[1]} on this course!`;
    }

    whatYaShoot(shoot) {
        if (shoot > 2) {
            this.frustration = 20;
            return "Doh!";
        }
        if (shoot === 2) {
            this.frustration = 30;
            return "Doh!";
        }
        if (shoot === 0) {
            this.frustration = 10;
            return "Booyah!";
        }
        if (shoot < 0) {
            this.frustration = 0;
            return "I AM THE GREATEST GOLFER ALIVE!";
        }
        return undefined;
    }
}

module.exports = Golfer;
