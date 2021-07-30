const sheep = [
    true, true, true, false,
    true, true, true, true,
    true, false, true, false,
    true, false, false, true,
    true, true, true, true,
    false, false, true, true
];

function countSheep(sheep) {
    return  sheep.filter(el => el === true).length;
}

console.log(countSheep(sheep));