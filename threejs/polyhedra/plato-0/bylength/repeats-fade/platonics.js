
/*
	Tetrahedron - 4
 */
function Tetra(length, center) {
	length = length / 2;
	center = center || new THREE.Vector3(0, 0, 0);
	var l = length;
	var c = center;
	var radius = Math.sqrt((l * l) / 2);
	var points = [];
	points.push(new THREE.Vector3(
		c.x + radius,
		c.y + radius,
		c.z + radius));
	points.push(new THREE.Vector3(
		c.x - radius,
		c.y - radius,
		c.z + radius));
	points.push(new THREE.Vector3(
		c.x - radius,
		c.y + radius,
		c.z - radius));
	points.push(new THREE.Vector3(
		c.x + radius,
		c.y - radius,
		c.z - radius));
	return new Polyhedra(points, {
		lengthIndex: 0
	});
}


/*
	Octahedron - 6
 */
function Octa(length) {
	var radius = Math.sqrt((length * length) / 2);
	var points = [];
	points.push(new THREE.Vector3(radius, 0, 0));
	points.push(new THREE.Vector3(0, radius, 0));
	points.push(new THREE.Vector3(0, 0, radius));
	points.push(new THREE.Vector3(-radius, 0, 0));
	points.push(new THREE.Vector3(0, -radius, 0));
	points.push(new THREE.Vector3(0, 0, -radius));
	return new Polyhedra(points, {
		lengthIndex: 0
	});
}


/*
	Hexahedron - 8
 */
function Hexa(length) {
	var radius = length / 2;
	var points = [];
	points.push(new THREE.Vector3(radius, radius, radius));
	points.push(new THREE.Vector3(-radius, -radius, radius));
	points.push(new THREE.Vector3(-radius, radius, -radius));
	points.push(new THREE.Vector3(radius, -radius, -radius));
	points.push(new THREE.Vector3(-radius, -radius, -radius));
	points.push(new THREE.Vector3(radius, radius, -radius));
	points.push(new THREE.Vector3(radius, -radius, radius));
	points.push(new THREE.Vector3(-radius, radius, radius));
	return new Polyhedra(points, {
		lengthIndex: 0
	});
}


/*
	Icosahedron - 12
 */
function Icosa(length) {

	// based on https://www.facebook.com/rafaelaraujoart/photos/a.892132684181055.1073742021.695085470552445/892132720847718

	var one = 1 * length;
	var phi = 1.618 * length;
	var shorter = one / 2;
	var longer = phi / 2;

	var points = [];

	// x rectangle
	points.push(new THREE.Vector3(longer, shorter, 0));
	points.push(new THREE.Vector3(longer, -shorter, 0));
	points.push(new THREE.Vector3(-longer, -shorter, 0));
	points.push(new THREE.Vector3(-longer, shorter, 0));

	// y rectangle
	points.push(new THREE.Vector3(0, longer, shorter));
	points.push(new THREE.Vector3(0, longer, -shorter));
	points.push(new THREE.Vector3(0, -longer, -shorter));
	points.push(new THREE.Vector3(0, -longer, shorter));

	// z rectangle
	points.push(new THREE.Vector3(shorter, 0, longer));
	points.push(new THREE.Vector3(-shorter, 0, longer));
	points.push(new THREE.Vector3(-shorter, 0, -longer));
	points.push(new THREE.Vector3(shorter, 0, -longer));

	return new Polyhedra(points, {
		lengthIndex: 0
	});
}


/*
	Dodecahedron - 20
 */
function Dodeca(length) {

	// based on https://www.facebook.com/rafaelaraujoart/photos/a.895505900510400.1073742024.695085470552445/895505947177062

	var one = 1 * length;
	var phi = 1.618 * length;
	var shorter = one / 2;
	var longer = (phi + one) / 2;
	var halfphi = phi / 2;

	var points = [];

	// x rectangle
	points.push(new THREE.Vector3(longer, shorter, 0));
	points.push(new THREE.Vector3(longer, -shorter, 0));
	points.push(new THREE.Vector3(-longer, -shorter, 0));
	points.push(new THREE.Vector3(-longer, shorter, 0));

	// y rectangle
	points.push(new THREE.Vector3(0, longer, shorter));
	points.push(new THREE.Vector3(0, longer, -shorter));
	points.push(new THREE.Vector3(0, -longer, -shorter));
	points.push(new THREE.Vector3(0, -longer, shorter));

	// z rectangle
	points.push(new THREE.Vector3(shorter, 0, longer));
	points.push(new THREE.Vector3(-shorter, 0, longer));
	points.push(new THREE.Vector3(-shorter, 0, -longer));
	points.push(new THREE.Vector3(shorter, 0, -longer));

	// phi cube
	points.push(new THREE.Vector3(halfphi, halfphi, halfphi));
	points.push(new THREE.Vector3(-halfphi, halfphi, halfphi));
	points.push(new THREE.Vector3(halfphi, -halfphi, halfphi));
	points.push(new THREE.Vector3(halfphi, halfphi, -halfphi));
	points.push(new THREE.Vector3(-halfphi, -halfphi, halfphi));
	points.push(new THREE.Vector3(-halfphi, halfphi, -halfphi));
	points.push(new THREE.Vector3(halfphi, -halfphi, -halfphi));
	points.push(new THREE.Vector3(-halfphi, -halfphi, -halfphi));

	return new Polyhedra(points, {
		lengthIndex: 0
	});
}
