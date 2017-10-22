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
	this.intersect = undefined;
	// construction
	this.centers = circles.map(function (d) {return d.position;});
	this.centroid = util.getCentroid(this.centers);
}

Facet.prototype.makeIntersect = function() {
	this.circles.forEach(function (circle) {
		if (!this.intersect) this.intersect = circle;
		else this.intersect = this.intersect.intersect(circle);
	}, this);
};

Facet.prototype.drawIntersect = function() {
	if (!this.intersect) this.makeIntersect();
	this.intersect.strokeColor = shapes.strokeColor;
	this.intersect.opacity = 0.45;
};

Facet.prototype.laserScatter = function (color) {
	if (!this.intersect) this.drawIntersect();
	this.intersect.strokeColor = color || '#F00';
	this.intersect.opacity = 1;
	this.intersect.position = this.intersect.position.add(
		new paper.Point(
			Math.random() * 100,
			Math.random() * 100
		)
	);
};

/*
Facet.prototype.findPoints = function() {
	this.points = [];
	this.points = this.points.concat(this.centers);
	// TODO find circle intersections
};
*/