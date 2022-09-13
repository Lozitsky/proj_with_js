class Box {
	constructor(height = 100, width = 100) {
		this.height = height;
		this.width = width;
	}

	calculateArea() {
		return this.height * this.width;
	}
}


 module.exports = Box;
