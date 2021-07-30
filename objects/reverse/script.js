const words = ['hi', 'hello', 'carrot', 'world'];


function reverseAlphaWords(arr) {
    // return arr.map(el => el.split('').reverse().join(''));
    return arr.map(el => reverseString(el));
}

/*function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}*/

function reverseString(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

console.log(reverseAlphaWords(words));