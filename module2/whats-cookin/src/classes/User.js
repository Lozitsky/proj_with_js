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