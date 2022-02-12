// import users from '../data/users';

import {getAllUsers} from "../apiCallsLocal";
import User from "./User";

class UserRepository {
  constructor(users) {
    this.users = users;
  }

  getUserById(id) {
    return new User(this.users.find(user => user.id === id) || []);
  }

  getAllUsers() {
    return getAllUsers();
  }
}

export default UserRepository;