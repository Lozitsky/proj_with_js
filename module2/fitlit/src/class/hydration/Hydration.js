class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getDate() {
    return this.hydrationData.data;
  }

  getNumOunces() {
    this.hydrationData.numOunces;
  }
}

export default Hydration;