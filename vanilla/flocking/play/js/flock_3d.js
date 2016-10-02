








/*

precendents

Boids
http://www.red3d.com/cwr/boids/

BREVE SWARM
http://faculty.hampshire.edu/lspector/pubs/spector-gecco2003.pdf

*/











//
// maths
// 



/**
 * 50%ish chance bool flag
 * @return {Boolean} Heads/tails
 */
function coinFlip() {
	return Math.random() > 0.5;
}


function getVectorLength(x, y, z) {
	z = z || 0;
	return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Contstain a number to +/- boundary
 * @param  {Number} number To constrain
 * @param  {Number} limit  +/- boundary
 * @return {Number}        Constrained number
 */
function limitNumber(number, limit) {
	if (number > limit) {
		number = limit;
	} else if (number < -1 * limit) {
		number = -1 * limit;
	}
	return number;
}

/**
 * Sum two vectors & normalize the result to null velocity change
 * @param  {Number} takerDX Absorber dx
 * @param  {Number} takerDY Absorber dy
 * @param  {Number} giverDX Absorbed dx
 * @param  {Number} giverDY Absorbed dy
 * @return {Object}         Resulting dx and dy
 */
function getNormalizedVectorSum(takerDX, takerDY, takerDZ, giverDX, giverDY, giverDZ) {
	var takerVectorLength = getVectorLength(takerDX, takerDY, takerDZ);
	var summedDX = takerDX + giverDX;
	var summedDY = takerDY + giverDY;
	var summedDZ = takerDZ + giverDZ;
	var summedVectorLength = getVectorLength(summedDX, summedDY, summedDZ);
	var normalize = takerVectorLength / summedVectorLength;
	return {
		dx: summedDX * normalize,
		dy: summedDY * normalize,
		dz: summedDZ * normalize
	};
}











//
// container
//


/**
 * Project parent element
 * @type {Object}
 */
var container = {};
container.width = window.innerWidth;
container.height = window.innerHeight;
container.depth = container.width + container.height / 2;
container.el = document.createElement('div');
container.el.setAttribute('id', 'container');
document.body.appendChild(container.el);
addEvent(window, 'resize', function (e) {
	container.width = window.innerWidth;
	container.height = window.innerHeight;
	container.depth = container.width + container.height / 2;
});







//
// canvas
//


var canvas = {};
canvas.el = document.createElement('canvas');
document.body.appendChild(canvas.el);
if (canvas.el.getContext){
	canvas.ctx = canvas.el.getContext('2d');
	canvas.el.width = container.width;
	canvas.el.height = container.height;
	addEvent(window, 'resize', function (e) {
		canvas.el.width = window.innerWidth;
		canvas.el.height = window.innerHeight;
	});
} else {
	canvas.ctx = undefined;
}









//
// keyboard
//


/**
 * Keyboard event handler
 * @param  {Object} e DOM Event
 * @return undefined
 */
addEvent(window, 'keydown', function (e) {
	e = e || window.event;
	switch (e.keyCode) {
		case 32:
			// spacebar pause
			e.preventDefault();
			frameHandler.togglePause();
			break;
	}
});








//
// cursor
//


/**
 * Floaty ball next to mouse pointer
 * @type {Object}
 */
var cursor = {
	el: document.createElement('div'),
	x: -1000,
	y: -1000,
	z: 0,
	is: undefined,
	NEUTRAL: 1,
	THREAT: 2,
	FOOD: 3,
	setState: function (state) {
		switch (state) {
			case cursor.NEUTRAL:
				cursor.is = cursor.NEUTRAL;
				cursor.el.setAttribute('class', 'neutral');
				break;
			case cursor.THREAT:
				cursor.is = cursor.THREAT;
				cursor.el.setAttribute('class', 'threat');
				break;
			case cursor.FOOD:
				cursor.is = cursor.FOOD;
				cursor.el.setAttribute('class', 'food');
				break;
		}
	},
	mousemove: function (e) {
		e = e || window.event;
		cursor.x = e.pageX;
		cursor.y = e.pageY;
		cursor.el.style.left = cursor.x + 'px';
		cursor.el.style.top = cursor.y + 'px';
	},
	mouseup: function (e) {
		if (cursor.is === cursor.FOOD) {
			cursor.setState(cursor.THREAT);
		} else if (cursor.is === cursor.THREAT) {
			cursor.setState(cursor.NEUTRAL);
		} else if (cursor.is === cursor.NEUTRAL) {
			cursor.setState(cursor.FOOD);
		}
	}
};

// set cursor state
cursor.setState(cursor.NEUTRAL);

// insert cursor into document
container.el.appendChild(cursor.el);

// add cursor event handlers
addEvent(window, 'mousemove', cursor.mousemove);
addEvent(window, 'mouseup', cursor.mouseup);














//
// the birds
//



/**
 * Global set of birds 
 * NOTE: birds need this for index-based self identity
 * @type {Array}
 */
var birds = [];


/**
 * Bird constructor
 * @return undefined
 */
function Bird() {
	// reference
	this.index = birds.length;
	birds.push(this);
	// size
	this.radius = {};
	this.radius.body = 5;
	this.radius.bubble = 50;
	this.radius.neighborhood = 2000;
	// coords
	this.x = Math.random() * container.width;
	this.y = Math.random() * container.height;
	this.z = Math.random() * container.depth;
	// delta
	this.dmax = 10;
	this.dx = Math.random() * 5;
	this.dy = Math.random() * 5;
	this.dz = Math.random() * 5;
	if (coinFlip()) {this.dx *= -1;}
	if (coinFlip()) {this.dy *= -1;}
	if (coinFlip()) {this.dz *= -1;}
	// elements
	this.el = document.createElement('div');
	this.el.setAttribute('class', 'bird');
	this.draw();
	container.el.appendChild(this.el);
	/*
	var r = coinFlip() ? 0 : 255;
	var g = coinFlip() ? 0 : 255;
	var b = coinFlip() ? 0 : 255;
	var a = 1;
	this.trailColor = "rgba("+r+","+g+","+b+","+a+")";
	*/
}

/**
 * Draw bird element
 * @return undefined
 */
Bird.prototype.draw = function() {
	this.el.style.left = this.x + 'px';
	this.el.style.top = this.y + 'px';

	this.radius.body = 10 * (this.z / container.depth / 2);

	this.radius.body *= this.radius.body;

	this.el.style.borderWidth = this.radius.body + 'px';
	this.el.style.zIndex = this.z;


	/*
	canvas.ctx.fillStyle = this.trailColor;
	canvas.ctx.fillRect(this.x, this.y, 1, 1);
	*/
};

/**
 * Update bird position with delta
 * @return undefined
 */
Bird.prototype.movePosition = function() {
	this.x += this.dx;
	this.y += this.dy;
	this.z += this.dz;
	this.infiniteEdges();
};

/**
 * Endless space, teleport birds on the edge
 * @return undefined
 */
Bird.prototype.infiniteEdges = function() {
	var compensate = this.radius.body;
	if (this.y < 0 - compensate) {
		// top edge
		this.y = container.height + compensate;
		this.x = container.width - this.x;
	} else if (this.y > container.height + compensate) {
		// bottom edge
		this.y = 0 - compensate;
		this.x = container.width - this.x;
	}
	if (this.x < 0 - compensate) {
		// left edge
		this.x = container.width + compensate;
		this.y = container.height - this.y;
	} else if (this.x > container.width + compensate) {
		// right edge
		this.x = 0 - compensate;
		this.y = container.height - this.y;
	}
};

/**
 * Bird react to neighbors
 * @return undefined
 */
Bird.prototype.handleNeighbors = function () {
	var neighborCount = 0;
	var neighborSumX = 0;
	var neighborSumY = 0;
	var neighborSumZ = 0;
	for (var i = 0, l = birds.length; i < l; i++) {
		if (i === this.index) {continue;}
		var that = birds[i];
		var xDiff = this.x - that.x;
		var yDiff = this.y - that.y;
		var zDiff = this.z - that.z;
		var distance = getVectorLength(xDiff, yDiff, zDiff);
		if (distance < this.radius.neighborhood) {
			if (distance < this.radius.bubble) {
				// "Separation: steer to avoid crowding local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					this.dz,
					xDiff / ((this.radius.bubble / distance) * 30),
					yDiff / ((this.radius.bubble / distance) * 30),
					zDiff / ((this.radius.bubble / distance) * 30)
				);
				this.dx = nvs.dx;
				this.dy = nvs.dy;
				this.dz = nvs.dz;
			} else {
				// "Alignment: steer towards the average heading of local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					this.dz,
					that.dx / ((this.radius.neighborhood / distance) * 60),
					that.dy / ((this.radius.neighborhood / distance) * 60),
					that.dz / ((this.radius.neighborhood / distance) * 60)
				);
				this.dx = nvs.dx;
				this.dy = nvs.dy;
				this.dz = nvs.dz;
			}
			neighborCount++;
			neighborSumX += that.x;
			neighborSumY += that.y;
			neighborSumZ += that.z;
		}
	}
	// "Cohesion: steer to move toward the average position of local flockmates"
	if (neighborCount) {
		var centeroidX = neighborSumX / neighborCount;
		var centeroidY = neighborSumY / neighborCount;
		var centeroidZ = neighborSumZ / neighborCount;
		var centroidDX = centeroidX - this.x;
		var centroidDY = centeroidX - this.y;
		var centroidDZ = centeroidZ - this.z;
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			this.dz,
			centroidDX / 100,
			centroidDY / 100,
			centroidDZ / 100
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
		this.dz = nvs.dz;
	}
};

