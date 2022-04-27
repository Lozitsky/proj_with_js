class User {
    constructor(userData) {
        this.userData = userData;
    }

    getName() {
        return this.userData.name;
    }
}

export default User;