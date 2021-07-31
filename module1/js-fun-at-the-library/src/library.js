function createLibrary(name) {
    return {
        name: name,
        shelves: {
            fantasy: [],
            fiction: [],
            nonFiction: []
        }
    };
}

function addBook(lib, book) {
    lib.shelves[book.genre].push(book);
}

function checkoutBook(lib, title, genre) {
    let startL = lib.shelves[genre].length;

    lib.shelves[genre] = lib.shelves[genre].filter(el => el.title !== title);

    if (startL !== lib.shelves[genre].length) {
        return `You have now checked out ${title} from the ${lib.name}`;
    } else {
        return `Sorry, there are currently no copies of ${title} available at the ${lib.name}`;
    }

}

module.exports = {
    createLibrary,
    addBook,
    checkoutBook
};