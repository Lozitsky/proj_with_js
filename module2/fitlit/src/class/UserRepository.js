class UserRepository {
  constructor(data) {
    this.data = data;
  }

  getAllUsers() {
    return this.data;
  }

  getQuantity() {
    return this.data.length;
  }

  getUserData(id) {
    return this.data.find(user => user.id === id);
  }

  getAverageStepGoal() {
    return this.data.reduce((sum, user) => user.dailyStepGoal + sum, 0) / this.getQuantity();
  }
}

export default UserRepository;