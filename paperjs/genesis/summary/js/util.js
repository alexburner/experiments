/**
 * Utilities
 */

var util = {

	precision: 28,
	proximity: 5,

	roundish: function (number, precision) {
		precision = precision || util.precision;
		return Math.round(number * precision) / precision;
	},

	newroundish: function (number, precision) {
		precision = precision || util.precision;
		return Number((Number(number)).toFixed(precision));
	},

	roundishPoint: function (point) {
		point.x = util.roundish(point.x);
		point.y = util.roundish(point.y);
		return point;
	},

	areEqualish: function (numA, numB) {
		return (Math.abs(numA - numB) < util.proximity);
	},

	arePointsEqualish: function (pointA, pointB) {
		if (!util.areEqualish(pointA.x, pointB.x)) return false;
		if (!util.areEqualish(pointA.y, pointB.y)) return false;
		return true;
	},

	isPointInPointsish: function (testPoint, points) {
		var isIn = false;
		points.some(function (point) {
			if (util.arePointsEqualish(point, testPoint)) {
				isIn = true;
				return true;
			}
		});
		return isIn;
	},

	getVesicaLength: function (radius) {
		return util.roundish(
			radius * Math.sqrt(3)
		);
	},

	getStrangeLength: function (radius, vesica) {
		return util.roundish(
			Math.sqrt(7 * radius * radius)
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
	},

	getCirclePoints: function (circles) {
		var points = [];
		circles.forEach(function (circle) {
			var point = util.roundishPoint(circle.position);
			points.push(point);
		});
		circles.forEach(function (circleA, indexA) {
			var diameter = circleA.bounds.width;
			var centerA = util.roundishPoint(circleA.position);
			circles.forEach(function (circleB, indexB) {
				if (indexA === indexB) return;
				var centerB = util.roundishPoint(circleB.position);
				var distance = util.roundish(centerA.subtract(centerB).length);
				if (distance > diameter) return;
				if (distance === diameter) {
					var point = util.roundishPoint(util.getCentroid([centerA, centerB]));
					if (!util.isPointInPointsish(point, points)) {
						points.push(point);
					}
				} else {
					var intersects = circleA.getIntersections(circleB);
					intersects.forEach(function (intersect) {
						// prep point
						var point = util.roundishPoint(intersect.point);
						// add if unique
						if (!util.isPointInPointsish(point, points)) {
							points.push(point);
						}
					});
				}
			});
		});
		return points;
	}

};