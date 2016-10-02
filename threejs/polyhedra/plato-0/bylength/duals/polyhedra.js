

/**
 * face graphs
 * http://threejs.org/docs/#Reference/Math/Vector3
 * http://threejs.org/docs/#Reference/Core/Face3
 * http://stackoverflow.com/questions/9252764/how-to-create-a-custom-mesh-on-three-js
 * http://stackoverflow.com/a/886053
 */

function Node(point) {
	this.point = point;
	this.neighbors = [];
}

Node.prototype.hasNeighbor = function(node) {
	return this.neighbors.some(function (neighbor) {
		return neighbor.point === node.point;
	});
};

Node.prototype.addNeighbor = function(node) {
	if (this.hasNeighbor(node)) return;
	this.neighbors.push(node);
};


function Graph() {
	this.nodes = [];
}

Graph.prototype.getNodeByPoint = function(point) {
	var foundNode = null;
	this.nodes.some(function (node) {
		if (node.point === point) {
			foundNode = node;
			return true;
		}
	});
	return foundNode;
};

Graph.prototype.addLine = function(line) {
	var pointA = line.geometry.vertices[0];
	var pointB = line.geometry.vertices[1];
	var nodeA = this.getNodeByPoint(pointA);
	var nodeB = this.getNodeByPoint(pointB);
	if (!nodeA) {
		nodeA = new Node(pointA);
		this.nodes.push(nodeA);
	}
	if (!nodeB) {
		nodeB = new Node(pointB);
		this.nodes.push(nodeB);
	}
	nodeA.addNeighbor(nodeB);
	nodeB.addNeighbor(nodeA);
};


function makeFaces(lines, numberOfSides) {


	console.log(numberOfSides);


	// make new graph
	var graph = new Graph();

	// populate graph with lines
	lines.forEach(function (line) {
		graph.addLine(line);
	});


	console.log(graph);


	// find face circuits
	var circuits = [];
	function walkPaths(startNode, currNode, distance, path) {
		if (distance === numberOfSides && startNode === currNode) {
			// we made it!
			circuits.push(path);
		} else if (distance < numberOfSides) {
			// keep walking
			distance++;
			currNode.neighbors.forEach(function (node) {
				var pathCopy = path.slice(0);
				pathCopy.push(node);
				walkPaths(startNode, node, distance, pathCopy);
			});
		}
	}
	graph.nodes.forEach(function (node) {
		walkPaths(node, node, 0, []);
	});


	console.log(circuits);


	// find unique circuits
	var uniqueCircuits = [];
	circuits.forEach(function (circuitA) {
		var isUnique = true;
		// check against currently unique circuits
		uniqueCircuits.forEach(function (circuitB) {
			if (circuitA === circuitB) {
				isUnique = false;
			} else {
				// is every node in circuit A also in circuit B?
				var sameNodeCount = 0;
				var hasSameNodes = true;
				circuitA.forEach(function (nodeA) {
					if (circuitB.indexOf(nodeA) === -1) {
						hasSameNodes = false;
					}
				});
				if (hasSameNodes) {
					isUnique = false;
				}
			}
		});
		if (isUnique) {
			uniqueCircuits.push(circuitA);
		}
	});


	console.log(uniqueCircuits);


	// make faces!
	var faceObjects = [];
	uniqueCircuits.forEach(function (circuit) {
		// out of triangles!
		var faces = [];
		switch (numberOfSides) {
			case 3:
				faces.push(new THREE.Face3(0, 1, 2));
				break;
			case 4:
				faces.push(new THREE.Face3(0, 1, 2));
				faces.push(new THREE.Face3(2, 3, 0));
				break;
			case 5:
				faces.push(new THREE.Face3(0, 1, 2));
				faces.push(new THREE.Face3(2, 3, 4));
				faces.push(new THREE.Face3(4, 0, 2));
				break;
		}
		var geometry = new THREE.Geometry();
		geometry.vertices = circuit.map(function (node) { return node.point; });
		geometry.faces = faces;
		geometry.computeFaceNormals();
		var material = new THREE.MeshNormalMaterial({
			side: THREE.DoubleSide
		});
		var faceObject = new THREE.Mesh(
			geometry,
			material
		);
		faceObjects.push(faceObject);
		scene.add(faceObject);
	});


}



/**
 * common functions
 */


function drawLine(from, to, color) {

	color = color || new THREE.Color('rgb(6, 3, 2)');

	var geometry = new THREE.Geometry();
	geometry.vertices.push(from);
	geometry.vertices.push(to);

	var material = new THREE.LineBasicMaterial({
		linecap: 'round',
		linejoin: 'round',
		linewidth: 2.4,
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
	this.faces = [];
	// data structures
	this.linesByLength = {};
	// properties
	this.lengths = [];
	// construction
	this.make(points);
}

Polyhedra.prototype.make = function() {
	this.makeLines();
	this.findLengths();
	this.doLengths();
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

Polyhedra.prototype.findLengths = function() {
	this.lengths = Object.keys(this.linesByLength);
	this.lengths = this.lengths.sort(numSort);

	console.log(this.lengths);

};

Polyhedra.prototype.doLengths = function() {
	this.lengths.forEach(function (length, index) {

		var lines = this.linesByLength[length];

		// make faces?
		if (this.options.faceSideCountByLengthIndex) {
			if (typeof this.options.faceSideCountByLengthIndex[index] === 'number') {
				this.faces = makeFaces(
					lines,
					this.options.faceSideCountByLengthIndex[index]
				);
			}
		}

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

			// hide line? (for faces)
			if (this.options.faceSideCountByLengthIndex) {
				line.visible = false;
			}

		}, this);

	}, this);
};