import {expect} from "chai";
import Rocket from "../src/Rocket.js";

describe('Rocket', () => {
  let rocket;
  beforeEach('init Rocket', () => {
    rocket = new Rocket();
  });

  describe('Initial setup of rocket', function () {
    it('Does not have a name', function () {
      expect(rocket.name).to.equal('');
    });

    it('Has fuel tanks that are empty', function () {
      expect(rocket.fuel).to.equal('empty');
    });

    it('There are no astronauts initially', function () {
      expect(rocket.astronauts).to.deep.equal([]);
    });

    it('The engines are not ignited', function () {
      expect(rocket.enginesIgnited).to.equal(false);
    });

    it('The cargo doors are closed and there is no cargo', function () {
      expect(rocket.cargoDoors).to.equal('closed');
      expect(rocket.cargo).to.deep.equal([]);
    });
  });


  describe('Functionality of rocket', function () {
    it('Should be able to load astronauts', function () {
      rocket.loadAstronaut('Alan Shepard');

      expect(rocket.astronauts).to.deep.equal(['Alan Shepard']);
    });

    it('Should be able to ignite the engines', function () {
      rocket.lightThisCandle();

      expect(rocket.enginesIgnited).to.equal(true);
    });

    it('Should be able to fill the fuel tanks', () => {
      rocket.fillTanks();
      expect(rocket.fuel).to.equal('full');
    });
  });
})