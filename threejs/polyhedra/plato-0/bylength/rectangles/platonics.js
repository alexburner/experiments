/*
	Tetrahedron - 4
 */
function Tetra(args) {

	args = args || {};

	// find properties
	var length = args.length || 6;
	var center = args.center || new THREE.Vector3(0, 0, 0);
	var radius = Math.sqrt(((length / 2) * (length / 2)) / 2);

	// find points
	var points = [];
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y + radius,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y - radius,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y + radius,
		center.z - radius));
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y - radius,
		center.z - radius));


	// configure options
	var options = args.options || {};

	// faces?
	if (args.faces) {
		// shortest edge triangles
		options.faceSideCountByLengthIndex = {
			"0": 3
		};
	}

	// edges?
	if (typeof args.edges === "number") {
		// show just
		options.lengthIndex = args.edges;
	} else if (args.edges === true) {
		// do nothing, all shown by default
	} else {
		options.hideAllLines = true;
	}

	// color edges by length?
	options.colorLengths = args.colorEdgeLengths;


	// make polyhedron
	var poly = new Polyhedra(points, options);
	// extend with platonic properties
	poly.length = length;
	poly.center = center;
	poly.radius = radius;

	// hooray!
	return poly;
}


/*
	Octahedron - 6
 */
function Octa(args) {

	args = args || {};

	// find properties
	var length = args.length || 6;
	var center = args.center || new THREE.Vector3(0, 0, 0);
	var radius = Math.sqrt(((length) * (length)) / 2);

	// find points
	var points = [];
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y + 0,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + radius,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + 0,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y + 0,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y - radius,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + 0,
		center.z - radius));


	// configure options
	var options = args.options || {};

	// faces?
	if (args.faces) {
		// shortest edge triangles
		options.faceSideCountByLengthIndex = {
			"0": 3
		};
	}

	// edges?
	if (typeof args.edges === "number") {
		// show just
		options.lengthIndex = args.edges;
	} else if (args.edges === true) {
		// do nothing, all shown by default
	} else {
		options.hideAllLines = true;
	}

	// color edges by length?
	options.colorLengths = args.colorEdgeLengths;


	// make polyhedron
	var poly = new Polyhedra(points, options);
	// extend with platonic properties
	poly.length = length;
	poly.center = center;
	poly.radius = radius;

	// hooray!
	return poly;
}


/*
	Hexahedron - 8
 */
function Hexa(args) {

	args = args || {};

	// find properties
	var length = args.length || 6;
	var center = args.center || new THREE.Vector3(0, 0, 0);
	var radius = length / 2;

	// find points
	var points = [];
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y + radius,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y - radius,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y + radius,
		center.z - radius));
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y - radius,
		center.z - radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y - radius,
		center.z - radius));
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y + radius,
		center.z - radius));
	points.push(new THREE.Vector3(
		center.x + radius,
		center.y - radius,
		center.z + radius));
	points.push(new THREE.Vector3(
		center.x - radius,
		center.y + radius,
		center.z + radius));


	// configure options
	var options = args.options || {};

	// faces?
	if (args.faces) {
		// shortest edge squares
		options.faceSideCountByLengthIndex = {
			"0": 4
		};
	}

	// edges?
	if (typeof args.edges === "number") {
		// show just
		options.lengthIndex = args.edges;
	} else if (args.edges === true) {
		// do nothing, all shown by default
	} else {
		options.hideAllLines = true;
	}

	// color edges by length?
	options.colorLengths = args.colorEdgeLengths;


	// make polyhedron
	var poly = new Polyhedra(points, options);
	// extend with platonic properties
	poly.length = length;
	poly.center = center;
	poly.radius = radius;

	// hooray!
	return poly;
}


/*
	Icosahedron - 12
	https://www.facebook.com/rafaelaraujoart/photos/a.892132684181055.1073742021.695085470552445/892132720847718
 */
