/**
 * Utilities
 */

var util = {
	
	roundish: function (number, precision) {
		precision = precision || 28;
		return Math.round(number * precision) / precision;
	},

	getVesicaLength: function (radius) {
		return util.roundish(
			radius * Math.sqrt(3)
		);
	},

	getStrangeLength: function (radius, vesica) {
		return util.roundish(
			Math.sqrt(
				Math.pow(radius / 2, 2) +
				Math.pow((3 * vesica) / 2, 2)
			)
		);
	},

	getPetalWidth: function (radius, vesica) {
		return util.roundish(
			radius * 2 - vesica
		);
	},

	getCentroid: function (points) {
		var centroid = new paper.Point();
		points.forEach(function (point) {
			centroid = centroid.add(point);
		});
		return centroid.divide(points.length);
	},

	getConfinedPoint: function (inPoint, outPoint, box) {
		var tempLine = new shapes.Line(inPoint, outPoint);
		var intersect = box.getIntersections(tempLine)[0].point;
		tempLine.remove();
		return intersect;
	},

	getFlowerCount: function (rings) {
		// center circle
		var count = 1;
		// each ring adds i * 6 more circles to total
		for (var i = 1, l = rings; i < l; i++) {
			count += i * 6;
		}
		return count;
	}

};