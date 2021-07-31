function createTitle(title) {
    return `The ${title}`;
}

function buildMainCharacter(name, age, pronouns) {
    return {name: name, age: age, pronouns: pronouns};
}

function saveReview(str, arr) {
    if (!arr.includes(str)) {
        arr.push(str);
    }
}

function calculatePageCount(title) {
    return title.length * 20;
}

function writeBook(title, mainCharacter, genre) {
    return {title: title, mainCharacter: mainCharacter, pageCount: calculatePageCount(title), genre: genre};
}

function editBook(book) {
    book.pageCount = Math.floor((book.pageCount)/4*3);
}

module.exports = {
    createTitle,
    buildMainCharacter,
    saveReview,
    calculatePageCount,
    writeBook,
    editBook
}