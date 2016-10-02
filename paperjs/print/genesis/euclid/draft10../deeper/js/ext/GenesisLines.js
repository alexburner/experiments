/**
 * extension for Genesis lines
 */

function GenesisLines(genesis) {
	// namespace
	this.lines = {};
	// elements
	this.lines.all = [];
	this.lines.byLength = {
		radius: [],
		radius2: [],
		radius3: [],
		vesica: [],
		vesica2: [],
		strange: [],
		other: []
	};
	// attributes
	this.lines.engaged = '';
	// copy this to genesis
	for (var key in this) {
		genesis[key] = this[key];
	}
}

GenesisLines.prototype.drawAllLines = function (engaged) {
	// String engaged = in || on
	engaged = engaged || 'in';
	var lineExists = {};
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			if (indexA === indexB) return;
			if (lineExists[pointA.toString() + pointB.toString()]) return;
			if (lineExists[pointB.toString() + pointA.toString()]) return;
			lineExists[pointA.toString() + pointB.toString()] = true;
			switch (engaged) {
				case 'in': this._drawLineIn(pointA, pointB); break;
				case 'on': this._drawLineOn(pointA, pointB); break;
			}
		}, this);
	}, this);
	// save this instance engagement
	this.lines.engaged = engaged;
};

GenesisLines.prototype._drawLineIn = function (pointA, pointB) {
	var line = new shapes.Line(pointA, pointB);
	line.data.endpoints = [pointA, pointB];
	this.group.addChild(line);
	this.lines.all.push(line);
	this._classifyLine(line, util.roundish(line.length));
};

GenesisLines.prototype._drawLineOn = function (pointA, pointB) {
	// make a long vector for probing boundary
	var vector = pointA.subtract(pointB);
	var length = util.roundish(vector.length);
	vector.length = this.bounds.height;
	// look in both directions to get endpoints
	var point1 = pointA.add(vector);
	var point2 = pointB.subtract(vector);
	point1 = util.getConfinedPoint(pointA, point1, this.panel);
	point2 = util.getConfinedPoint(pointB, point2, this.panel);
	// create and classify line
	var line = new shapes.Line(point1, point2);
	line.data.endpoints = [point1, point2];
	this.group.addChild(line);
	this.lines.all.push(line);
	this._classifyLine(line, length);
};

GenesisLines.prototype._classifyLine = function (line, length) {
	switch (length) {
		case this.sizes.radius:
			this.lines.byLength.radius.push(line);
			break;
		case this.sizes.radius * 2:
			this.lines.byLength.radius2.push(line);
			break;
		case this.sizes.radius * 3:
			this.lines.byLength.radius3.push(line);
			break;
		case this.sizes.vesica:
			this.lines.byLength.vesica.push(line);
			break;
		case this.sizes.vesica * 2:
			this.lines.byLength.vesica2.push(line);
			break;
		case this.sizes.strange:
			this.lines.byLength.strange.push(line);
			break;
		default:

			// uh oh, debug
			console.log('line missed length sort! length=' + length);

			this.lines.byLength.other.push(line);
			break;
	}
};

GenesisLines.prototype.hideAllLines = function () {
	this.lines.all.forEach(function (line) {
		line.opacity = 0;
	});
};

GenesisLines.prototype.showLinesByLength = function (lengthName) {
	this.lines.byLength[lengthName].forEach(function (line) {
		line.opacity = shapes.opacity;
	});
};







//
// experimental

GenesisLines.prototype.findLineIntersections = function (type) {
	var points = [];
	var pointExists = {};
	this.points.forEach(function (point) {
		pointExists[point.toString()] = true;
	}, this);
	this.lines.byLength[type].forEach(function (lineA, indexA) {
		this.lines.byLength[type].forEach(function (lineB, indexB) {
			if (indexA === indexB) return;
			var intersections = lineA.getIntersections(lineB);
			if (!intersections.length) return;
			var point = intersections[0].point;
			point.x = util.roundish(point.x);
			point.y = util.roundish(point.y);
			if (!pointExists[point.toString()]) {
				pointExists[point.toString()] = true;
				points.push(point);
			}
		}, this);
	}, this);
	this.lines.intersections = points;

	console.log(this.lines.intersections);
};

GenesisLines.prototype.markLineIntersections = function () {
	this.lines.intersections.forEach(function (point) {
		var mark = new shapes.Mark(point);
		this.group.addChild(mark);
	}, this);
};

GenesisLines.prototype.connectLineIntersections = function () {
	this.lines.intersections.forEach(function (pointA, indexA) {
		this.lines.intersections.forEach(function (pointB, indexB) {
			if (indexA === indexB) return;
			var line = new shapes.Line(pointA, pointB);
			this.group.addChild(line);
		}, this);
	}, this);
};