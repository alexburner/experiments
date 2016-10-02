/**
 * Points class
 */

function Points() {

	this.points = {
		arr: [],
		map: {}
	};

	this.marks = {
		arr: [],
		map: {}
	};

	this.group = new paper.Group();

}

Points.isPointNearPoint = function (pointA, pointB) {
	var vector = pointA.subtract(pointB);
	return (vector.length < app.settings.tolerance);
};

Points.isPointNearShape = function (point, shape) {
	var hitResult = shape.hitTest(point, {
		tolerance: app.settings.tolerance,
		stroke: true
	});
	return (hitResult !== null);
};


Points.prototype.addPoint = function (point) {

	point = app.util.roundPoint(point);

	if (!this.hasPoint(point)) {

		// hack, steal cursor's circle
		var mark = new Cursor.Circle(point);

		// dim mark
		mark.style.strokeColor = app.settings.strokeColor_mark;

		if (app.settings.pointHiding) {
			mark.visible = false;
		}

		var pointStr = point.toString();
		this.points.map[pointStr] = point;
		this.marks.map[pointStr] = mark;

		this.points.arr.push(point);
		this.marks.arr.push(mark);

		this.group.addChild(mark);

	}

};


Points.prototype.hasPoint = function (targetPoint) {

	var hasPoint = false;

	this.points.arr.some(function (point) {
		if (app.util.equalish(point.x, targetPoint.x) &&
				app.util.equalish(point.y, targetPoint.y)) {
			hasPoint = true;
			return true;
		}
	});

	return hasPoint;

};


Points.prototype.findNewPoints = function (shape) {
	switch (shape.data.type) {
		case 'circle':
			this.findNewPointsCircle(shape);
			break;
		case 'line':
			this.findNewPointsLine(shape);
			break;
	}
};


Points.prototype.findNewPointsCircle = function (circle) {

	this.addPoint(circle.position);

	var shapes = app.shapes.getAll();
	for (var i = 0, l = shapes.length; i < l; i++) {
		var shape = shapes[i];
		if (shape.data.type === 'circle') {
			this.findNewIntersectionPointsCircles(circle, shape);
		} else {
			this.findNewIntersectionPointsShapes(circle, shape);
		}
	}

};


Points.prototype.findNewPointsLine = function (line) {
	var shapes = app.shapes.getAll();
	for (var i = 0, l = shapes.length; i < l; i++) {
		var shape = shapes[i];
		this.findNewIntersectionPointsShapes(line, shape);
	}
};


Points.prototype.findNewIntersectionPointsCircles = function (circleA, circleB) {
	var centerA = circleA.position;
	var centerB = circleB.position;
	var radiusA = circleA.data.radius;
	var radiusB = circleB.data.radius;
	var minRadius = Math.min(radiusA, radiusB);
	var maxRadius = Math.max(radiusA, radiusB);
	var bothRadius = radiusA + radiusB;
	var vector = centerA.subtract(centerB);
	var distance = app.util.roundish(vector.length);
	if (distance > app.settings.proximity) {
		if (app.util.equalish(distance, bothRadius)) {

			// kissing circles, find centroid
			this.addPoint(app.util.getCentroidPoint([centerA, centerB]));

		} else if (distance < bothRadius) {

			// overlapping circles, find intersections
			var intersections = circleA.getIntersections(circleB);

			if (distance < maxRadius) {

				// circles overlapping from inside, find intersections carefully
				if (intersections.length === 2) {

					// NOTE bug hackery
					// make sure these aren't too close too each other
					var intersectPointA = intersections[0].point;
					var intersectPointB = intersections[1].point;
					var intersectVector = intersectPointA.subtract(intersectPointB);
					var intersectDistance = app.util.roundish(intersectVector.length);
					if (intersectDistance > minRadius / 6) {
						// more than a 6th the smaller radius apart, i guess they're ok?
						this.addPoint(intersectPointA);
						this.addPoint(intersectPointB);
					}

				} else {

					// less than one or more than 2 intersections
					// something weird happened
					// disregard

				}

			} else {

				// circles overlapping from outside, find simple intersections
				for (var i = 0, l = intersections.length; i < l; i++) {
					var intersection = intersections[i];
					this.addPoint(intersection.point);
				}

			}
		}
	}
};


Points.prototype.findNewIntersectionPointsShapes = function (shapeA, shapeB) {

	var intersections = shapeA.getIntersections(shapeB);

	for (var i = 0, l = intersections.length; i < l; i++) {
		var intersection = intersections[i];
		this.addPoint(intersection.point);
	}

};