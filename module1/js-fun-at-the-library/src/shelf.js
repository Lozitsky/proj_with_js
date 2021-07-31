function shelfBook(obj, arr) {
    if (arr.length < 3) {
        arr.unshift(obj);
    }
}

function unshelfBook(title, arr) {
    // var newArr = [];
    /*    newArr = arr.filter(el => el.title !== title);
        arr = newArr;
        return newArr;*/
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].title === title) {
            arr = arr.splice(i, 1);
            // arr = newArr;
            // return newArr;
            return;
        }
    }
}

function listTitles(arr) {
    var list = [];
    for (let i = 0; i < arr.length; i++) {
        list.push(arr[i].title);
    }
    return list.join(", ");
}

function searchShelf(arr, title) {
    return arr.find(el => el.title === title) !== undefined;
}

module.exports = {
  shelfBook,
  unshelfBook,
  listTitles,
  searchShelf
};