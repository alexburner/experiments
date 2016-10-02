/**
 * Flower of life pattern generator
 */

function Flower (center, circle, radius, rings) {
	
	// elements
	this.center = center;
	this.symbol = new paper.Symbol(circle);
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
	this.symbolExists = {}; // pointString -> boolean
	this.pointQueue = []; // for BFS child traversal
	
	// draw first symbol
	this.symbolExists[this.center.toString()] = true;
	var symbol = this.symbol.place(this.center);
	this.pointQueue.push(this.center);
	this.group.addChild(symbol);
	this.count = 1;
	
	// use queue to draw children BFS style
	while (this.pointQueue.length) {
		this.drawChildren(this.pointQueue.shift());
	}
	
	// clean up data structures
	delete this.symbolExists;
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

	// create & place pattern symbols
	for (var i = 0, l = 6; i < l; i++) {
		// rotate placement vector
		shiftVector.angle = i * 60;
		// create point in new place, round coords
		var newPoint = point.add(shiftVector);
		newPoint.x = util.roundish(newPoint.x);
		newPoint.y = util.roundish(newPoint.y);
		// make sure symbol doesn't already exist
		if (!this.symbolExists[newPoint.toString()]) {
			// create new symbol
			this.symbolExists[newPoint.toString()] = true;
			var symbol = this.symbol.place(newPoint);
			newPoints.push(newPoint);
			this.group.addChild(symbol);
			this.count++;
		}
	}

	// add symbol points to queue (to get their kids drawn)
	newPoints.forEach(function (point) {
		this.pointQueue.push(point);
	}, this);

};