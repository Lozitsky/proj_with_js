class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getDate() {
    return this.hydrationData.date;
  }

  getNumOunces() {
    return this.hydrationData.numOunces;
  }
}

export default Hydration;