/**
 * Bird react to cursor
 * @return undefined
 */
Bird.prototype.handleCursor = function () {
	switch (cursor.is) {
		case cursor.THREAT:
			this.avoidCoords(
				cursor.x,
				cursor.y,
				cursor.z
			);
			break;
		case cursor.FOOD:
			this.seekCoords(
				cursor.x,
				cursor.y,
				cursor.z
			);
			break;
	}
};

/**
 * Change bird vector away from location
 * @return undefined
 */
Bird.prototype.avoidCoords = function (x, y, z) {
	var range = this.radius.neighborhood;
	var C = 10; // magic coefficient
	var xDiff = this.x - x;
	var yDiff = this.y - y;
	var zDiff = this.z - z;
	var distance = getVectorLength(xDiff, yDiff, zDiff);
	if (distance < range) {
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			this.dz,
			xDiff / ((range / distance) * C),
			yDiff / ((range / distance) * C),
			zDiff / ((range / distance) * C)
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
		this.dz = nvs.dz;
	}
};

/**
 * Change bird vector towards location
 * @return undefined
 */
Bird.prototype.seekCoords = function (x, y, z) {
	var range = this.radius.neighborhood;
	var C = 10; // magic coefficient
	var xDiff = x - this.x;
	var yDiff = y - this.y;
	var zDiff = z - this.z;
	var distance = getVectorLength(xDiff, yDiff, zDiff);
	if (distance < range) {
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			this.dz,
			xDiff / ((range / distance) * C),
			yDiff / ((range / distance) * C),
			zDiff / ((range / distance) * C)
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
		this.dz = nvs.dz;
	}
};

