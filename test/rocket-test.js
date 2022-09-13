// const expect = require('chai').expect;
import {expect} from "chai";

// const Rocket = require('../src/Rocket.js');


import Rocket from "../src/Rocket.js";

describe('Initial setup of rocket', function() {
  it('Does not have a name', function() {
    const rocket = new Rocket();

    expect(rocket.name).to.equal('');
  });

  it('Has fuel tanks that are empty', function() {
    const rocket = new Rocket();

    expect(rocket.fuel).to.equal('empty');
  });

  it('There are no astronauts initially', function() {
    const rocket = new Rocket();

    expect(rocket.astronauts).to.deep.equal([]);
  });

  it('The engines are not ignited', function() {
    const rocket = new Rocket();

    expect(rocket.enginesIgnited).to.equal(false);
  });

  it('The cargo doors are closed and there is no cargo', function() {
    const rocket = new Rocket();

    expect(rocket.cargoDoors).to.equal('closed');
    expect(rocket.cargo).to.deep.equal([]);
  });  
});


describe('Functionality of rocket', function() {
  it('Should be able to load astronauts', function() {
    const rocket = new Rocket();

    rocket.loadAstronaut('Alan Shepard');

    expect(rocket.astronauts).to.deep.equal(['Alan Shepard']);
  });

  it('Should be able to ignite the engines', function() {
    const rocket = new Rocket();

    rocket.lightThisCandle();

    expect(rocket.enginesIgnited).to.equal(true);
  });

  it('Should be able to fill the fuel tanks');
});