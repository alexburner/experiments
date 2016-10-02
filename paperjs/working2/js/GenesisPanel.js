/**
 * GenesisPanel pattern factory
 */

function GenesisPanel(stage, radius, origin, size) {
	// elements
	this.panel = new shapes.Panel(origin, size);
	this.center = this.panel.position;
	this.centroid = undefined;
	this.circles = [];
	this.points = [];
	this.lines = [];
	this.linesByLength = {
		radius: [],
		radius2: [],
		radius3: [],
		vesica: [],
		vesica2: [],
		strange: [],
		other: []
	};
	// attributes
	this.stage = stage;
	this.sizes = {};
	this.sizes.radius = radius;
	this.sizes.vesica = util.getVesicaLength(this.sizes.radius);
	this.sizes.strange = util.getStrangeLength(this.sizes.radius, this.sizes.vesica);
	this.sizes.petal = util.getPetalWidth(this.sizes.radius, this.sizes.vesica);
	// construction
	this.makeCircles();
	this.makePoints();
	this.findCentroid();
}


GenesisPanel.prototype.makeCircles = function() {
	
	// create a delta vector for moving circles
	var centerVector = new paper.Point(this.center);
	centerVector.length = this.sizes.radius;

	// maintain a group for pattern rotation
	var group = new paper.Group();

	// draw 1-7 circles
	for (var i = 0, l = 7; i < l; i++) {
		var stage = i + 1;
		
		// create & move & store circle
		var circle;
		if (stage == 1) {
			circle = new shapes.Circle(this.center, this.sizes.radius);
		} else {
			centerVector.angle = 60 * (stage - 2);
			circle = new shapes.Circle(
				this.center.add(centerVector),
				this.sizes.radius
			);
		}
		circle.position.x = util.roundish(circle.position.x);
		circle.position.y = util.roundish(circle.position.y);
		circle.data.index = i;
		this.circles.push(circle);
		group.addChild(circle);

		// terminate appropriately
		if (stage === this.stage) {

			// upside down from original plan
			group.rotate(180, this.center);

			switch(stage) {
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

	}

};


GenesisPanel.prototype.makePoints = function() {

	// only one for one
	if (this.stage === 1) {
		this.points.push(this.center);
		// only the one circle center
		return;
	}

	// point tracking
	var pointExists = {};

	// find all circle center points
	this.circles.forEach(function (circle) {
		var point = circle.position;
		point.x = util.roundish(point.x);
		point.y = util.roundish(point.y);
		pointExists[point.toString()] = true;
		this.points.push(point);
	}, this);

	// find all circle intersection points
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			// skip self
			if (indexA === indexB) {
				return;
			}
			// only check radius neighbors
			if (this.sizes.radius < util.roundish(
						circleA.position.subtract(
							circleB.position
						).length
					)) {
				return;
			}
			var intersects = circleA.getIntersections(circleB);
			intersects.forEach(function (intersect) {
				// prep point
				var point = intersect.point;
				point.x = util.roundish(point.x);
				point.y = util.roundish(point.y);
				// add if unique
				if (!pointExists[point.toString()]) {
					this.points.push(point);
					pointExists[point.toString()] = true;
				}
			}, this);
		}, this);
	}, this);

};


GenesisPanel.prototype.findCentroid = function () {
	this.centroid = util.getCentroid(this.points);
};


GenesisPanel.prototype.findFacets = function () {
	this.facets = {
		vesicas: [],
		trebles: [],
		petals: []
	};
	this._findVesicas();
	this._findTrebles();
	this._findPetals();
};

GenesisPanel.prototype._findVesicas = function () {
	var facetExists = {};
	var distance = this.sizes.radius;
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			if (indexA === indexB) return;
			if (facetExists[indexA + ',' + indexB]) return;
			if (facetExists[indexB + ',' + indexA]) return;
			var vector = circleA.position.subtract(circleB.position);
			if (distance !== util.roundish(vector.length)) return;
			this.facets.vesicas.push(new Facet([circleA, circleB]));
			facetExists[indexA + ',' + indexB] = true;
		}, this);
	}, this);
};

