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
    const date2 = Utils.getDate(date);
    return this.data.filter(hydr => {
      let date1 = Utils.getDate(hydr.date);
      return hydr.userID === this.id
        && date1 <= date2
        && Utils.getDifferenceInDays(date1, date2) < 7;
    });
  }

  getAverageHydration() {
    return this.data.reduce((sum, hydr) => hydr.userID === this.id ? sum + hydr.numOunces : sum, 0) / this.getQuantity();
  }
}

export default HydrationRepository;