// set the scene size
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;

// set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
//var $container = $('#container');
var containerEl = document.getElementById('container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true
});
// var camera =
// 	new THREE.PerspectiveCamera(
// 		VIEW_ANGLE,
// 		ASPECT,
// 		NEAR,
// 		FAR);
var aspect = ASPECT;
var d = 160;
var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 12000 );
camera.position.set( 200, 200, 200 );
camera.rotation.order = 'YXZ';
camera.rotation.y = - Math.PI / 4;
camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
// var zoom = 1;
// camera.position.y = 360 / zoom;
// camera.position.x = 180 / zoom;
// camera.position.z = 60 / zoom;

// camera.position.y = 360;
// camera.position.z = 360;
// camera.position.x = 360;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
//$container.append(renderer.domElement);
containerEl.appendChild(renderer.domElement);

// // create a point light
// var pointLight =
// 	new THREE.PointLight(0xFFFFFF);

// // set its position
// pointLight.position.x = 10;
// pointLight.position.y = 50;
// pointLight.position.z = 130;

// // add to the scene
// scene.add(pointLight);



// draw!

var controls = new THREE.TrackballControls(camera);
controls.addEventListener( 'change', render );

var render = function () {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	controls.update();
};

render();



// Create an event listener that resizes the renderer with the browser window.
// via http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
window.addEventListener('resize', function() {
	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	if (aspect) {
		// orthographic camera
		aspect = WIDTH / HEIGHT;
		camera.left = -d * aspect;
		camera.right = d * aspect;
	} else {
		// perspective camera
		camera.aspect = WIDTH / HEIGHT;
	}
	camera.updateProjectionMatrix();
	renderer.setSize(WIDTH, HEIGHT);
	controls.handleResize();
});
