import User from "./User";

class UserRepository {
  constructor(userData = []) {
    // this.userData = userData;
    this.users = userData.map(data => new User(data)) || [];
  }

  getAllUsers() {
    return this.users;
  }

  getQuantity() {
    return this.users.length;
  }

  getById(id) {
    return this.users.find(user => user.getId() === id);
  }

  getAverageStepGoal() {
    return this.users.reduce((sum, user) => user.getDailyStepGoal() + sum, 0) / this.getQuantity();
  }
}

export default UserRepository;