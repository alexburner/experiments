/**
 * GenesisPanel pattern factory
 */

function GenesisPanel(stage, radius, origin, size, inplace) {
	// elements
	this.panel = new shapes.Panel(origin, size);
	this.bounds = this.panel.bounds;
	this.center = this.panel.position;
	this.group = new paper.Group();
	this.circles = [];
	this.points = [];
	// attributes
	this.stage = stage;
	this.sizes = {};
	this.sizes.radius = radius;
	this.sizes.vesica = util.getVesicaLength(this.sizes.radius);
	this.sizes.strange = util.getStrangeLength(this.sizes.radius, this.sizes.vesica);
	this.sizes.petal = util.getPetalWidth(this.sizes.radius, this.sizes.vesica);
	// construction
	this.makeCircles(inplace);
	this.makePoints();
}


GenesisPanel.prototype.extend = function (extension) {
	new extension(this);
};


GenesisPanel.prototype.makeCircles = function (inplace) {

	// create a delta vector for moving circles
	var centerVector = new paper.Point(this.center);
	centerVector.length = this.sizes.radius;

	// draw 1-7 circles
	for (var i = 0, l = 7; i < l; i++) {
		var stage = i + 1;

		// create & move & store circle
		var circle;
		if (stage===1) {
			circle = new shapes.Circle(this.center, this.sizes.radius);
		} else {
			centerVector.angle = 60 * (stage - 2);
			circle = new shapes.Circle(
				this.center.add(centerVector),
				this.sizes.radius
			);
		}
		circle.position.x = util.roundish(circle.position.x);
		circle.position.y = util.roundish(circle.position.y);
		circle.data.index = i;
		this.circles.push(circle);
		this.group.addChild(circle);

		// terminate appropriately
		if (stage === this.stage) {

            // skip rotations?
            if (inplace) {
                // this.group.rotate(90, this.center);
                return;
            }

			// upside down from original plan
			this.group.rotate(180, this.center);

			switch(stage) {
				case 1:
					// 1(st)
					return;
				case 2:
					// 2(nd)
					this.group.rotate(90, this.center);
					return;
				case 3:
					// 3(rd)
					this.group.rotate(60, this.center);
					return;
				case 4:
					// 4(th)
					this.group.rotate(30, this.center);
					return;
				case 5:
					// 5(th)
					return;
				case 6:
					// 6(th)
					this.group.rotate(-30, this.center);
					return;
				case 7:
					// 7(th)
					this.group.rotate(30, this.center);
					return;
			}
		}

	}

};


GenesisPanel.prototype.makePoints = function() {

	// only one for one
	if (this.stage === 1) {
		this.points.push(this.center);
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


GenesisPanel.prototype.markPoints = function () {
	this.points.forEach(function (point) {
		var mark = new shapes.Mark(point);
		this.group.addChild(mark);
	}, this);
};


GenesisPanel.prototype.hideCircles = function () {
	this.circles.forEach(function (circle) {
		circle.opacity = 0;
	}, this);
};


// GenesisPanel.prototype.rotateOrigin = function () {
// 	// origin is fulcrum
// 	var point = this.center;
// 	// rotate paper group
// 	switch (this.stage) {
// 		case 2:
// 			this.group.rotate(180, point);
// 			break;
// 		case 3:
// 			this.group.rotate(180, point);
// 			break;
// 		case 4:
// 			this.group.rotate(180, point);
// 			break;
// 		case 5:
// 			this.group.rotate(180, point);
// 			break;
// 		case 6:
// 			this.group.rotate(180, point);
// 			break;
// 		case 7:
// 			this.group.rotate(180, point);
// 			break;
// 		case 8:
// 			this.group.rotate(180, point);
// 			break;
// 	}
// 	// remake points
// 	this.points = [];
// 	this.makePoints();
// };

// GenesisPanel.prototype.rotateCentroid = function () {
// 	// centroid is fulcrum
// 	var point = util.getCentroid(this.points);
// 	// rotate paper group
// 	switch (this.stage) {
// 		case 2:
// 			this.group.rotate(90, point);
// 			break;
// 		case 3:
// 			this.group.rotate(60, point);
// 			break;
// 		case 4:
// 			this.group.rotate(90, point);
// 			break;
// 		case 5:
// 			this.group.rotate(180, point);
// 			break;
// 		case 6:
// 			this.group.rotate(180, point);
// 			break;
// 		case 7:
// 			this.group.rotate(30, point);
// 			break;
// 		case 8:
// 			this.group.rotate(30, point);
// 			break;
// 	}
// 	// remake points
// 	this.points = [];
// 	this.makePoints();
// };


GenesisPanel.prototype.doubleOrigin = function () {
	var clone = this.group.clone();
	var point = this.center;
	switch (this.stage) {
		case 2:
			clone.rotate(180, point);
			break;
		case 3:
			clone.rotate(180, point);
			break;
		case 4:
			clone.rotate(180, point);
			break;
		case 5:
			clone.rotate(180, point);
			break;
		case 6:
			clone.rotate(180, point);
			break;
		case 7:
			clone.rotate(180, point);
			break;
		case 8:
			clone.rotate(180, point);
			break;
	}
};


GenesisPanel.prototype.doubleCentroid = function () {
	var clone = this.group.clone();
	var point = util.getCentroid(this.points);
	switch (this.stage) {
		case 2:
			clone.rotate(90, point);
			break;
		case 3:
			clone.rotate(60, point);
			break;
		case 4:
			clone.rotate(90, point);
			break;
		case 5:
			clone.rotate(180, point);
			break;
		case 6:
			clone.rotate(180, point);
			break;
		case 7:
			clone.rotate(30, point);
			break;
		case 8:
			clone.rotate(30, point);
			break;
	}
};
