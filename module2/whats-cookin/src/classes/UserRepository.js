import User from "./User";
import CallsLocalAPI from "../CallsLocalAPI";

class UserRepository {
  constructor(users) {
    this.users = users;
  }

  getUserById(id) {
    return new User(this.users.find(user => user.id === id) || []);
  }

  getAllUsers() {
    return CallsLocalAPI.getAllUsers();
  }
}

export default UserRepository;