/**
 * Util class
 */

function Util() {}

Util.prototype.roundish = function (number, precision) {
	precision = precision || app.settings.precision;
	return Math.round(number * precision) / precision;
};

Util.prototype.equalish = function (numberA, numberB, proximity) {
	proximity = proximity || app.settings.proximity;
	var diff = Math.abs(numberA - numberB);
	return (diff < proximity);
};

Util.prototype.roundPoint = function (point) {
	point.x = this.roundish(point.x);
	point.y = this.roundish(point.y);
	return point;
};

Util.prototype.getCentroidPoint = function (points) {
	var centroid = new paper.Point();
	for (var i = 0, l = points.length; i < l; i++) {
		var point = points[i];
		centroid = centroid.add(point);
	}
	return centroid.divide(points.length);
};