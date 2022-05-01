import {expect} from 'chai';
import UserRepository from '../src/class/UserRepository';
import users from '../src/data/users';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });
  it('should be an instance of UserRepository', function () {
    const repo = new UserRepository();
    expect(repo).to.be.an.instanceof(UserRepository);
  });
  it('should have a data property', function () {
    const repo = new UserRepository();
    expect(repo).to.have.property('data');
  })
  it('should hold all of the User objects', function () {
    let repo = new UserRepository(users);
    expect(repo).to.have.deep.property('data', users);
  });
  it('should have method `getUserData`', function () {
    const repo = new UserRepository();
    expect(repo).itself.to.respondsTo('getUserData');
  });
  it('should have method `getAverageStepGoal`', function () {
    const repo = new UserRepository();
    expect(repo).itself.to.respondsTo('getAverageStepGoal');
  });
  it('should return a user data', () => {
    const repo = new UserRepository(users);
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
    const repo = new UserRepository(users);
    expect(repo.getQuantity()).to.equal(50);
  });
  it('should return average step goal', function () {
    const repo = new UserRepository(users);
    expect(repo.getAverageStepGoal()).to.equal(6700);
  });
});