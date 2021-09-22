class Sphinx {
    constructor() {
        this.riddles = [];
        this.heroesEaten = 0;

    }

    collectRiddle(riddle) {
        if (this.riddles.length > 2) {
            this.riddles.shift();
        }
        this.riddles.push(riddle);
    }

    attemptAnswer(short) {
        if (this.riddles[this.riddles.length - 1].answer === short) {
            this.riddles.pop();
            // return this.riddles;
            return `PSSSSSSS THIS HAS NEVER HAPPENED, HOW DID YOU KNOW THE ANSWER WAS "${short}"???`;
        }
        this.heroesEaten++;
        return "That wasn't that hard, I bet you don't get the next one";

    }
}

module.exports = Sphinx;