function Icosa(args) {

	args = args || {};

	// find properties
	var length = args.length || 6;
	var center = args.center || new THREE.Vector3(0, 0, 0);
	var radius = Math.sqrt(((length / 2) * (length / 2)) / 2);

	// find points
	var points = [];

	// golden lengths
	var one = 1 * length;
	var phi = 1.618 * length;
	var shorter = one / 2;
	var longer = phi / 2;

	// x rectangle
	points.push(new THREE.Vector3(
		center.x + longer,
		center.y + shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + longer,
		center.y - shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x - longer,
		center.y - shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x - longer,
		center.y + shorter,
		center.z + 0));

	// y rectangle
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + longer,
		center.z + shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + longer,
		center.z - shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y - longer,
		center.z - shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y - longer,
		center.z + shorter));

	// z rectangle
	points.push(new THREE.Vector3(
		center.x + shorter,
		center.y + 0,
		center.z + longer));
	points.push(new THREE.Vector3(
		center.x - shorter,
		center.y + 0,
		center.z + longer));
	points.push(new THREE.Vector3(
		center.x - shorter,
		center.y + 0,
		center.z - longer));
	points.push(new THREE.Vector3(
		center.x + shorter,
		center.y + 0,
		center.z - longer));


	// configure options
	var options = args.options || {};

	// faces?
	if (args.faces) {
		// shortest edge triangles
		options.faceSideCountByLengthIndex = {
			"0": 3
		};
	}

	// edges?
	if (typeof args.edges === "number") {
		// show just
		options.lengthIndex = args.edges;
	} else if (args.edges === true) {
		// do nothing, all shown by default
	} else {
		options.hideAllLines = true;
	}

	// color edges by length?
	options.colorLengths = args.colorEdgeLengths;


	// make polyhedron
	var poly = new Polyhedra(points, options);
	// extend with platonic properties
	poly.length = length;
	poly.center = center;
	poly.radius = radius;

	// hooray!
	return poly;
}


/*
	Dodecahedron - 20
	https://www.facebook.com/rafaelaraujoart/photos/a.895505900510400.1073742024.695085470552445/895505947177062
 */
function Dodeca(args) {

	args = args || {};

	// find properties
	var length = args.length || 6;
	var center = args.center || new THREE.Vector3(0, 0, 0);
	var radius = Math.sqrt(((length / 2) * (length / 2)) / 2);

	// find points
	var points = [];

	// golden lengths
	var one = 1 * length;
	var phi = 1.618 * length;
	var shorter = one / 2;
	var longer = (phi + one) / 2;
	var halfphi = phi / 2;

	// x rectangle
	points.push(new THREE.Vector3(
		center.x + longer,
		center.y + shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x + longer,
		center.y - shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x - longer,
		center.y - shorter,
		center.z + 0));
	points.push(new THREE.Vector3(
		center.x - longer,
		center.y + shorter,
		center.z + 0));

	// y rectangle
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + longer,
		center.z + shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y + longer,
		center.z - shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y - longer,
		center.z - shorter));
	points.push(new THREE.Vector3(
		center.x + 0,
		center.y - longer,
		center.z + shorter));

	// z rectangle
	points.push(new THREE.Vector3(
		center.x + shorter,
		center.y + 0,
		center.z + longer));
	points.push(new THREE.Vector3(
		center.x - shorter,
		center.y + 0,
		center.z + longer));
	points.push(new THREE.Vector3(
		center.x - shorter,
		center.y + 0,
		center.z - longer));
	points.push(new THREE.Vector3(
		center.x + shorter,
		center.y + 0,
		center.z - longer));

	// phi cube
	points.push(new THREE.Vector3(
		center.x + halfphi,
		center.y + halfphi,
		center.z + halfphi));
	points.push(new THREE.Vector3(
		center.x - halfphi,
		center.y + halfphi,
		center.z + halfphi));
	points.push(new THREE.Vector3(
		center.x + halfphi,
		center.y - halfphi,
		center.z + halfphi));
	points.push(new THREE.Vector3(
		center.x + halfphi,
		center.y + halfphi,
		center.z - halfphi));
	points.push(new THREE.Vector3(
		center.x - halfphi,
		center.y - halfphi,
		center.z + halfphi));
	points.push(new THREE.Vector3(
		center.x - halfphi,
		center.y + halfphi,
		center.z - halfphi));
	points.push(new THREE.Vector3(
		center.x + halfphi,
		center.y - halfphi,
		center.z - halfphi));
	points.push(new THREE.Vector3(
		center.x - halfphi,
		center.y - halfphi,
		center.z - halfphi));


	// configure options
	var options = args.options || {};

	// faces?
	if (args.faces) {
		// shortest edge pentagons
		options.faceSideCountByLengthIndex = {
			"0": 5
		};
	}

	// edges?
	if (typeof args.edges === "number") {
		// show just
		options.lengthIndex = args.edges;
	} else if (args.edges === true) {
		// do nothing, all shown by default
	} else {
		options.hideAllLines = true;
	}

	// color edges by length?
	options.colorLengths = args.colorEdgeLengths;


	// make polyhedron
	var poly = new Polyhedra(points, options);
	// extend with platonic properties
	poly.length = length;
	poly.center = center;
	poly.radius = radius;

	// hooray!
	return poly;
}

