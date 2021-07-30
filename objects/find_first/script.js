const variousThings = [
    true, true, true, false,
    true, true, 1, true,
    true, false, true, false,
    true, 'hello', false, true,
    true, true, true, true,
    false, false, 'world', true
];


function findFirstString(str) {
    let el = str.find(value => typeof value === 'object');
    return el ? el : false;
}

console.log(findFirstString(variousThings));