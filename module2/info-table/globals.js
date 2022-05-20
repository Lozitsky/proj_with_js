class Globals {
  constructor() {
    this.prefix = 'goal';
  }

  static editClass(name) {
    this.prefix = name;
    console.log(this.prefix);
  }

  static getName() {
    return this.prefix;
  }
}

module.exports = {
  Globals,
  _styles: {
    prefix: Globals.getName(),
  }
};