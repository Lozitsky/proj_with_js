// import users from '../data/users';

import user from "./User";

class UserRepository {
    constructor(users) {
        this.users = users;
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
}

export default UserRepository;