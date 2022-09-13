 const chai = require('chai');
 const expect = chai.expect;
 const Box = require('../src/Box');

describe('Box', () => {
	var box = new Box();
	it('should have constructor named Box', () => {
		expect(box).to.be.instanceOf(Box);
	});

	it('constructor should has a default height and width of 100', () => {
		expect(box).to.have.property('width', 100);
		expect(box).to.have.property('height', 100);
	});
	it('should be able to pass in specific height and widths', function () {
		var box = new Box(50, 60);
		expect(box).to.property('width').to.equal(60);
		expect(box).to.property('height').to.equal(50);
	});
	it('Box object should has a method .calculateArea()', function () {
		expect(box).to.have.property('calculateArea');
	});

	it('.calculateArea() should be able to calculate the area', function () {
		var box2 = new Box(50, 60);
		expect(box2.calculateArea()).to.equal(3000);
	});
});
