import {expect} from "chai";
import Hydration from "../src/class/hydration/Hydration";

const hydrationData = {"userID": 1, "date": "2019/06/20", "numOunces": 50};

describe('Hydration', function () {
  let hydration;
  it('should be a function', function () {
    expect(Hydration).to.be.a('function');
  });
  describe('Hydration()', function () {
    beforeEach(() => {
      hydration = new Hydration();
    });
    it('should be a Hydration instance', function () {
      expect(hydration).to.be.an.instanceof(Hydration);
    });
    it('should have a hydrationData property', function () {
      expect(hydration).to.have.property('hydrationData');
    });
    it('should have a method named `getDate`', function () {
      expect(hydration).itself.to.respondsTo('getDate');
    });
    it('should have a method named `getNumOunces`', function () {
      expect(hydration).itself.to.respondsTo('getNumOunces');
    });
  });
  describe('Hydration(hydrationData)', function () {
    beforeEach(() => {
      hydration = new Hydration(hydrationData);
    });
    it('should hold a hydrationData object', function () {
      expect(hydration).to.have.deep.property('hydrationData', hydrationData);
    });
    it('should return Date', function () {
      expect(hydration.getDate()).to.be.a('string').eq('2019/06/20');
    });
    it('should return number of ounces', function () {
      expect(hydration.getNumOunces()).to.be.a('number').eq(50);
    });
  });
});

