import {expect} from "chai";
import SleepRepository from "../src/class/sleep/SleepRepository";
import Sleep from "../src/class/sleep/Sleep";

const sleepData = [{
  "userID": 1, "date": "2019/06/15", "hoursSlept": 6.1, "sleepQuality": 2.2
}, {
  "userID": 2, "date": "2019/06/15", "hoursSlept": 7, "sleepQuality": 4.7
}, {
  "userID": 3, "date": "2019/06/15", "hoursSlept": 10.8, "sleepQuality": 4.7
}, {
  "userID": 4, "date": "2019/06/15", "hoursSlept": 5.4, "sleepQuality": 3
}, {
  "userID": 5, "date": "2019/06/15", "hoursSlept": 4.1, "sleepQuality": 3.6
}, {
  "userID": 6, "date": "2019/06/15", "hoursSlept": 9.6, "sleepQuality": 2.9
}, {
  "userID": 7, "date": "2019/06/15", "hoursSlept": 5.1, "sleepQuality": 2.6
}, {
  "userID": 8, "date": "2019/06/15", "hoursSlept": 8.1, "sleepQuality": 3.5
}, {"userID": 9, "date": "2019/06/15", "hoursSlept": 8.9, "sleepQuality": 2.2},
{"userID": 2, "date": "2019/06/16", "hoursSlept": 7.5, "sleepQuality": 3.8},
{"userID": 2, "date": "2019/06/17", "hoursSlept": 5.7, "sleepQuality": 3},
{"userID": 2, "date": "2019/06/18", "hoursSlept": 10.8, "sleepQuality": 3.2},
{"userID": 2, "date": "2019/06/19", "hoursSlept": 9.6, "sleepQuality": 2.5},
{"userID": 2, "date": "2019/06/20", "hoursSlept": 10.1, "sleepQuality": 2.4},
{"userID": 2, "date": "2019/06/21", "hoursSlept": 4.3, "sleepQuality": 4.8},
{"userID": 2, "date": "2019/06/22", "hoursSlept": 4.8, "sleepQuality": 3.3}
];

const sleepObjData = [new Sleep({
  "userID": 1, "date": "2019/06/15", "hoursSlept": 6.1, "sleepQuality": 2.2
}), new Sleep({
  "userID": 2, "date": "2019/06/15", "hoursSlept": 7, "sleepQuality": 4.7
}), new Sleep({
  "userID": 3, "date": "2019/06/15", "hoursSlept": 10.8, "sleepQuality": 4.7
}), new Sleep({
  "userID": 4, "date": "2019/06/15", "hoursSlept": 5.4, "sleepQuality": 3
}), new Sleep({
  "userID": 5, "date": "2019/06/15", "hoursSlept": 4.1, "sleepQuality": 3.6
}), new Sleep({
  "userID": 6, "date": "2019/06/15", "hoursSlept": 9.6, "sleepQuality": 2.9
}), new Sleep({
  "userID": 7, "date": "2019/06/15", "hoursSlept": 5.1, "sleepQuality": 2.6
}), new Sleep({
  "userID": 8, "date": "2019/06/15", "hoursSlept": 8.1, "sleepQuality": 3.5
}), new Sleep({
  "userID": 9, "date": "2019/06/15", "hoursSlept": 8.9, "sleepQuality": 2.2
}),
new Sleep({"userID": 2, "date": "2019/06/16", "hoursSlept": 7.5, "sleepQuality": 3.8}),
new Sleep({"userID": 2, "date": "2019/06/17", "hoursSlept": 5.7, "sleepQuality": 3}),
new Sleep({"userID": 2, "date": "2019/06/18", "hoursSlept": 10.8, "sleepQuality": 3.2}),
new Sleep({"userID": 2, "date": "2019/06/19", "hoursSlept": 9.6, "sleepQuality": 2.5}),
new Sleep({"userID": 2, "date": "2019/06/20", "hoursSlept": 10.1, "sleepQuality": 2.4}),
new Sleep({"userID": 2, "date": "2019/06/21", "hoursSlept": 4.3, "sleepQuality": 4.8}),
new Sleep({"userID": 2, "date": "2019/06/22", "hoursSlept": 4.8, "sleepQuality": 3.3})
  
];


