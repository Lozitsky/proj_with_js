class Utils {
  constructor() {
  }
  static getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  static getDifferenceInDays(date1, date2) {
    let difTime = date2.getTime() - date1.getTime();
    return difTime / (1000 * 3600 * 24);
  }

  static getDate(strDate) {
    return new Date(strDate);
  }

  static getRandomDate(repo) {
    return repo[Utils.getRandomIndex(repo)].date;
  }
}

export default Utils;