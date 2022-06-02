import {expect} from "chai";
import HydrationRepository from "../src/class/hydration/HydrationRepository";
import Hydration from "../src/class/hydration/Hydration";

const hydrationData = [{
  "userID": 1,
  "date": "2019/06/15",
  "numOunces": 37
},
  {"userID": 2, "date": "2019/06/15", "numOunces": 75},
  {
    "userID": 3,
    "date": "2019/06/15",
    "numOunces": 47
  },
  {"userID": 4, "date": "2019/06/15", "numOunces": 85},
  {
    "userID": 5,
    "date": "2019/06/15",
    "numOunces": 42
  }, {"userID": 1, "date": "2019/06/16", "numOunces": 69},
  {
    "userID": 2,
    "date": "2019/06/16",
    "numOunces": 91
  }, {"userID": 3, "date": "2019/06/16", "numOunces": 99},
  {"userID": 4, "date": "2019/06/16", "numOunces": 95},
  {"userID": 1, "date": "2019/06/17", "numOunces": 96},
  {
    "userID": 2,
    "date": "2019/06/17",
    "numOunces": 96
  }, {"userID": 3, "date": "2019/06/17", "numOunces": 28},
  {"userID": 4, "date": "2019/06/17", "numOunces": 82},
  {"userID": 1, "date": "2019/06/18", "numOunces": 61},
  {
    "userID": 2,
    "date": "2019/06/18",
    "numOunces": 70
  }, {"userID": 3, "date": "2019/06/18", "numOunces": 40},
  {"userID": 4, "date": "2019/06/18", "numOunces": 93},
  {"userID": 1, "date": "2019/06/19", "numOunces": 91}, {
    "userID": 2,
    "date": "2019/06/19",
    "numOunces": 76
  }, {"userID": 3, "date": "2019/06/19", "numOunces": 85},
  {"userID": 4, "date": "2019/06/19", "numOunces": 21},
  {"userID": 1, "date": "2019/06/20", "numOunces": 50}, {
    "userID": 2,
    "date": "2019/06/20",
    "numOunces": 71
  }, {"userID": 3, "date": "2019/06/20", "numOunces": 51},
  {"userID": 4, "date": "2019/06/20", "numOunces": 95},
  {"userID": 1, "date": "2019/06/21", "numOunces": 50}, {
    "userID": 2,
    "date": "2019/06/21",
    "numOunces": 27
  }, {"userID": 3, "date": "2019/06/21", "numOunces": 41},
  {"userID": 4, "date": "2019/06/21", "numOunces": 91},
  {"userID": 1, "date": "2019/06/22", "numOunces": 43}, {
    "userID": 2,
    "date": "2019/06/22",
    "numOunces": 58
  }, {"userID": 3, "date": "2019/06/22", "numOunces": 78},
  {"userID": 4, "date": "2019/06/22", "numOunces": 34}];

const hydrationObjData = [
  new Hydration({
    "userID": 1,
    "date": "2019/06/15",
    "numOunces": 37
  }),
  new Hydration({"userID": 2, "date": "2019/06/15", "numOunces": 75}),
  new Hydration({
    "userID": 3,
    "date": "2019/06/15",
    "numOunces": 47
  }),
  new Hydration({"userID": 4, "date": "2019/06/15", "numOunces": 85}),
  new Hydration({
    "userID": 5,
    "date": "2019/06/15",
    "numOunces": 42
  }),
  new Hydration({"userID": 1, "date": "2019/06/16", "numOunces": 69}),
  new Hydration({
    "userID": 2,
    "date": "2019/06/16",
    "numOunces": 91
  }),
  new Hydration({"userID": 3, "date": "2019/06/16", "numOunces": 99}),
  new Hydration({"userID": 4, "date": "2019/06/16", "numOunces": 95}),
  new Hydration({"userID": 1, "date": "2019/06/17", "numOunces": 96}),
  new Hydration({
    "userID": 2,
    "date": "2019/06/17",
    "numOunces": 96
  }),
  new Hydration({"userID": 3, "date": "2019/06/17", "numOunces": 28}),
  new Hydration({"userID": 4, "date": "2019/06/17", "numOunces": 82}),
  new Hydration({"userID": 1, "date": "2019/06/18", "numOunces": 61}),
  new Hydration({
    "userID": 2,
    "date": "2019/06/18",
    "numOunces": 70
  }),
  new Hydration({"userID": 3, "date": "2019/06/18", "numOunces": 40}),
  new Hydration({"userID": 4, "date": "2019/06/18", "numOunces": 93}),
  new Hydration({
    "userID": 1,
    "date": "2019/06/19",
    "numOunces": 91
  }),
  new Hydration({
    "userID": 2,
    "date": "2019/06/19",
    "numOunces": 76
  }),
  new Hydration({"userID": 3, "date": "2019/06/19", "numOunces": 85}),
  new Hydration({"userID": 4, "date": "2019/06/19", "numOunces": 21}),
  new Hydration({
    "userID": 1,
    "date": "2019/06/20",
    "numOunces": 50
  }),
  new Hydration({
    "userID": 2,
    "date": "2019/06/20",
    "numOunces": 71
  }),
  new Hydration({"userID": 3, "date": "2019/06/20", "numOunces": 51}),
  new Hydration({"userID": 4, "date": "2019/06/20", "numOunces": 95}),
  new Hydration({
    "userID": 1,
    "date": "2019/06/21",
    "numOunces": 50
  }),
  new Hydration({
    "userID": 2,
    "date": "2019/06/21",
    "numOunces": 27
  }),
  new Hydration({"userID": 3, "date": "2019/06/21", "numOunces": 41}),
  new Hydration({"userID": 4, "date": "2019/06/21", "numOunces": 91}),
  new Hydration({
    "userID": 1,
    "date": "2019/06/22",
    "numOunces": 43
  }),
  new Hydration({
    "userID": 2,
    "date": "2019/06/22",
    "numOunces": 58
  }),
  new Hydration({"userID": 3, "date": "2019/06/22", "numOunces": 78}),
  new Hydration({"userID": 4, "date": "2019/06/22", "numOunces": 34})
];

