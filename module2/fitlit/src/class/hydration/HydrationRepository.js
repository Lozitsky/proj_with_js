import Utils from "../Utils";

class HydrationRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
  }

  getAll() {
    return this.data.filter(hydr => hydr.userID === this.id);
  }

  getByDate(date) {
    return this.data.find(hydr => hydr.userID === this.id && hydr.date === date);
  }

  getQuantity() {
    return this.getAll().length;
  }

  getByLastWeek(date) {
    const date2 = Utils.getDate(date);
    return this.data.filter(hydr =>
      hydr.userID === this.id
      && Utils.getDate(hydr.date) < date2
      && Utils.getDifferenceInDays(hydr.date, date2) < 8);
  }

  getAverageHydration() {
    return this.data.reduce((sum, hydr) => sum + hydr.numOunces, 0) / this.getQuantity();
  }
}

export default HydrationRepository;