describe('SleepRepository', function () {
  let repo;
  it('should be a function', function () {
    expect(SleepRepository).to.be.a('function');
  });
  describe('SleepRepository()', function () {
    beforeEach(() => {
      repo = new SleepRepository();
    });
    it('should be an instance of SleepRepository', function () {
      expect(repo).to.be.an.instanceof(SleepRepository);
    });
    it('should have a sleep property', function () {
      expect(repo).to.have.property('sleeps');
    });
    it('should have an id property', function () {
      expect(repo).to.have.property('id');
    });
    it('should have a method named `getAll`', function () {
      expect(repo).itself.to.respondsTo('getAll');
    });
    it('should have a method named `getAverageHoursSleptPerDay`', function () {
      expect(repo).itself.to.respondsTo('getAverageHoursSleptPerDay');
    });
    it('should have a method named `getAverageSleepQualityPerDay`', function () {
      expect(repo).itself.to.respondsTo('getAverageSleepQualityPerDay');
    });
    it('should have a method named `getSleptHoursByDate`', function () {
      expect(repo).itself.to.respondsTo('getSleptHoursByDate');
    });
    it('should have a method named `getSleepQualityByDate`', function () {
      expect(repo).itself.to.respondsTo('getSleepQualityByDate');
    });
    it('should have a method named `getSleptHoursByWeek`', function () {
      expect(repo).itself.to.respondsTo('getSleptHoursByWeek');
    });
    it('should have a method named `getSleepQualityByWeek`', function () {
      expect(repo).itself.to.respondsTo('getSleepQualityByWeek');
    });
    it('should have a method named `getSleepDataByWeek`', function () {
      expect(repo).itself.to.respondsTo('getSleepDataByWeek');
    });
    it('should have a method named `getByLastWeek`', function () {
      expect(repo).itself.to.respondsTo('getByLastWeek');
    });
    it('should have a method named `getByDate`', function () {
      expect(repo).itself.to.respondsTo('getByDate');
    });
    it('should have a method named `getAverageDataByMethodName`', function () {
      expect(repo).itself.to.respondsTo('getAverageDataByMethodName');
    });
    it('should have a method named `getAverageSleepQualityByAllId`', function () {
      expect(repo).itself.to.respondsTo('getAverageSleepQualityByAllId');
    });
  });
  describe('SleepRepository(sleepData)', function () {
    beforeEach(() => {
      repo = new SleepRepository(sleepData, 2);
    });
    it('should hold a sleeps array', function () {
      expect(repo).have.deep.property('sleeps', sleepObjData);
    });
    it('should hold an id', function () {
      expect(repo).have.property('id', 2);
    });
    it('should return all sleep data for the current user', function () {
      expect(repo.getAll()).to.deep.eq([
        new Sleep({"userID": 2, "date": "2019/06/15", "hoursSlept": 7, "sleepQuality": 4.7}),
        new Sleep({"userID": 2, "date": "2019/06/16", "hoursSlept": 7.5, "sleepQuality": 3.8}),
        new Sleep({"userID": 2, "date": "2019/06/17", "hoursSlept": 5.7, "sleepQuality": 3}),
        new Sleep({"userID": 2, "date": "2019/06/18", "hoursSlept": 10.8, "sleepQuality": 3.2}),
        new Sleep({"userID": 2, "date": "2019/06/19", "hoursSlept": 9.6, "sleepQuality": 2.5}),
        new Sleep({"userID": 2, "date": "2019/06/20", "hoursSlept": 10.1, "sleepQuality": 2.4}),
        new Sleep({"userID": 2, "date": "2019/06/21", "hoursSlept": 4.3, "sleepQuality": 4.8}), 
        new Sleep({"userID": 2, "date": "2019/06/22", "hoursSlept": 4.8, "sleepQuality": 3.3})
      ]);
    });
    it('should return average hours slept per day for the current user', function () {
      expect(repo.getAverageHoursSleptPerDay()).to.be.a('number')
        .eq((7 + 7.5 + 5.7 + 10.8 + 9.6 + 10.1 + 4.3 + 4.8) / 8);
    });
    it('should return average sleep quality per day for the current user', function () {
      expect(repo.getAverageSleepQualityPerDay()).to.be.a('number')
        .eq((4.7 + 3.8 + 3 + 3.2 + 2.5 + 2.4 + 4.8 + 3.3) / 8);
    });
    it('should return slept hours by date for the current user', function () {
      expect(repo.getSleptHoursByDate('2019/06/15')).to.be.a('number').eq(7);
    });
    it('should return sleep quality by date for the current user', function () {
      expect(repo.getSleepQualityByDate('2019/06/15')).to.be.a('number').eq(4.7);
    });
    it('should return slept hours by week for the current user', function () {
      expect(repo.getSleptHoursByWeek('2019/06/22')).to.be.an('array')
        .deep.eq([7.5, 5.7, 10.8, 9.6, 10.1, 4.3, 4.8]);
    });
    it('should return sleep quality by week for the current user', function () {
      expect(repo.getSleepQualityByWeek('2019/06/22')).to.be.an('array')
        .deep.eq([3.8, 3, 3.2, 2.5, 2.4, 4.8, 3.3]);
    });
    it('should return sleep objects by week for the current user', function () {
      expect(repo.getByLastWeek('2019/06/22')).to.be.an('array').deep.eq([
        new Sleep({"userID": 2, "date": "2019/06/16", "hoursSlept": 7.5, "sleepQuality": 3.8}),
        new Sleep({"userID": 2, "date": "2019/06/17", "hoursSlept": 5.7, "sleepQuality": 3}),
        new Sleep({"userID": 2, "date": "2019/06/18", "hoursSlept": 10.8, "sleepQuality": 3.2}),
        new Sleep({"userID": 2, "date": "2019/06/19", "hoursSlept": 9.6, "sleepQuality": 2.5}),
        new Sleep({"userID": 2, "date": "2019/06/20", "hoursSlept": 10.1, "sleepQuality": 2.4}),
        new Sleep({"userID": 2, "date": "2019/06/21", "hoursSlept": 4.3, "sleepQuality": 4.8}),
        new Sleep({"userID": 2, "date": "2019/06/22", "hoursSlept": 4.8, "sleepQuality": 3.3})]);
    });
    it('should return average sleep quality for all users', function () {
      expect(repo.getAverageSleepQualityByAllId()).to.be.a('number')
        .eq((2.2 + 4.7 + 4.7 + 3 + 3.6 + 2.9 + 2.6 + 3.5 + 2.2 + 3.8 + 3 + 3.2 + 2.5 + 2.4 + 4.8 + 3.3) / 16);
    });
    it('should get sleep object for the current user by date', function () {
      expect(repo.getByDate('2019/06/18')).to.be.an('object').deep.eq(new Sleep({"userID": 2, "date": "2019/06/18", "hoursSlept": 10.8, "sleepQuality": 3.2}));
    });
  });
});