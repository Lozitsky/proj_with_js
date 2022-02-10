import {expect} from "chai";
import User from "../src/classes/User";
// import {usersData} from "../src/data/users";

const pantry14 = [
  {
    "ingredient": 18372,
    "amount": 2
  },
  {
    "ingredient": 1001,
    "amount": 4
  },
  {
    "ingredient": 1102047,
    "amount": 2
  },
  {
    "ingredient": 2009,
    "amount": 2
  },
  {
    "ingredient": 19335,
    "amount": 2
  },
  {
    "ingredient": 1034053,
    "amount": 2
  },
  {
    "ingredient": 2047,
    "amount": 4
  },
  {
    "ingredient": 14412,
    "amount": 2
  },
  {
    "ingredient": 11282,
    "amount": 3
  },
  {
    "ingredient": 20081,
    "amount": 3
  },
  {
    "ingredient": 11215,
    "amount": 8
  },
  {
    "ingredient": 10011693,
    "amount": 2
  },
  {
    "ingredient": 10511282,
    "amount": 2
  },
  {
    "ingredient": 16057,
    "amount": 2
  },
  {
    "ingredient": 1002030,
    "amount": 2
  },
  {
    "ingredient": 4053,
    "amount": 2
  }
];
const user14 = {
  "name": "Stanford Doyle",
  "id": 14,
  "pantry": pantry14
};

describe('User', function () {
  it('should be a function', function () {
    expect(User).to.be.a('function');
  });
  it('should be an instance of User', function () {
    let user = new User(user14);
    expect(user).to.be.an.instanceof(User);
  });
  it('should store a name', function () {
    let user = new User(user14);
    expect(user.name).to.equal('Stanford Doyle');
  });
  it('should store an id', function () {
    let user = new User(user14);
    expect(user.id).to.equal(14);
  });
  it('should store the pantry', function () {
    let user = new User(user14);
    expect(user.pantry).to.deep.equal(pantry14);
  });
});