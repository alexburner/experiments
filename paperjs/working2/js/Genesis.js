/**
 * Genesis pattern factory
 */

function Genesis(center, radius, stage) {
	// elements
	this.center = center;
	this.circles = [];
	// attributes
	this.stage = stage;
	this.sizes = {};
	this.sizes.radius = radius;
	// construction
	this.makeCircles();
}


Genesis.prototype.makeCircles = function() {

	// create a delta vector for placing circles
	var shift = new paper.Point(this.center);
	shift.length = this.sizes.radius;

	// maintain a group for pattern rotation
	var group = new paper.Group();

	// draw 1-7 circles
	for (var i = 0, l = 7; i < l; i++) {
		var count = i + 1;
		
		// create & place & store circle
		var circle;
		if (count === 1) {
			circle = new shapes.Circle(this.center, this.sizes.radius);
		} else {
			shift.angle = 60 * (count - 2);
			circle = new shapes.Circle(
				this.center.add(shift),
				this.sizes.radius
			);
		}
		circle.position.x = util.roundish(circle.position.x);
		circle.position.y = util.roundish(circle.position.y);
		circle.data.index = i;
		this.circles.push(circle);
		group.addChild(circle);
	}

	// re-rotate on termination
	if (count === this.stage) {

		// upside down from original plan
		group.rotate(180, this.center);

		switch(count) {
			case 1:
				// 1(st)
				return;
			case 2:
				// 2(nd)
				group.rotate(90, this.center);
				return;
			case 3:
				// 3(rd)
				group.rotate(60, this.center);
				return;
			case 4:
				// 4(th)
				group.rotate(30, this.center);
				return;
			case 5:
				// 5(th)
				return;
			case 6:
				// 6(th)
				group.rotate(-30, this.center);
				return;
			case 7:
				// 7(th)
				group.rotate(30, this.center);
				return;
		}
	}

};