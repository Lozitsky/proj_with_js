import User from "./User";
import CallsLocalAPI from "../CallsLocalAPI";

class UserRepository {
  constructor(usersData) {
    this.usersData = usersData;
  }

  getUserById(id) {
    return new User(this.usersData.find(user => user.id === id) || []);
  }

  getAllUsers() {
    return CallsLocalAPI.getAllUsers();
  }
}

export default UserRepository;