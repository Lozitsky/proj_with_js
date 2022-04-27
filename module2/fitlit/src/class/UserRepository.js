class UserRepository {
    constructor(data) {
        this.data = [...data];
    }

    getUserData(id) {
        return this.data.find(user => user.id === id);
    }

    getAverageStepGoal() {
        return this.data.reduce((sum, user) => user.dailyStepGoal + sum, 0);
    }
}

export default UserRepository;