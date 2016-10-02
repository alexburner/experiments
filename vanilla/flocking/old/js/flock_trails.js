








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

/**
 * Pythagorean theorem a & b into c
 * @param  {Number} x A
 * @param  {Number} y B
 * @return {Number}   C
 */
function getHypotenuse(x, y) {
	return Math.sqrt(x * x + y * y);
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
function getNormalizedVectorSum(takerDX, takerDY, giverDX, giverDY) {
	var takerVectorLength = getHypotenuse(takerDX, takerDY);
	var summedDX = takerDX + giverDX;
	var summedDY = takerDY + giverDY;
	var summedVectorLength = getHypotenuse(summedDX, summedDY);
	var normalize = takerVectorLength / summedVectorLength;
	return {
		dx: summedDX * normalize,
		dy: summedDY * normalize
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
container.el = document.createElement('div');
container.el.setAttribute('id', 'container');
document.body.appendChild(container.el);
addEvent(window, 'resize', function (e) {
	container.width = window.innerWidth;
	container.height = window.innerHeight;
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
	this.radius.neighborhood = 250;
	// coords
	this.x = Math.random() * container.width;
	this.y = Math.random() * container.height;
	// delta
	this.dmax = 10;
	this.dx = Math.random() * 5;
	this.dy = Math.random() * 5;
	if (coinFlip()) {this.dx *= -1;}
	if (coinFlip()) {this.dy *= -1;}
	// elements
	var bird = document.createElement('div');
	var body = document.createElement('div');
	var bbbl = document.createElement('div');
	var nbhd = document.createElement('div');
	bird.setAttribute('class', 'bird');
	body.setAttribute('class', 'body');
	bbbl.setAttribute('class', 'bubble');
	nbhd.setAttribute('class', 'neighborhood');
	bird.appendChild(body);
	bird.appendChild(bbbl);
	bird.appendChild(nbhd);
	this.el = bird;
	this.draw();
	container.el.appendChild(this.el);

	// var r = coinFlip() ? 0 : 255;
	// var g = coinFlip() ? 0 : 255;
	// var b = coinFlip() ? 0 : 255;
	var r = 0;
	var g = 0;
	var b = 0;
	var a = 1;
	this.trailColor = "rgba("+r+","+g+","+b+","+a+")";
}

/**
 * Draw bird element
 * @return undefined
 */
Bird.prototype.draw = function() {
	this.el.style.left = this.x + 'px';
	this.el.style.top = this.y + 'px';
	canvas.ctx.fillStyle = this.trailColor;
	canvas.ctx.fillRect(this.x, this.y, 1, 1);
};

/**
 * Update bird position with delta
 * @return undefined
 */
Bird.prototype.movePosition = function() {
	this.x += this.dx;
	this.y += this.dy;
	this.infiniteEdges();
};

/**
 * Endless space, teleport birds on the edge
 * @return undefined
 */
Bird.prototype.infiniteEdges = function() {
	var compensate = this.radius.bubble;
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
	for (var i = 0, l = birds.length; i < l; i++) {
		if (i === this.index) {continue;}
		var that = birds[i];
		var xDiff = this.x - that.x;
		var yDiff = this.y - that.y;
		var distance = getHypotenuse(xDiff, yDiff);
		if (distance < this.radius.neighborhood) {
			if (distance < this.radius.bubble) {
				// "Separation: steer to avoid crowding local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					xDiff / ((this.radius.bubble / distance) * 30),
					yDiff / ((this.radius.bubble / distance) * 30)
				);
				this.dx = nvs.dx;
				this.dy = nvs.dy;
			} else {
				// "Alignment: steer towards the average heading of local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					that.dx / ((this.radius.neighborhood / distance) * 60),
					that.dy / ((this.radius.neighborhood / distance) * 60)
				);
				this.dx = nvs.dx;
				this.dy = nvs.dy;
			}
			neighborCount++;
			neighborSumX += that.x;
			neighborSumY += that.y;
		}
	}
	// "Cohesion: steer to move toward the average position of local flockmates"
	if (neighborCount) {
		var centeroidX = neighborSumX / neighborCount;
		var centeroidY = neighborSumY / neighborCount;
		var centroidDX = centeroidX - this.x;
		var centroidDY = centeroidX - this.y;
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			centroidDX / 100,
			centroidDY / 100
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
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
				cursor.y
			);
			break;
		case cursor.FOOD:
			this.seekCoords(
				cursor.x,
				cursor.y
			);
			break;
	}
};

/**
 * Change bird vector away from location
 * @return undefined
 */
Bird.prototype.avoidCoords = function (x, y) {
	var range = this.radius.neighborhood;
	var C = 10; // magic coefficient
	var xDiff = this.x - x;
	var yDiff = this.y - y;
	var distance = getHypotenuse(xDiff, yDiff);
	if (distance < range) {
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			xDiff / ((range / distance) * C),
			yDiff / ((range / distance) * C)
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
	}
};

/**
 * Change bird vector towards location
 * @return undefined
 */
Bird.prototype.seekCoords = function (x, y) {
	var range = this.radius.neighborhood;
	var C = 10; // magic coefficient
	var xDiff = x - this.x;
	var yDiff = y - this.y;
	var distance = getHypotenuse(xDiff, yDiff);
	if (distance < range) {
		var nvs = getNormalizedVectorSum(
			this.dx,
			this.dy,
			xDiff / ((range / distance) * C),
			yDiff / ((range / distance) * C)
		);
		this.dx = nvs.dx;
		this.dy = nvs.dy;
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
};

/**
 * Limit bird velocity
 * @return undefined
 */
Bird.prototype.speedLimit = function () {
	this.dx = limitNumber(this.dx, this.dmax);
	this.dy = limitNumber(this.dy, this.dmax);
};

/**
 * Animate one frame of the bird
 * @return undefined
 */
Bird.prototype.animateFrame = function() {
	// dx, dy stuff
	this.handleNeighbors();
	this.handleCursor();
	this.randomizeMovement();
	this.speedLimit();
	// x, y stuff
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