class User {
  constructor(userData) {
    this.userData = userData;
  }

  getId() {
    return this.userData.id;
  }

  getName() {
    return this.userData.name.split(' ')[0];
  }

  getFullname() {
    return this.userData.name;
  }

  getAddress() {
    return this.userData.address;
  }

  getEmail() {
    return this.userData.email;
  }

  getStrideLength() {
    return this.userData.strideLength;
  }

  getDailyStepGoal() {
    return this.userData.dailyStepGoal;
  }

  getFriends() {
    return this.userData.friends;
  }

}

export default User;