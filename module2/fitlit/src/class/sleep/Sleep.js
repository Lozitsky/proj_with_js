class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getUserId() {
    return this.sleepData.userID;
  }

  getDate() {
    return this.sleepData.date ? this.sleepData.date
      : new Date().toLocaleDateString('en-ZA');
  }

  getSleptHours() {
    return this.sleepData.hoursSlept ? this.sleepData.hoursSlept : 0.0;
  }

  getSleepQuality() {
    return this.sleepData.sleepQuality ? this.sleepData.sleepQuality : 0.0;
  }
}

export default Sleep;
