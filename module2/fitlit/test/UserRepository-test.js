import {expect} from 'chai';
import UserRepository from '../src/class/UserRepository';
// import users from '../src/data/users';

const users = [{
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
},
{
  "id": 2,
  "name": "Jarvis Considine",
  "address": "30086 Kathryn Port, Ciceroland NE 07273",
  "email": "Dimitri.Bechtelar11@gmail.com",
  "strideLength": 4.5,
  "dailyStepGoal": 5000,
  "friends": [
    9,
    18,
    24,
    19
  ]
},
{
  "id": 3,
  "name": "Herminia Witting",
  "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
  "email": "Elwin.Tromp@yahoo.com",
  "strideLength": 4.4,
  "dailyStepGoal": 5000,
  "friends": [
    19,
    11,
    42,
    33
  ]
},
{
  "id": 4,
  "name": "Mae Connelly",
  "address": "28926 Schinner Islands, Turnermouth NE 23720-3230",
  "email": "Marcos_Pollich@hotmail.com",
  "strideLength": 3.1,
  "dailyStepGoal": 4000,
  "friends": [
    48,
    7,
    44,
    8
  ]
},
{
  "id": 5,
  "name": "Erick Schaden",
  "address": "514 Mayert Walk, Jordaneside SC 55023-6523",
  "email": "Vanessa_Gerhold@gmail.com",
  "strideLength": 3.1,
  "dailyStepGoal": 8000,
  "friends": [
    13,
    44,
    49,
    33,
    10
  ]
},
{
  "id": 6,
  "name": "Jerrold Bogisich",
  "address": "8283 Carroll Harbor, Borerfort CT 69020-3448",
  "email": "Mercedes_Zboncak53@yahoo.com",
  "strideLength": 3.7,
  "dailyStepGoal": 11000,
  "friends": [
    11,
    48,
    15
  ]
},
{
  "id": 7,
  "name": "Breanne Fay",
  "address": "834 Retta Knoll, Stantonland MA 71627-4121",
  "email": "Dashawn28@gmail.com",
  "strideLength": 2.9,
  "dailyStepGoal": 8000,
  "friends": [
    12,
    27,
    22,
    30
  ]
},
{
  "id": 8,
  "name": "Laney Abshire",
  "address": "86416 Koch Inlet, North Kaciefurt MA 80635",
  "email": "Janice_Nitzsche2@yahoo.com",
  "strideLength": 2.8,
  "dailyStepGoal": 2000,
  "friends": [
    11,
    41,
    23,
    49
  ]
},
{
  "id": 9,
  "name": "Myron Schmitt",
  "address": "85251 Martina Fields, West Aletha MD 00163-5315",
  "email": "Gerard_Langosh22@hotmail.com",
  "strideLength": 3.8,
  "dailyStepGoal": 6000,
  "friends": [
    16,
    26,
    17
  ]
}];

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
      expect(repo.getUserData(8)).to.deep.eq({
        "id": 8,
        "name": "Laney Abshire",
        "address": "86416 Koch Inlet, North Kaciefurt MA 80635",
        "email": "Janice_Nitzsche2@yahoo.com",
        "strideLength": 2.8,
        "dailyStepGoal": 2000,
        "friends": [
          11,
          41,
          23,
          49
        ]
      });
    });
    it('should return quantity', function () {
      expect(repo.getQuantity()).to.eq(9);
    });
    it('should return average step goal', function () {
      expect(repo.getAverageStepGoal()).to.eq(
        (10000 + 5000 + 5000 + 4000 + 8000 + 11000 + 8000 + 2000 + 6000) / 9);
    });
  })
});