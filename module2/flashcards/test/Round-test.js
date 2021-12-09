const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
const deck = new Deck([card1, card2, card3]);

describe('Round', function () {
    describe('instance', function () {
        it.skip('should be a function', function () {
            expect(Round).to.be.a('function');
        });

        it.skip('should be an instance of Round', function () {
            const round = new Round();
            expect(round).to.be.an.instanceOf(Round);
        });

        it.skip('should be initialized with deck', function () {
            const round = new Round(deck);

            expect(round.deck).to.deep.equal([card1, card2, card3]);
        });
    });

    describe('returnCurrentCard', function () {
        it.skip('should be the first Card in the Deck', function () {
            const round = new Round(deck);

            expect(round.currentCard).to.deep.equal({
                id: 1,
                question: 'What is Robbie\'s favorite animal',
                answers: ['sea otter', 'pug', 'capybara'],
                correctAnswer: 'sea otter'
            });

            expect(round.returnCurrentCard()).to.deep.equal({
                id: 1,
                question: 'What is Robbie\'s favorite animal',
                answers: ['sea otter', 'pug', 'capybara'],
                correctAnswer: 'sea otter'
            });
        });
    });

    describe('takeTurn', function () {
        it.skip('should be evaluate guesses and give feedback', function () {
            const round = new Round(deck);

            expect(round.takeTurn('sea otter')).to.equal('correct!');
            expect(round.takeTurn('spleen')).to.equal('incorrect!');
        });

        it.skip('should be update turns count', function () {
            const round = new Round(deck);
            expect(round.turns).to.equal(0);

            round.takeTurn('sea otter');
            round.takeTurn('spleen');

            expect(round.turns).to.equal(2);
        });

        it.skip('should be store ids of incorrect guesses', function () {
            const round = new Round(deck);
            expect(round.incorrectGuesses).to.equal([]);

            round.takeTurn('sea otter');
            round.takeTurn('spleen');
            expect(round.incorrectGuesses).to.equal([14]);
        });

        it.skip('should change the current card from the next', function () {
            const round = new Round(deck);
            expect(round.returnCurrentCard()).to.deep.equal({
                id: 1,
                question: 'What is Robbie\'s favorite animal',
                answers: ['sea otter', 'pug', 'capybara'],
                correctAnswer: 'sea otter'
            });

            round.takeTurn('sea otter');
            round.takeTurn('spleen');

            expect(round.returnCurrentCard()).to.deep.equal({
                id: 12,
                question: 'What is Travis\'s favorite stress reliever?',
                answers: ['listening to music', 'watching Netflix', 'playing with bubble wrap'],
                correctAnswer: 'playing with bubble wrap'
            });
        });
    });

    describe('calculatePercentCorrect', function () {
        it.skip('should calculate and return the percentage of correct guesses', function () {
            const round = new Round(deck);
            // expect(round.calculatePercentCorrect()).to.equal(0);
            round.takeTurn('sea otter');
            round.takeTurn('spleen');
            expect(round.calculatePercentCorrect()).to.equal(50);
        });
    });

    describe('endRound', function () {
        it.skip('should be print ‘** Round over! ** You answered <>% of the questions correctly!’', function () {
            const round = new Round(deck);
            // expect(round.calculatePercentCorrect()).to.equal(0);
            round.takeTurn('sea otter');
            round.takeTurn('spleen');
            expect(round.endRound()).to.equal('** Round over! ** You answered 50% of the questions correctly!')
        });
    });

});