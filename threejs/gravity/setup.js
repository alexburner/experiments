var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(width, height);
renderer.setClearColor(0x333333, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    35,                // Field of view
    width / height,    // Aspect ratio
    0.1,               // Near plane
    10000              // Far plane
);
camera.position.set(-15, 10, 10);
camera.lookAt(scene.position);

var controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 2;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
};
render();

// Create an event listener that resizes the renderer with the browser window.
// via http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
window.addEventListener('resize', function() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    controls.handleResize();
});