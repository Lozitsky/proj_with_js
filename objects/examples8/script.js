function isPangram(str) {
    const abc = 'abcdefghijklmnopqrstuvwxyz';
    const set = new Set(str.toLowerCase().replace(/[^A-Za-z]+/g,'').split('').sort());

    // console.log([...set].toString());
    return abc === [...set].join('').toString();
}


console.log(isPangram('abcdefghijklmnopqrstuvwxyz'));
console.log(isPangram('the quick brown fox jumps over the lazy dog'));
console.log(isPangram('the_quick_brown_fox_jumps_over_the_lazy_dog'));
console.log(isPangram('a quick movement of the enemy will jeopardize five gunboats'));
