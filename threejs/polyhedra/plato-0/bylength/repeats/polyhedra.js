

/**
 * common functions
 */


function drawLine(from, to, color) {

	color = color || 0xFFFFFF;

	var geometry = new THREE.Geometry();
	geometry.vertices.push(from);
	geometry.vertices.push(to);

	var material = new THREE.LineBasicMaterial({
		linecap: 'round',
		linejoin: 'round',
		linewidth: 3,
		color: color
	});

	var line = new THREE.Line(geometry, material);

	scene.add(line);

	return line;

}


function numSort(a, b) {
	a = Number(a);
	b = Number(b);
	return a - b;
}



/**
 * Polyhedra class
 */

function Polyhedra(points, options) {
	this.options = options || {};
	// elements
	this.points = points;
	this.lines = [];
	// data structures
	this.linesByLength = {};
	// properties
	this.lengths = [];
	// construction
	this.make(points);
}

Polyhedra.prototype.make = function() {
	this.makeLines();
	this.makeLengths();
	this.makeColors();
};

Polyhedra.prototype.makeLines = function(points) {
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			if (indexA === indexB) return;

			var line = drawLine(pointA, pointB);

			// round & approximate length
			var length = pointA.distanceToSquared(pointB);
			length = 10 * Math.round(length / 10);

			if (!this.linesByLength[length]) {
				this.linesByLength[length] = [];
			}

			this.linesByLength[length].push(line);

			this.lines.push(line);

		}, this);
	}, this);
};

Polyhedra.prototype.makeLengths = function() {
	this.lengths = Object.keys(this.linesByLength);
	this.lengths = this.lengths.sort(numSort);

	console.log(this.lengths);

};

Polyhedra.prototype.makeColors = function() {
	this.lengths.forEach(function (length, index) {

		var lines = this.linesByLength[length];

		// find length color?
		if (this.options.colorLengths) {
			var shift = Math.sqrt(length) / 200;
			var color = new THREE.Color("rgb(81, 0, 255)");
			color.offsetHSL(shift, 0, 0);
		}

		lines.forEach(function (line) {

			// color line by length?
			if (this.options.colorLengths) {
				line.material.color = color;
			}

			// hide untargeted lengths?
			if (typeof this.options.lengthIndex === 'number') {
				if (index !== this.options.lengthIndex) {
					line.visible = false;
				}
			}

		}, this);

	}, this);
};