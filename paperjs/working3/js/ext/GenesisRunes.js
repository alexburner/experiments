function CircleSet(circles) {
	this.all = circles || [];
	this.pointSet = null;
	this.facetSet = null;
}

CircleSet.prototype.makePoints = function () {};

CircleSet.prototype.makeFacets = function () {};


function PointSet(points) {
	this.all = points || [];
	this.lineSet = null;
}

PointSet.prototype.makeLines = function () {};


function LineSet(lines) {
	this.all = lines || [];
}


function FacetSet(facets) {
	this.all = facets || [];
}
