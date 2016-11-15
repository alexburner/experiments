/**
 * extension for Genesis facet objects
 */

function GenesisFacets(genesis) {
	// namespace
	this.facets = {};
	// elements
	this.facets.all = [];
	this.facets.vesica = [];
	this.facets.treble = [];
	this.facets.petal = [];
	// attributes
	this.facets.radii = {
		around: {
			vesica: genesis.sizes.vesica / 2,
			treble: genesis.sizes.vesica / 3,
			petal: genesis.sizes.radius / 2
		},
		within: {
			vesica: genesis.sizes.radius / 2,
			treble: genesis.sizes.radius - genesis.sizes.vesica / 3,
			petal: genesis.sizes.petal / 2
		}
	};
	// copy this to genesis
	for (var key in this) {
		genesis[key] = this[key];
	}
}


/**
 * make stuff
 */

GenesisFacets.prototype.makeFacets = function () {
	this._makeVesicas();
	this._makeTrebles();
	this._makePetals();
};

GenesisFacets.prototype._makeVesicas = function () {
	var facetExists = {};
	var distance = this.sizes.radius;
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			if (indexA === indexB) return;
			if (facetExists[indexA + ',' + indexB]) return;
			if (facetExists[indexB + ',' + indexA]) return;
			var vector = circleA.position.subtract(circleB.position);
			if (distance !== util.roundish(vector.length)) return;
			var facet = new Facet([circleA, circleB]);
			this.facets.vesica.push(facet);
			this.facets.all.push(facet);
			facetExists[indexA + ',' + indexB] = true;
		}, this);
	}, this);
};

GenesisFacets.prototype._makeTrebles = function () {
	// NOTE requires vesica facets
	var facetExists = {};
	var distance = this.sizes.radius;
	this.facets.vesica.forEach(function (vesica) {
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
			var facet = new Facet([c1, c2, c3]);
			this.facets.treble.push(facet);
			this.facets.all.push(facet);
			facetExists[i1 + ',' + i2 + ',' + i3] = true;
		}, this);
	}, this);
};

GenesisFacets.prototype._makePetals = function () {
	var facetExists = {};
	var distance = this.sizes.radius * 2 - this.sizes.petal;
	this.circles.forEach(function (circleA, indexA) {
		this.circles.forEach(function (circleB, indexB) {
			if (indexA === indexB) return;
			if (facetExists[indexA + ',' + indexB]) return;
			if (facetExists[indexB + ',' + indexA]) return;
			var vector = circleA.position.subtract(circleB.position);
			if (distance !== util.roundish(vector.length)) return;
			var facet = new Facet([circleA, circleB]);
			this.facets.petal.push(facet);
			this.facets.all.push(facet);
			facetExists[indexA + ',' + indexB] = true;
		}, this);
	}, this);
};


/**
 * draw stuff
 */

GenesisFacets.prototype.markFacets = function (type) {
	// String type = all, vesica, treble, petal
	type = type || 'all';
	this.facets[type].forEach(function (facet) {
		var mark = new shapes.MarkFacet(facet.centroid);
		this.group.addChild(mark);
	}, this);
};

GenesisFacets.prototype.drawFacets = function (type) {
	// String type = all, vesica, treble, petal
	type = type || 'all';
	this.facets[type].forEach(function (facet, index) {
		facet.drawIntersect();

		// var vector = this.center.subtract(facet.intersect.position);
		// facet.intersect.position = facet.intersect.position.subtract(vector);

		// facet.intersect.position = facet.intersect.position.add(
		// 	new paper.Point(
		// 		Math.random() > 0.5 ? Math.random() * 30 : Math.random() * -30,
		// 		Math.random() > 0.5 ? Math.random() * 30 : Math.random() * -30
		// 	)
		// );

		// facet.intersect.position = this.bounds.point;
		// facet.intersect.position.y += index * this.sizes.radius;

		this.group.addChild(facet.intersect);
	}, this);
};

GenesisFacets.prototype.laserScatter = function (type) {
	// String type = all, vesica, treble, petal
	type = type || 'all';
	this.facets[type].forEach(function (facet) {
		facet.laserScatter();
	}, this);
};

GenesisFacets.prototype.edgeFacets = function (type) {
	// String type = all, vesica, treble, petal
	type = type || 'all';
	var points = [];
	this.facets[type].forEach(function (facet) {
		points.push(facet.centroid);
	}, this);
	points.forEach(function (pointA, indexA) {
		points.forEach(function (pointB, indexB) {
			if (indexA === indexB) return;
			var line = new shapes.Line(pointA, pointB);
			//line.strokeWidth *= 0.67;
			this.group.addChild(line);
		}, this);
	}, this);
};

GenesisFacets.prototype.drawSeeds = function (type, engaged, origin) {
	// String type = vesica, treble, petal
	// String engaged = around, within
	// String origin = selves, centers
	var radius = this.facets.radii[engaged][type];
	var seeds = [];
	switch (origin) {
		case 'selves':
			this.facets[type].forEach(function (facet) {
				var seed = new shapes.SeedCircle(facet.centroid, radius);
				this.group.addChild(seed);
				seeds.push(seed);
			}, this);
			break;
		case 'centers':
			this.circles.forEach(function (circle) {
				var seed = new shapes.SeedCircle(circle.position, radius);
				this.group.addChild(seed);
				seeds.push(seed);
			}, this);
			break;
	}
	return seeds;
};