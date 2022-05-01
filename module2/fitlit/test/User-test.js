// const chai = require('chai')
// const expect = chai.expect;

import {expect} from 'chai';
import User from '../src/class/User';

const user1 = {
  "id": 1,
  "name": "Luisa Hane",
  "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
  "email": "Diana.Hayes1@hotmail.com",
  "strideLength": 4.3,
  "dailyStepGoal": 10000,
  "friends": [
    16,
    4,
    8
  ]
};

describe('User', () => {
  it('should be a function', function () {
    expect(User).to.be.a('function');
  });
  it('should be an instance of User', function () {
    const user = new User();
    expect(user).to.be.an.instanceof(User);
  });
  it('should have a userData property', function () {
    const user = new User();
    expect(user).to.have.property('userData');
  });
  it('should hold a userData object', function () {
    const user = new User(user1);
    expect(user).to.have.deep.property('userData', {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    });
  });
  it('should have method `getName`', function () {
    const user = new User();
    expect(user).itself.to.respondsTo('getName');
  });
  it('should return a user’s first name only', function () {
    const user = new User(user1);
    expect(user.getName()).to.be.a('string').eq('Luisa');
  });
});
