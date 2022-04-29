class Utils {
  constructor() {
  }
  static getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}

export default Utils;