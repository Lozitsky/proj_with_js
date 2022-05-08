import Sleep from "./Sleep";
import Utils from "../Utils";

class SleepRepository {
  constructor(sleepData, id) {
    this.sleeps = sleepData ? sleepData.map(data => new Sleep(data)) : [];
    this.id = id;
  }

  getAll(id) {
    let ident = id ? id : this.id;
    return this.sleeps.filter(sleep => sleep.getUserId() === ident);
  }

  getAverageHoursSleptPerDay() {
    return this.getAverageDataByMethodName('getSleptHours');
  }

  getAverageSleepQualityPerDay() {
    return this.getAverageDataByMethodName('getSleepQuality');
  }

  getSleptHoursByDate(date) {
    return this.getByDate(date).getSleptHours();
  }

  getSleepQualityByDate(date) {
    return this.getByDate(date).getSleepQuality();
  }

  getSleptHoursByWeek(date) {
    return this.getSleepDataByWeek('getSleptHours', date);
  }

  getSleepQualityByWeek(date) {
    return this.getSleepDataByWeek('getSleepQuality', date);
  }

  getSleepDataByWeek(data, date) {
    return this.sleeps.reduce((arr, sleep) =>
      sleep.getUserId() === this.id && Utils.isSameWeek(sleep.date, date) ? arr.push(sleep[data]()) : arr
    , []);
  }

  getByLastWeek(date) {
    return this.sleeps.filter(
      sleep => sleep.userID === this.id
          && Utils.isSameWeek(sleep.date, date));
  }

  getByDate(date) {
    return this.sleeps.find(sleep => sleep.getDate() === date);
  }

  getAverageDataByMethodName(method) {
    let num = 0;
    return this.sleeps.reduce((sum, sleep) => {
      return sleep.getUserId() === this.id && ++num ? sleep[method]() + sum : sum;
    }, 0) / num;
  }

  getAverageSleepQualityByAllId() {
    return this.sleeps.reduce((sum, sleep) =>
      sleep.getSleepQuality() + sum, 0) / this.sleeps.length;
  }
}

export default SleepRepository;
