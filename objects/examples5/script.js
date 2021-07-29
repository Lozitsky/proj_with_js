function getNoDuplicates(arr) {
    noDup = [];
    arr.forEach(el => {
    if (!noDup.includes(el)) {
        noDup.push(el);
    }});
    return noDup;
}

function makeSet(arr) {
    // let set = new Set(arr);
    return new Set(arr);

}

console.log(getNoDuplicates([1, 3, 3, 5, 5, 5]));
console.log(makeSet([1, 3, 3, 5, 5, 5]));
console.log(makeSet([4, 4, 4, 4]));
console.log(makeSet([5, 7, 8, 9, 10, 15]));