/**
 * Flower of life pattern generator
 */

function Flower (center, circle, radius, rings) {

	// elements
	this.center = center;
	this.circle = circle;
	this.group = new paper.Group();

	// attributes
	this.radius = radius;
	this.limit = util.getFlowerCount(rings);
	this.count = 0;

	// construction
	this.drawPattern();

}


Flower.prototype.drawPattern = function () {

	// prepare data structures
	this.circleExists = {}; // pointString -> boolean
	this.pointQueue = []; // for BFS child traversal

	// draw first circle
	this.circleExists[this.center.toString()] = true;
	this.circle.position = (this.center);
	this.pointQueue.push(this.center);
	this.group.addChild(this.circle);
	this.count = 1;

	// use queue to draw children BFS style
	while (this.pointQueue.length) {
		this.drawChildren(this.pointQueue.shift());
	}

	// clean up data structures
	delete this.circleExists;
	delete this.pointQueue;

};


Flower.prototype.drawChildren = function (point) {

	// stop at limit
	if (this.count >= this.limit) return;

	// create a delta vector (for placement)
	var shiftVector = new paper.Point(point);
	shiftVector.length = this.radius;

	// save points found (for queue)
	var newPoints = [];

	// create & place pattern circles
	for (var i = 0, l = 6; i < l; i++) {
		// rotate placement vector
		shiftVector.angle = i * 60;
		// create point in new place, round coords
		var newPoint = point.add(shiftVector);
		newPoint.x = util.roundish(newPoint.x);
		newPoint.y = util.roundish(newPoint.y);
		// make sure circle doesn't already exist
		if (!this.circleExists[newPoint.toString()]) {
			// create new circle
			this.circleExists[newPoint.toString()] = true;
			var circle = this.circle.clone();
			circle.position = newPoint;
			newPoints.push(newPoint);
			this.group.addChild(circle);
			this.count++;
		}
	}

	// add circle points to queue (to get their kids drawn)
	newPoints.forEach(function (point) {
		this.pointQueue.push(point);
	}, this);

};