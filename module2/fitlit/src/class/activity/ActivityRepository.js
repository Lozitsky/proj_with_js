import Activity from "./Activity";
import Utils from "../Utils";
import userRepo from "../user/UserRepository";

class ActivityRepository {
  constructor(activityData, id) {
    this.id = id;
    this.activities = activityData.map(data => new Activity(data)) || [];
  }

  getByDate(date) {
    return this.activities.find(data => data.getId() === this.id && data.getDate() === date);
  }

  getAverageActivityByWeek(date) {
    return this.activities.reduce((sum, activity) =>
      activity.getUserId() === this.id && Utils.isSameWeek(activity.getDate(), date)
      && sum + activity.getMinutesActive(), 0) / 7;
  }

  getExceededGoalDates() {
    return this.activities.reduce((arr, activity) =>
      activity.getNumSteps() > userRepo.getById(activity.getUserId()).getDailyStepGoal()
      && arr.push(activity.getDate()), []);
  }

  getClimbingRecord() {
    return this.activities.reduce((max, activity) => Math.max(max, activity.getStairClimbing()), 0);
  }

  getAverageForAllByDate(pred, date) {
    let result = this.activities.reduce((sum, activity) => activity.getDate() === date && activity[pred](), 0);
    return result / result.length;
  }

  getAverageNumStepsByDate(date) {
    return this.getAverageForAllByDate('getNumSteps', date);
  }

  getAverageMinutesActiveByDate(date) {
    return this.getAverageForAllByDate('getMinutesActive', date);
  }

  getAverageStairClimbingByDate(date) {
    return this.getAverageForAllByDate('getStairClimbing', date);
  }

}

export default ActivityRepository;