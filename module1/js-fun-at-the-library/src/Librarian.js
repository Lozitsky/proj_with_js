const {createLibrary, addBook} = require("../src/library.js");

class Librarian {

  constructor(name, lib) {
    this.name = name;
    this.library = lib;
  }

  greetPatron(name, morning) {
    return morning ? `Good morning, ${name}!` : `Hello, ${name}!`;
  }

  findBook(title) {
    for (let genre of Object.getOwnPropertyNames(this.library.shelves)) {
      for (let book of this.library.shelves[genre]) {
        if (book.title === title) {
          this.library.shelves[genre] = this.library.shelves[genre].filter(el => el.title !== title);
          return `Yes, we have ${title}`;
        } else {
          return `Sorry, we do not have ${title}`;
        }
      }
    }
  }

  calculateLateFee(days) {
    return Math.ceil(days * 0.25);
  }
}

module.exports = Librarian;

