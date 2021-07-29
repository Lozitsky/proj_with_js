function checkIfDataIsSame(obj, anObj) {
    let keys = Object.keys(obj).sort();
    let v = true;
    if (keys.toString() === Object.keys(anObj).sort().toString()) {
        // keys.forEach(key => v *= (obj[key] === anObj[key]));

        for (let i = 0; i < keys.length; i++) {
            v *= obj[keys[i]] === anObj[keys[i]];
        }
    }
    return v === 1;
}


console.log(
    checkIfDataIsSame({
        name: "Benny",
        phone: "3325558745",
        email: "benny@edabit.com"
    }, {
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com"
    }));

console.log(
    checkIfDataIsSame({
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com"
    }, {
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com"
    }));