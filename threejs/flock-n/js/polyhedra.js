

/**
 * common functions
 */


function drawLine(from, to, color) {

	color = color || 0xEEEEEE;

	var geometry = new THREE.Geometry();
	geometry.vertices.push(from);
	geometry.vertices.push(to);

	var material = new THREE.LineBasicMaterial({
		linecap: 'round',
		linejoin: 'round',
		linewidth: 2,
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

function Polyhedra(points, animate) {
	// properties
	this.points = points;
	this.lines = [];
	this.linesByLength = {};
	this.lengths = [];
	// construction
	this.make();

    // animate?
    if (animate) this.animate();
}

Polyhedra.prototype.animate = function () {
    var self = this;
    var isAnimating = false;

    function animateFrame() {
        if (!isAnimating) return;
        self.lines.forEach(function (line) {
            var delay = 300;
            line.rotateX(Math.PI / 2 / delay);
            line.rotateY(Math.PI / 2 / delay);
            line.rotateZ(Math.PI / 2 / delay);
        });
        requestAnimationFrame(animateFrame);
    }

    var containerEl = document.getElementById('container');

    containerEl.addEventListener('mousedown', function () {
        console.log('mousedown')
        isAnimating = false;
    });

    containerEl.addEventListener('dblclick', function () {
        console.log('dblclick')
        isAnimating = true;
        animateFrame();
    });

    animateFrame();
};

Polyhedra.prototype.make = function() {
	this.makeLines();
	this.makeLengths();
};

Polyhedra.prototype.makeLines = function(points) {
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			if (indexA === indexB) return;

			var line = drawLine(pointA, pointB);

			var length = pointA.distanceToSquared(pointB);
				length = 2 * Math.round(length / 2);

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