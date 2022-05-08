import {expect} from "chai";
import Sleep from "../src/class/sleep/Sleep";

const sleepData = {"userID": 1, "date": "2019/06/15", "hoursSlept": 6.1, "sleepQuality": 2.2}

describe('Sleep', function () {
  let sleep;
  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });
  describe('Sleep()', function () {
    beforeEach(() => {
      sleep = new Sleep();
    });
    it('should should be a sleep instance', function () {
      expect(sleep).to.be.an.instanceof(Sleep);
    });
    it('should have a sleepData property', function () {
      expect(sleep).to.have.a.property('sleepData');
    });
    it('should have a method named getUserId', function () {
      expect(sleep).itself.to.respondsTo('getUserId');
    });
    it('should have a method named getDate', function () {
      expect(sleep).itself.to.respondsTo('getDate');
    });
    it('should have a method named getSleptHours', function () {
      expect(sleep).itself.to.respondsTo('getSleptHours');
    });
    it('should have a method named getSleepQuality', function () {
      expect(sleep).itself.to.respondsTo('getSleepQuality');
    });
  });
  describe('Sleep(sleepData)', function () {
    beforeEach(() => {
      sleep = new Sleep(sleepData);
    });
    it('should hold a sleepData object', function () {
      expect(sleep).to.have.deep.property('sleepData');
    });
    it('should return id', function () {
      expect(sleep.getUserId()).to.be.a('number').eq(1);
    });
    it('should return Date', function () {
      expect(sleep.getDate()).to.be.a('string').eq('2019/06/15');
    });
    it('should return hours of slept', function () {
      expect(sleep.getSleptHours()).to.be.a('number').eq(6.1);
    });
    it('should return a sleep quality', function () {
      expect(sleep.getSleepQuality()).to.be.a('number').eq(2.2);
    });
  });
});

