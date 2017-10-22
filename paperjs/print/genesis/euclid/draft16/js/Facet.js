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
    this.intersect.strokeWidth = shapes.strokeWidth;
	this.intersect.opacity = shapes.opacity;
};