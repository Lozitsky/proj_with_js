function isIsogram(str) {
    // const arr = str.split(' ').join('').split('-').join('').split('');
    const arr = str.replace(/[\s-]+/g,'').split('');

    const set = new Set(arr);
    // console.log(arr);
    return arr.length === set.size;
}

console.log(isIsogram('duplicates'));
console.log(isIsogram('eleven'));
console.log(isIsogram('subdermatoglyphic'));
console.log(isIsogram('alphabet'));
console.log(isIsogram('éléphant'));
console.log(isIsogram('six-year-old'));