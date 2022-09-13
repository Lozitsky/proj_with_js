class Box {
    constructor(height = 100, width = 100) {
        this.height = height;
        this.width = width;
    }

    calculateArea() {
        return this.height * this.width;
    }

    increaseWidth(value) {
        this.width += value;
    }

    increaseHeight(value) {
        this.height += value;
    }
}


module.exports = Box;