GenesisPanel.prototype._findTrebles = function () {
	var facetExists = {};
	var distance = this.sizes.radius;
	this.facets.vesicas.forEach(function (vesica) {
		this.circles.forEach(function (circle, index) {
			var c1 = circle;
			var c2 = vesica.circles[0];
			var c3 = vesica.circles[1];
			var i1 = c1.data.index;
			var i2 = c2.data.index;
			var i3 = c3.data.index;
			if (i1 === i2 || i1 === i3) return;
			if (facetExists[i1 + ',' + i2 + ',' + i3]) return;
			if (facetExists[i1 + ',' + i3 + ',' + i2]) return;
			if (facetExists[i2 + ',' + i1 + ',' + i3]) return;
			if (facetExists[i2 + ',' + i3 + ',' + i1]) return;
			if (facetExists[i3 + ',' + i1 + ',' + i2]) return;
			if (facetExists[i3 + ',' + i2 + ',' + i1]) return;
			var v1 = c1.position.subtract(c2.position);
			var v2 = c1.position.subtract(c3.position);
			if (distance !== util.roundish(v1.length)) return;
			if (distance !== util.roundish(v2.length)) return;
			this.facets.trebles.push(new Facet([c1, c2, c3]));
			facetExists[i1 + ',' + i2 + ',' + i3] = true;
		}, this);
	}, this);
};

GenesisPanel.prototype._findPetals = function () {
	var facetExists = {};
	var distance = this.sizes.radius * 2 - this.sizes.petal;
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			if (indexA === indexB) return;
			if (facetExists[indexA + ',' + indexB]) return;
			if (facetExists[indexB + ',' + indexA]) return;
			var vector = circleA.position.subtract(circleB.position);
			if (distance !== util.roundish(vector.length)) return;
			this.facets.petals.push(new Facet([circleA, circleB]));
			facetExists[indexA + ',' + indexB] = true;
		}, this);
	}, this);
};



/**
 * Self-informations
 */


GenesisPanel.prototype.markPoints = function () {
	this.points.forEach(function (point) {
		new shapes.Dot(point);
	}, this);
};


GenesisPanel.prototype.markCentroid = function () {
	var dot = new shapes.Dot(this.centroid);
	dot.strokeColor = 'red';
};

GenesisPanel.prototype.markFacets = function () {
	this.markVesicas();
	this.markTrebles();
	this.markPetals();
};

GenesisPanel.prototype.markVesicas = function () {
	this.facets.vesicas.forEach(function (facet) {
		new shapes.Dot(facet.centroid);
	}, this);
};

GenesisPanel.prototype.markTrebles = function () {
	this.facets.trebles.forEach(function (facet) {
		new shapes.Dot(facet.centroid);
	}, this);
};

GenesisPanel.prototype.markPetals = function () {
	this.facets.petals.forEach(function (facet) {
		new shapes.Dot(facet.centroid);
	}, this);
};



/**
 * Seed stuff
 */


GenesisPanel.prototype.drawVesicaSeeds = function () {
	this.facets.vesicas.forEach(function (vesica) {
		new shapes.Seed(vesica.centroid, this.sizes.vesica / 2);
	}, this);
};

GenesisPanel.prototype.drawTrebleSeeds = function () {
	/*
	// NOTE TODO HEY WARNING
	this.facets.trebles.forEach(function (treble) {
		var thing = this.sizes.vesica / 2 + this.sizes.petal / 2;
			thing = thing - this.sizes.vesica / 3;
		new shapes.Seed(treble.centroid, thing);
	}, this);
	*/
	this.facets.trebles.forEach(function (treble) {
		new shapes.Seed(treble.centroid, this.sizes.vesica / 3);
	}, this);
};

GenesisPanel.prototype.drawPetalSeeds = function () {
	this.facets.petals.forEach(function (petal) {
		new shapes.Seed(petal.centroid, this.sizes.radius / 2);
	}, this);
};


GenesisPanel.prototype.drawVesicaSeeds_inCenter = function () {
	this.circles.forEach(function (circle) {
		new shapes.Seed(circle.position, this.sizes.vesica / 2);
	}, this);
};

GenesisPanel.prototype.drawTrebleSeeds_inCenter = function () {
	/*
	// NOTE TODO HEY WARNING
	this.circles.forEach(function (circle) {
		var thing = this.sizes.vesica / 2 + this.sizes.petal / 2;
			thing = thing - this.sizes.vesica / 3;
		new shapes.Seed(circle.position, thing);
	}, this);
	*/
	this.circles.forEach(function (circle) {
		new shapes.Seed(circle.position, this.sizes.vesica / 3);
	}, this);
};

GenesisPanel.prototype.drawPetalSeeds_inCenter = function () {
	this.circles.forEach(function (circle) {
		new shapes.Seed(circle.position, this.sizes.radius / 2);
	}, this);
};


