// const chai = require('chai')
// const expect = chai.expect;

import {expect} from 'chai';
import User from '../src/class/user/User';

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

  describe('User()', () => {
    let user;
    beforeEach(() => {
      user = new User();
    });
    it('should be an instance of User', function () {
      expect(user).to.be.an.instanceof(User);
    });
    it('should have a userData property', function () {
      // const user = new User();
      expect(user).to.have.property('userData');
    });
    it('should have method `getName`', function () {
      const user = new User();
      expect(user).itself.to.respondsTo('getName');
    });
  });

  describe('User(user1)', () => {
    let user;
    beforeEach(() => {
      user = new User(user1);
    });
    it('should hold a userData object', function () {
      // const user = new User(user1);
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
    it('should return a user’s first name only', function () {
      // const user = new User(user1);
      expect(user.getName()).to.be.a('string').eq('Luisa');
    });
    it('should return full name', function () {
      // const user = new User(user1);
      expect(user.getFullname()).to.be.a('string').eq('Luisa Hane');
    });
    it('should return an address', function () {
      expect(user.getAddress()).to.be.a('string').eq('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    });
    it('should return an email', function () {
      expect(user.getEmail()).to.be.a('string').eq('Diana.Hayes1@hotmail.com');
    });
    it('should return a stride length', function () {
      expect(user.getStrideLength()).to.be.a('number').eq(4.3);
    });
    it('should return a daily step goal', function () {
      expect(user.getDailyStepGoal()).to.be.a('number').eq(10000);
    });
    it('should return friends', function () {
      expect(user.getFriends()).to.be.an('array').deep.eq([16, 4, 8]);
    });
  })
});
