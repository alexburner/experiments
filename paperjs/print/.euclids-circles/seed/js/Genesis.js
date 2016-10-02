/**
 * Genesis pattern factory
 * @param {map} settings = {
 *                       stage, // number of circles
 *                       radius, // first radius
 *                       origin, // first point
 *                       bounds, // boundary rect
 *                       group} // paper element group
 */
function Genesis(settings) {
	// elements
	this.origin = settings.origin;
	this.bounds = settings.bounds;
	this.group = settings.group;
	this.circles = [];
	this.points = [];
	// attributes
	this.stage = settings.stage;
	this.sizes = {};
	this.sizes.radius = settings.radius;
	this.sizes.vesica = util.getVesicaLength(this.sizes.radius);
	this.sizes.strange = util.getStrangeLength(this.sizes.radius, this.sizes.vesica);
	this.sizes.petal = util.getPetalWidth(this.sizes.radius, this.sizes.vesica);
	// construction
	this.makeCircles();
	this.makePoints();
}


Genesis.prototype.extend = function (extension) {
	new extension(this);
};


Genesis.prototype.makeCircles = function() {
	
	// create a delta vector for moving circles
	var centerVector = new paper.Point(this.origin);
	centerVector.length = this.sizes.radius;

	// maintain a group for pattern rotation
	var rGroup = new paper.Group();

	// draw 1-7 circles
	for (var i = 0, l = 7; i < l; i++) {
		var stage = i + 1;
		
		// create & move & store circle
		var circle;
		if (stage===1) {
			circle = new shapes.Circle(this.origin, this.sizes.radius);
		} else {
			centerVector.angle = 60 * (stage - 2);
			circle = new shapes.Circle(
				this.origin.add(centerVector),
				this.sizes.radius
			);
		}
		circle.position.x = util.roundish(circle.position.x);
		circle.position.y = util.roundish(circle.position.y);
		circle.data.index = i;
		this.circles.push(circle);
		//this.group.insertChild(0, circle);
		rGroup.addChild(circle);

		// terminate appropriately
		if (stage === this.stage) {

			// upside down from original plan
			rGroup.rotate(180, this.origin);

			switch(stage) {
				case 1:
					// 1(st)
					return;
				case 2:
					// 2(nd)
					rGroup.rotate(90, this.origin);
					return;
				case 3:
					// 3(rd)
					rGroup.rotate(60, this.origin);
					return;
				case 4:
					// 4(th)
					rGroup.rotate(30, this.origin);
					return;
				case 5:
					// 5(th)
					return;
				case 6:
					// 6(th)
					rGroup.rotate(-30, this.origin);
					return;
				case 7:
					// 7(th)
					rGroup.rotate(30, this.origin);
					return;
			}
		}

	}

	// cleanup
	rGroup.reduce();

};


Genesis.prototype.makePoints = function() {

	// only one for one
	if (this.stage === 1) {
		this.points.push(this.origin);
		return;
	}

	// point tracking
	var pointExists = {};

	// find all circle center points
	this.circles.forEach(function (circle) {
		var point = circle.position;
		point.x = util.roundish(point.x);
		point.y = util.roundish(point.y);
		pointExists[point.toString()] = true;
		this.points.push(point);
	}, this);

	// find all circle intersection points
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			// skip self
			if (indexA === indexB) return;
			// only check radius neighbors
			var distance = util.roundish(circleA.position.subtract(circleB.position).length);
			if (distance > this.sizes.radius) return;
			var intersects = circleA.getIntersections(circleB);
			intersects.forEach(function (intersect) {
				// prep point
				var point = intersect.point;
				point.x = util.roundish(point.x);
				point.y = util.roundish(point.y);
				// add if unique
				if (!pointExists[point.toString()]) {
					this.points.push(point);
					pointExists[point.toString()] = true;
				}
			}, this);
		}, this);
	}, this);

};


Genesis.prototype.markPoints = function () {
	this.points.forEach(function (point) {
		var mark = new shapes.Mark(point);
		//this.group.insertChild(0, mark);
	}, this);
};