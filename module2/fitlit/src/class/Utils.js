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

  static isSameWeek(date1, date2) {
    const d2 = Utils.getDate(date2);
    const d1 = Utils.getDate(date1);
    return d1 <= d2
      && Utils.getDifferenceInDays(d1, d2) < 7;
  }

  static getDate(strDate) {
    return new Date(strDate);
  }

  static getRandomDate(repo) {
    return repo[Utils.getRandomIndex(repo)].date;
  }
}

export default Utils;