describe('HydrationRepository', function () {
  let repo;
  it('should be a function', function () {
    expect(HydrationRepository).to.be.a('function');
  });
  describe('HydrationRepository()', function () {
    beforeEach(() => {
      repo = new HydrationRepository();
    });
    it('should be an instance of HydrationRepository', function () {
      expect(repo).to.be.an.instanceof(HydrationRepository);
    });
    it('should have a data property', function () {
      expect(repo).to.have.property('hydrations');
    });
    it('should have a id property', function () {
      expect(repo).to.have.property('id');
    });
    it('should have a method named `getAll`', function () {
      expect(repo).itself.to.respondsTo('getAll');
    });
    it('should have a method named `getByDate`', function () {
      expect(repo).itself.to.respondsTo('getByDate');
    });
    it('should have a method named `getQuantity`', function () {
      expect(repo).itself.to.respondsTo('getQuantity');
    });
    it('should have a method named `getByLastWeek`', function () {
      expect(repo).itself.to.respondsTo('getByLastWeek');
    });
    it('should have a method named `getAverageHydration`', function () {
      expect(repo).itself.to.respondsTo('getAverageHydration');
    });
  });
  describe('HydrationRepository(data, id)', function () {
    beforeEach(() => {
      repo = new HydrationRepository(hydrationData, 4);
    });
    it('should hold all Hydration data', function () {
      expect(repo).to.have.deep.property('hydrations', hydrationObjData);
    });
    it('should return all Hydration data for the current user', function () {
      expect(repo.getAll()).to.deep.eq([
        new Hydration({"userID": 4, "date": "2019/06/15", "numOunces": 85}),
        new Hydration({"userID": 4, "date": "2019/06/16", "numOunces": 95}),
        new Hydration({"userID": 4, "date": "2019/06/17", "numOunces": 82}),
        new Hydration({"userID": 4, "date": "2019/06/18", "numOunces": 93}),
        new Hydration({"userID": 4, "date": "2019/06/19", "numOunces": 21}),
        new Hydration({"userID": 4, "date": "2019/06/20", "numOunces": 95}),
        new Hydration({"userID": 4, "date": "2019/06/21", "numOunces": 91}),
        new Hydration({"userID": 4, "date": "2019/06/22", "numOunces": 34})
      ]);
    });
    it('should return quantity', function () {
      expect(repo.getQuantity()).to.eq(8);
    });
    it('should return data by date', function () {
      expect(repo.getByDate("2019/06/16")).to.deep.eq(
        new Hydration({"userID": 4, "date": "2019/06/16", "numOunces": 95}));
    });
    it('should return data from last week', function () {
      expect(repo.getByLastWeek("2019/06/22")).to.deep.eq([
        // {"userID": 4, "date": "2019/06/15", "numOunces": 85},
        new Hydration({"userID": 4, "date": "2019/06/16", "numOunces": 95}),
        new Hydration({"userID": 4, "date": "2019/06/17", "numOunces": 82}),
        new Hydration({"userID": 4, "date": "2019/06/18", "numOunces": 93}),
        new Hydration({"userID": 4, "date": "2019/06/19", "numOunces": 21}),
        new Hydration({"userID": 4, "date": "2019/06/20", "numOunces": 95}),
        new Hydration({"userID": 4, "date": "2019/06/21", "numOunces": 91}),
        new Hydration({"userID": 4, "date": "2019/06/22", "numOunces": 34})
      ]);
    });
    it('should return average hydration', function () {
      expect(repo.getAverageHydration()).to.eq(
        (85 + 95 + 82 + 93 + 21 + 95 + 91 + 34) / 8);
    });
  });
});