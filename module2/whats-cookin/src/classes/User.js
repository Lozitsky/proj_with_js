/*global.localStorage = {
  data: {},
  getItem(key) {
    const val = this.data[key]
    if (val) {
      return val
    }
    return null
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  }
};*/

class User {
  constructor(name, id, pantry) {
    if (pantry === undefined && name !== undefined) {
      this.name = name.name;
      this.id = name.id;
      this.pantry = name.pantry;
    } else {
      this.name = name;
      this.id = id;
      this.pantry = pantry;
    }
    localStorage.setItem('userId', this.id);
  }
}



export default User;