GenesisPanel.prototype.drawCenterSeeds_manual = function () {
	switch (this.stage) {
		case 1:
			break;
		case 2:
			new shapes.Seed(this.centroid, this.sizes.radius / 2);
			new shapes.Seed(this.centroid, this.sizes.vesica / 2);
			break;
		case 3:
			new shapes.Seed(this.centroid, this.sizes.vesica / 3);
			new shapes.Seed(this.centroid, 2 * (this.sizes.vesica / 3));
			var thing = this.sizes.vesica / 2 + this.sizes.petal / 2;
			thing = thing - this.sizes.vesica / 3;
			new shapes.Seed(this.centroid, thing);
			break;
		case 4:
			new shapes.Seed(this.centroid, this.sizes.petal / 2);
			new shapes.Seed(this.centroid, this.sizes.radius / 2);
			new shapes.Seed(this.centroid, this.sizes.vesica / 2);
			new shapes.Seed(this.centroid, this.sizes.strange / 2);

			new shapes.Seed(this.centroid, this.sizes.vesica / 3);

			break;
		case 5:
			break;
		case 6:
			break;
		case 7:
			new shapes.Seed(this.centroid, this.sizes.vesica);
			break;
	}
};

GenesisPanel.prototype.drawCenterSeeds_trying = function () {
	if (this.stage === 6) return;
	var centroidRadii = {};
	this.points.forEach(function (point) {
		var centroidVector = point.subtract(this.centroid);
		var radius = util.roundish(centroidVector.length);
		if (radius && radius != this.sizes.radius && !centroidRadii[radius]) {
			centroidRadii[radius] = true;
			new shapes.Seed(this.centroid, radius);
		}
	}, this);
};



/**
 * Line stuff
 */


GenesisPanel.prototype.drawLinesIn = function () {
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			if (indexA === indexB) {
				return;
			}
			var line = new shapes.Line(pointA, pointB);
			this.lines.push(line);
			this.classifyLine(line, util.roundish(line.length));
		}, this);
	}, this);
};


GenesisPanel.prototype.drawLinesOn = function () {
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			// skip self
			if (indexA === indexB) {
				return;
			}
			// get shift vector
			var vector = pointA.subtract(pointB);
			vector.length = this.panel.bounds.height;
			// look in both directions to get endpoints
			var point1 = pointA.add(vector);
			var point2 = pointA.subtract(vector);
			point1 = util.getConfinedPoint(pointA, point1, this.panel);
			point2 = util.getConfinedPoint(pointA, point2, this.panel);
			var line = new shapes.Line(point1, point2);
			this.lines.push(line);
			this.classifyLine(line, util.roundish(pointA.subtract(pointB).length));
		}, this);
	}, this);
};


GenesisPanel.prototype.drawLinesOnUnique = function () {
	var lineExists = {};
	this.points.forEach(function (pointA, indexA) {
		this.points.forEach(function (pointB, indexB) {
			// skip self
			if (indexA === indexB) {
				return;
			}
			// get vector between point A and B
			var vector = pointA.subtract(pointB);
			vector.length = this.panel.bounds.height;
			// look in both directions to get endpoints
			var point1 = pointA.add(vector);
			var point2 = pointA.subtract(vector);
			point1 = util.getConfinedPoint(pointA, point1, this.panel);
			point2 = util.getConfinedPoint(pointA, point2, this.panel);
			if (!lineExists[point1.toString() + point2.toString()] &&
					!lineExists[point1.toString() + point2.toString()]) {
				var line = new shapes.Line(point1, point2);
				this.lines.push(line);
				this.classifyLine(line, util.roundish(pointA.subtract(pointB).length));
				lineExists[point1.toString() + point2.toString()] = true;
			}
		}, this);
	}, this);
};


GenesisPanel.prototype.classifyLine = function (line, length) {
	switch (length) {
		case this.sizes.radius:
			this.linesByLength.radius.push(line);
			break;
		case this.sizes.radius * 2:
			this.linesByLength.radius2.push(line);
			break;
		case this.sizes.radius * 3:
			this.linesByLength.radius3.push(line);
			break;
		case this.sizes.vesica:
			this.linesByLength.vesica.push(line);
			break;
		case this.sizes.vesica * 2:
			this.linesByLength.vesica2.push(line);
			break;
		case this.sizes.strange:
			this.linesByLength.strange.push(line);
			break;
		default:

			// uh oh, debug
			console.log('line missed length sort! length=' + length);
			console.log(line);

			this.linesByLength.other.push(line);
			break;
	}
};


GenesisPanel.prototype.hideAllLines = function () {
	this.lines.forEach(function (line) {
		line.visible = false;
	});
};


GenesisPanel.prototype.showLinesByLength = function (lengthName) {
	this.linesByLength[lengthName].forEach(function (line) {
		line.visible = true;
	});
};


GenesisPanel.prototype.hideNotCentroidLines = function () {
	this.lines.forEach(function (line) {
		if (!line.visible) return;
		if (!line.hitTest(
					this.centroid,
					{
						type: 'PathItem',
						fill: false,
						stroke: true,
						segments: false,
						tolerance: 0.5
					}
				)) {
			line.visible = false;
		}
	}, this);
};
