/**
 * Flower of life features
 * used for Vesica, Triad, Petal, etc
 * 
 */

function Facet (circles) {
	// attributes
	this.circles = circles;
	this.centers = undefined;
	this.centroid = undefined;
	// construction
	this.findCenters();
	this.findCentroid();
}

Facet.prototype.findCenters = function() {
	this.centers = this.circles.map(function (circle) {
		return circle.position;
	});
};

Facet.prototype.findCentroid = function() {
	this.centroid = util.getCentroid(this.centers);
};

/*
Facet.prototype.findPoints = function() {
	this.points = [];
	this.points = this.points.concat(this.centers);
	// TODO find circle intersections
};
*/