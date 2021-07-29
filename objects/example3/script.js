function getFrequencies(arr){
    let obj = {};
    let set = [];

    for (let el of arr) {
        if (set.includes(el)) {
            obj[el] = obj[el] + 1;
        } else {
            set.push(el);
            obj[el] = 1;
        }
    }

    return obj;
}

console.log(getFrequencies(["A", "B", "A", "A", "A"]));
console.log(getFrequencies([1, 2, 3, 3, 2]));
console.log(getFrequencies([true, false, true, false, false]));
console.log(getFrequencies([]));

