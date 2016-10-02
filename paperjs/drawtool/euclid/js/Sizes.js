/**
 * Sizes class
 */

function Sizes() {
	this.radius = NaN;
	this.diameter = NaN;
}

Sizes.prototype.set = function (radius) {
	radius = Number(radius);
	if (isNaN(radius)) return;
	this.radius = radius;
	this.diameter = this.radius * 2;
};