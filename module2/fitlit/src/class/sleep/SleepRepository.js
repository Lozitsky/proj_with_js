import Sleep from "./Sleep";
import Utils from "../Utils";

class SleepRepository {
  constructor(sleepData, id) {
    this.sleeps = sleepData.map(data => new Sleep(data));
    this.id = id;
  }

  getAll(id) {
    let ident = id ? id : this.id;
    return this.sleeps.filter(sleep => sleep.getId() === ident);
  }

  getAverageHoursSleptPerDay() {
    return this.getAverageDataByMethodName('getHoursSlept');
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
      sleep.getId() === this.id && Utils.isSameWeek(sleep.date, date) ? arr.push(sleep[data]()) : arr
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
      num++;
      return sleep.getId() === this.id ? sleep[method]() + sum : sum;
    }, 0) / num;
  }

  getAverageSleepQualityByAllId() {
    return this.sleeps.reduce((sum, sleep) =>
      sleep.getSleepQuality() + sum, 0) / this.sleeps.length;
  }
}

export default SleepRepository;
