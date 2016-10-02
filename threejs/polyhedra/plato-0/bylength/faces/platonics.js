
/*
	Tetrahedron - 4
 */
function Tetra(length, center, options) {

	center = center || new THREE.Vector3(0, 0, 0);
	options = options || {};
	options.lengthIndex = 0;

	var l = length;
	var c = center;

	var radius = Math.sqrt(((l / 2) * (l / 2)) / 2);

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

	return new Polyhedra(points, options);
}


/*
	Octahedron - 6
 */
function Octa(length, center, options) {

	center = center || new THREE.Vector3(0, 0, 0);
	options = options || {};
	options.lengthIndex = 0;

	var l = length;
	var c = center;

	var radius = Math.sqrt((l * l) / 2);

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

	return new Polyhedra(points, options);
}


/*
	Hexahedron - 8
 */
function Hexa(length, center, options) {

	center = center || new THREE.Vector3(0, 0, 0);
	options = options || {};
	options.lengthIndex = 0;

	var l = length;
	var c = center;

	var radius = l / 2;

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
	return new Polyhedra(points, options);
}


/*
	Icosahedron - 12
	https://www.facebook.com/rafaelaraujoart/photos/a.892132684181055.1073742021.695085470552445/892132720847718
 */
function Icosa(length, center, options) {

	center = center || new THREE.Vector3(0, 0, 0);
	options = options || {};
	options.lengthIndex = 0;

	var l = length;
	var c = center;

	var one = 1 * l;
	var phi = 1.618 * l;
	var shorter = one / 2;
	var longer = phi / 2;

	var points = [];

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

	return new Polyhedra(points, options);
}


/*
	Dodecahedron - 20
	https://www.facebook.com/rafaelaraujoart/photos/a.895505900510400.1073742024.695085470552445/895505947177062
 */
function Dodeca(length, center, options) {

	center = center || new THREE.Vector3(0, 0, 0);
	options = options || {};
	options.lengthIndex = 0;

	var l = length;
	var c = center;

	var one = 1 * l;
	var phi = 1.618 * l;
	var shorter = one / 2;
	var longer = (phi + one) / 2;
	var halfphi = phi / 2;

	var points = [];

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

	return new Polyhedra(points, options);
}
