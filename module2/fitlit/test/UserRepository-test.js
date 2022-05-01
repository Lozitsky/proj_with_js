import {expect} from 'chai';
import UserRepository from '../src/class/UserRepository';
import users from '../src/data/users';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });
  describe('UserRepository()', () => {
    let repo;
    beforeEach(() => {
      repo = new UserRepository();
    });
    it('should be an instance of UserRepository', function () {
      expect(repo).to.be.an.instanceof(UserRepository);
    });
    it('should have a data property', function () {
      expect(repo).to.have.property('data');
    });
    it('should have method `getUserData`', function () {
      expect(repo).itself.to.respondsTo('getUserData');
    });
    it('should have method `getAverageStepGoal`', function () {
      expect(repo).itself.to.respondsTo('getAverageStepGoal');
    });
  });
  describe('UserRepository(users)', () => {
    let repo;
    beforeEach(() => {
      repo = new UserRepository(users);
    });
    it('should hold all of the User objects', function () {
      expect(repo).to.have.deep.property('data', users);
    });
    it('should return a user data', () => {
      expect(repo.getUserData(13)).to.deep.equal({
        "id": 13,
        "name": "Tom Schmeler",
        "address": "1524 Clemmie River, Newtonbury RI 02849-3159",
        "email": "Leopoldo.Sauer@gmail.com",
        "strideLength": 3.2,
        "dailyStepGoal": 4000,
        "friends": [
          33,
          14,
          3,
          43,
          35
        ]
      });
    });
    it('should return quantity', function () {
      expect(repo.getQuantity()).to.equal(50);
    });
    it('should return average step goal', function () {
      expect(repo.getAverageStepGoal()).to.equal(6700);
    });
  })
});