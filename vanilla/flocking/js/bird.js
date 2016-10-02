//
// one bird
// 



/**
 * Bird constructor
 * @return this (bird)
 */
function Bird(birds) {
	// reference
	this.index = birds.length;
	this.birds = birds;
	this.birds.push(this);
	// size
	this.radius = {};
	this.radius.flesh = 5;
	this.radius.spacebubble = 50;
	this.radius.neighborhood = 250;
	// coords
	this.x = Math.random() * container.width;
	this.y = Math.random() * container.height;
	// delta
	this.dlimit = 10;
	this.dx = Math.random() * 5;
	this.dy = Math.random() * 5;
	if (coinFlip()) {this.dx *= -1;}
	if (coinFlip()) {this.dy *= -1;}
	// elements
	this.el = {};
	this.el.bird = document.createElement('div');
	this.el.flesh = document.createElement('div');
	this.el.spacebubble = document.createElement('div');
	this.el.neighborhood = document.createElement('div');
	this.el.bird.setAttribute('class', 'bird');
	this.el.flesh.setAttribute('class', 'flesh');
	this.el.spacebubble.setAttribute('class', 'spacebubble');
	this.el.neighborhood.setAttribute('class', 'neighborhood');
	this.el.bird.appendChild(this.el.flesh);
	this.el.bird.appendChild(this.el.spacebubble);
	this.el.bird.appendChild(this.el.neighborhood);



/*
	
	this.trailColor = {};
	this.trailColor.r = Math.round(Math.random() * 255);
	this.trailColor.g = Math.round(Math.random() * 255);
	this.trailColor.b = Math.round(Math.random() * 255);
	this.trailColor.a = 0.8;
	this.trailColor.string = 'rgba(' +
		this.trailColor.r + ',' +
		this.trailColor.g + ',' +
		this.trailColor.b + ',' +
		this.trailColor.a + ')';
	this.trailColor.string = 'rgba(0, 0, 0, 0.7)';
*/
	
	this.trailColor = {};
	this.trailColor.string = 'rgba(0, 0, 0, 0.7)';


	this.draw();
	container.el.appendChild(this.el.bird);
	frameHandler.addAnimation(this.animateFrame, this);
}

/**
 * Annihilate bird object, clean all traces
 * @return undefined
 */
Bird.prototype.destroy = function() {
	// remove reference from birds
	this.birds.slice(this.index, 1);
	// remove elements from DOM
	this.el.parentNode.removeChild(this.el);
	// mark animation "completed" for frame handler
	this.animateFrame = function () {return true;};
};

/**
 * Draw bird element
 * @return undefined
 */
Bird.prototype.draw = function() {
	this.el.bird.style.left = this.x + 'px';
	this.el.bird.style.top = this.y + 'px';



/*
	this.trailColor.r += this.dx + this.dy;
	this.trailColor.g += this.dx + this.dy;
	this.trailColor.b += this.dx + this.dy;
	while (this.trailColor.r > 255) {this.trailColor.r -= 255;}
	while (this.trailColor.g > 255) {this.trailColor.g -= 255;}
	while (this.trailColor.b > 255) {this.trailColor.b -= 255;}
	this.trailColor.r = Math.round(this.trailColor.r);
	this.trailColor.g = Math.round(this.trailColor.g);
	this.trailColor.b = Math.round(this.trailColor.b);
	this.trailColor.string = 'rgba(' +
		this.trailColor.r + ',' +
		this.trailColor.g + ',' +
		this.trailColor.b + ',' +
		this.trailColor.a + ')';
	*/
/*
	canvas.ctx.fillStyle = this.trailColor.string;
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
	this.infiniteEdges();
};

/**
 * Endless space, teleport birds on the edge
 * @return undefined
 */
Bird.prototype.infiniteEdges = function() {
	var compensate = this.radius.spacebubble;
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
	for (var i = 0, l = this.birds.length; i < l; i++) {
		if (i === this.index) {continue;}
		var that = this.birds[i];
		var xDiff = this.x - that.x;
		var yDiff = this.y - that.y;
		var distance = getHypotenuse(xDiff, yDiff);
		if (distance < this.radius.neighborhood) {
			if (distance < this.radius.spacebubble) {
				// "Separation: steer to avoid crowding local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					xDiff / ((this.radius.spacebubble / distance) * 100),
					yDiff / ((this.radius.spacebubble / distance) * 100)
				);
				this.dx = nvs.dx;
				this.dy = nvs.dy;
			} else {
				// "Alignment: steer towards the average heading of local flockmates"
				var nvs = getNormalizedVectorSum(
					this.dx,
					this.dy,
					that.dx / ((this.radius.neighborhood / distance) * 100),
					that.dy / ((this.radius.neighborhood / distance) * 100)
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
	this.dx = limitNumber(this.dx, this.dlimit);
	this.dy = limitNumber(this.dy, this.dlimit);
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