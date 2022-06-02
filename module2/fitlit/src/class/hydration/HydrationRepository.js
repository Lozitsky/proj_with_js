import Utils from "../Utils";
import Hydration from "./Hydration";

class HydrationRepository {
  constructor(data, id) {
    // this.hydrations = data;
    this.hydrations = data ? data.map(data => new Hydration(data)) : [];
    this.id = id;
  }

  getAll() {
    return this.hydrations.filter(hydr => hydr.getUserId() && hydr.getUserId() === this.id);
  }

  getByDate(date) {
    return this.hydrations.find(hydr => hydr.getUserId() && hydr.getUserId() === this.id && hydr.getDate() && hydr.getDate() === date);
  }

  getQuantity() {
    return this.getAll().length;
  }

  getByLastWeek(date) {
    return this.hydrations.filter(
      hydr => hydr.getUserId() === this.id
        && Utils.isSameWeek(hydr.getDate(), date));
  }

  getAverageHydration() {
    return this.hydrations.reduce((sum, hydr) => hydr.getUserId() === this.id ? sum + hydr.getNumOunces() : sum, 0) / this.getQuantity();
  }
}

export default HydrationRepository;