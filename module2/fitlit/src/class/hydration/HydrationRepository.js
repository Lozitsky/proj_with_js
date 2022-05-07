import Utils from "../Utils";

class HydrationRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
  }

  getAll() {
    return this.data.filter(hydr => hydr.userID && hydr.userID === this.id);
  }

  getByDate(date) {
    return this.data.find(hydr => hydr.userID && hydr.userID === this.id && hydr.date && hydr.date === date);
  }

  getQuantity() {
    return this.getAll().length;
  }

  getByLastWeek(date) {
    return this.data.filter(
      hydr => hydr.userID === this.id
        && Utils.isSameWeek(hydr.date, date));
  }

  getAverageHydration() {
    return this.data.reduce((sum, hydr) => hydr.userID === this.id ? sum + hydr.numOunces : sum, 0) / this.getQuantity();
  }
}

export default HydrationRepository;