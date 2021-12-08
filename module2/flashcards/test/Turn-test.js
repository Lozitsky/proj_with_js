const chai = require('chai');
const assert = require("chai").assert;
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function () {

    describe("instance", function () {
        it('should be a function', function () {
            // const turn = new Turn();
            expect(Turn).to.be.a('function');
        });

        it('should be an instance of Turn', function () {
            const turn = new Turn();
            expect(turn).to.be.an.instanceof(Turn);
        });

        it('should be instantiated with two arguments - a string and a Card object', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('pug', card);
            expect(turn.guess).to.be.a('string');
            expect(turn.card).to.be.an.instanceof(Card);
        });
    });

    describe("returnGuess", function () {
        it('should return `pug`', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('pug', card);
            assert.equal(turn.returnGuess(), "pug");
        });

        it('should return `capybara`', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('capybara', card);
            assert.equal(turn.returnGuess(), "capybara");
        });
    });

    describe("returnCard", function () {
        it('should return the Card', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('pug', card);
            // assert.deepEqual(turn.returnCard(),
            expect(turn.returnCard()).to.deep.equal(
                {
                    id: 1,
                    question: 'What is Robbie\'s favorite animal',
                    answers: ['sea otter', 'pug', 'capybara'],
                    correctAnswer: 'sea otter'
                });
        });
    });

    describe("evaluateGuess", function () {
        it('should return false', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('pug', card);
            expect(turn.evaluateGuess()).to.equal(false);
        })
    });

    describe("giveFeedback", function () {
        it('should return ‘incorrect!’', function () {
            const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const turn = new Turn('pug', card);
            expect(turn.giveFeedback()).to.equal("incorrect!");
        })
    });

});