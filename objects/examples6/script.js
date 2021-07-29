function spellOut(str) {
    const arr = str.split('');
    let s = "";
    const newArr = []
    arr.forEach(el => {
        s += el;
        newArr.push(s);
    });
    return newArr;
}

console.log(spellOut("bee"));
console.log(spellOut("happy"));
console.log(spellOut("eagerly"));
