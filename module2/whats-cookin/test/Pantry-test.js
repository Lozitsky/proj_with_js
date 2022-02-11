import {expect} from "chai";
import Pantry from "../src/classes/Pantry";
import User from "../src/classes/User";
import {ingredientsData} from "../src/data/ingredients";
import {usersData} from "../src/data/users";

describe('Pantry', function () {
  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
  });
  it('should be an instance of Pantry', function () {
    let pantry = new Pantry();
    expect(pantry).to.be.an.instanceof(Pantry);
  });
  it('should store the user', function () {
    let user = new User(usersData[13]);
    let pantry = new Pantry(user, ingredientsData);
    expect(pantry.user).to.equal(user);
  });
  it('should store the ingredients', function () {
    let user = new User(usersData[13]);
    let pantry = new Pantry(user, ingredientsData);
    expect(pantry.ingredients).to.equal(ingredientsData);
  });
  it('must contained getAllIngredients method', function () {
    let pantry = new Pantry();
    expect(pantry).to.have.property('getAllIngredients');
  });
  it('must contained hasIngredients method', function () {
    let pantry = new Pantry();
    expect(pantry).to.have.property('hasIngredients');
  });
  it('should be return what ingredients exist inside pantry', function () {
    let user = new User(usersData[13]);
    let pantry = new Pantry(user, ingredientsData);
    expect(pantry.ingredients)
  });
});