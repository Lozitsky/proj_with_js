class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }

  getId() {
    return this.activityData.userID;
  }

  getDate() {
    return this.activityData.date;
  }

  getNumSteps() {
    return this.activityData.numSteps;
  }

  getMinutesActive() {
    return this.activityData.minutesActive;
  }

  getStairClimbing() {
    return this.activityData.flightsOfStairs;
  }

  getMiles(strideLength) {
    return this.getNumSteps() * strideLength / 5280;
  }

  isReachStep(stepGoal) {
    return this.getNumSteps() >= stepGoal;
  }

}

export default Activity;