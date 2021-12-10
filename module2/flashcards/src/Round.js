class Round {
    constructor(deck) {
        this.deck = deck ? deck.cards : [];
        this.currentCard = this.deck[0];
        this.turns = 0;
        this.incorrectGuesses = [];
    }

    returnCurrentCard() {
        return this.currentCard;
    }

    takeTurn(guess) {
        this.turns++;

        if (this.currentCard.correctAnswer === guess) {
            this.currentCard = this.deck[this.turns];
            return 'correct!';
        } else {
            this.incorrectGuesses.push(this.currentCard.id);
            this.currentCard = this.deck[this.turns];
            return 'incorrect!';
        }
    }

    calculatePercentCorrect() {
        return 100 * (this.turns - this.incorrectGuesses.length) / this.turns;
    }

    endRound() {
        return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`;
    }
}

module.exports = Round;