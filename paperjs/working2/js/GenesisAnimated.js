/**
 * GenesisPanel pattern factory
 */

function GenesisAnimation(radius, center, size) {
	// attributes
	this.center = center;
	this.radius = radius;
	this.vesica = util.getVesicaLength(this.radius);
	this.strange = util.getStrangeLength(this.radius, this.vesica);
	this.count = count;
	// animations
	this.frameQueue = [];
	this.frameHandler = new FrameHandler();
	// construction
	this.makeAnimationFrames();

	// FrameSeries
	// 
	// animation tweening
	// - start here
	// - end there
	// - move some
	// - each frame
}


Genesis.prototype.makeAnimationFrames = function () {
	this.frameQueue.concat(this.createFirstAnimationFrames);
	this.frameQueue.concat(this.createSixAnimationFrames);
};


Genesis.prototype.animateFrame = function (time) {
	if (!this.frameQueue.length) {
		// is complete
		return true;
	}
	// animate another frame
	var frame = this.frameQueue.shift();
	frame.call(this, time);
};


Genesis.prototype.createFirstAnimationFrames = function () {
	var frames = [];
	var circle = new shapes.Circle(this.center, this.radius * 2);

};


Genesis.prototype.createSixAnimationFrames = function () {
	var frames = [];
};


GenesisPanel.prototype.OLD_makeCircles = function() {
	
	// create a delta vector for placing circles
	var shift = new paper.Point(this.center);
	shift.length = this.radius;

	// maintain a group for pattern rotation
	var group = new paper.Group();

	// draw 1-7 circles
	for (var i = 0, l = 7; i < l; i++) {
		var count = i + 1;
		
		// create & place & store circle
		var circle;
		if (count == 1) {
			circle = new shapes.Circle(this.center, this.radius);
		} else {
			shift.angle = 60 * (count - 2);
			circle = new shapes.Circle(
				this.center.add(shift),
				this.radius
			);
		}
		circle.position.x = util.roundish(circle.position.x);
		circle.position.y = util.roundish(circle.position.y);
		circle.data.index = i;
		this.circles.push(circle);
		group.addChild(circle);
	}

};