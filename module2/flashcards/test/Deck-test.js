const chai = require('chai');
const expect = chai.expect;

const Deck = require('../src/Deck');

describe('Deck', function () {
    describe('instance', function () {
        it.skip('should be a function', function () {
            expect(Deck).to.be.a('function');
        });

        it.skip('should be an instance of Deck', function () {
            const deck = new Deck();
            expect(deck).to.be.an.instanceOf(Deck);
        });

        it.skip('should be initialized with an array of Cards', function () {
            const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
            const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
            const card3 = new Card(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');

            const deck = new Deck([card1, card2, card3]);
            expect(deck.cards).to.be.a('array');
        });
    });

    describe('countCards', function () {
        it.skip('should return the number of cards in the deck', function () {
            const deck = new Deck([card1, card2, card3]);
            expect(deck.coutCards()).to.equal(3);
        });
    });

});