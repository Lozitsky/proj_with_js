 const chai = require('chai');
 const expect = chai.expect;
 const Box = require('../src/Box');

describe('Box', () => {
	describe('Simple tests', () => {
		var box = new Box();
		it('should have constructor named Box', () => {
			expect(box).to.be.instanceOf(Box);
		});
		it('constructor should has a default height and width of 100', () => {
			expect(box).to.have.property('width', 100);
			expect(box).to.have.property('height', 100);
		});
		it('Box object should has a method .calculateArea()', function () {
			expect(box).to.have.property('calculateArea');
		});
	});
	describe('Advanced tests', () => {
		let box;
		beforeEach(() => {
			box = new Box(50, 60);
		});

		it('should be able to pass in specific height and widths', function () {
			expect(box).to.property('width').to.equal(60);
			expect(box).to.property('height').to.equal(50);
		});
		it('.calculateArea() should be able to calculate the area', function () {
			expect(box.calculateArea()).to.equal(3000);
		});
		it('should be able increase the width by a provided value', function () {
			// box.increaseWidth(10);
			box.increase(10, 'width');
		});
		it('should be able increase the height by a provided value', function () {
			// box.increaseHeight(10);
			box.increase(10, 'height');
		});
	});
});
