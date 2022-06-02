class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getUserId() {
    return this.hydrationData.userID;
  }

  getDate() {
    return this.hydrationData.date;
  }

  getNumOunces() {
    return this.hydrationData.numOunces;
  }
}

export default Hydration;