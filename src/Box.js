class Box {
    constructor(height = 100, width = 100) {
        this.height = height;
        this.width = width;
    }

    calculateArea() {
        return this.height * this.width;
    }

    increase(value, prop) {
        this[prop] += value;
    }
}


module.exports = Box;