/**
 * Shake up bird velocity
 * @return undefined
 */
Bird.prototype.randomizeMovement = function () {
	// dx
	if (coinFlip()) {
		var rdx = Math.random();
		if (coinFlip()) {rdx *= -1;}
		this.dx += rdx;
	}
	// dy
	if (coinFlip()) {
		var rdy = Math.random();
		if (coinFlip()) {rdy *= -1;}
		this.dy += rdy;
	}
	// dz
	if (coinFlip()) {
		var rdz = Math.random();
		if (coinFlip()) {rdz *= -1;}
		this.dz += rdz;
	}
};

/**
 * Limit bird velocity
 * @return undefined
 */
Bird.prototype.speedLimit = function () {
	this.dx = limitNumber(this.dx, this.dmax);
	this.dy = limitNumber(this.dy, this.dmax);
	this.dz = limitNumber(this.dz, this.dmax);
};

/**
 * Animate one frame of the bird
 * @return undefined
 */
Bird.prototype.animateFrame = function() {
	// dx, dy, dz stuff
	this.handleNeighbors();
	this.handleCursor();
	this.randomizeMovement();
	this.speedLimit();
	// x, y, z stuff
	this.movePosition();
	// draw element
	this.draw();
};














//
// page start
//



/**
 * Get everything happening
 * @return undefined
 */
function execute() {
	// make birds
	var count = 0;
	while(count < 100) {
		var bird = new Bird();
		frameHandler.addAnimation(bird.animateFrame, bird);
		count++;
	}
	// run animations
	frameHandler.start();
}

execute();