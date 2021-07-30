const colors = ['Red', 6, 'Green'];
const randomItems = [1, 'Green', 'pink', true];


function lowerCaseStrings(arr) {
    return arr.map(value => typeof value === 'string' ? value.toLowerCase() : value)
}

console.log(lowerCaseStrings(colors));

console.log(lowerCaseStrings(randomItems));
