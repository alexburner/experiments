function ThreeCell(args) {

    // Args
    var el = args.el;
    var radius = args.radius;
    var width = args.width;
    var height = args.height;
    var count = args.count;
    var space = 3;
    var options = args.options;
    var pool = args.pool;
    var queue = args.queue;

    // Renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    // Scene
    var scene = new THREE.Scene();

    // Camera
    var d = 80;
    var aspect = width / height;
    var camera = new THREE.OrthographicCamera(
        -d * aspect,
        d * aspect,
        d,
        -d,
        1,
        12000
    );
    camera.position.set(0, 0, 200);
    scene.add(camera);

    // Controls
    var controls = new THREE.OrthographicTrackballControls(
        camera,
        renderer.domElement
    );
    controls.rotateSpeed = 0.2;
    controls.noZoom = true;
    controls.noPan = true;
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });
    window.addEventListener('resize', function() {
        controls.handleResize();
    });

    // Circle texture
    var canvasEl = document.createElement('canvas');
    var context = canvasEl.getContext('2d');
    canvasEl.width = 32;
    canvasEl.height = 32;
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.beginPath();
    context.arc(16, 16, 16, 0, Math.PI * 2);
    context.fill();
    var circleTexture = new THREE.Texture(canvasEl);
    circleTexture.needsUpdate = true;

    // Lines
    var lines = new THREE.Line(
        new THREE.Geometry(),
        new THREE.LineBasicMaterial({
            linewidth: 1.2,
            color: 0x000000,
            transparent: true,
            opacity: 0.175,
            depthTest: false
        })
    );
    _.times(count * count - count, function () {
        lines.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        lines.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    });

    // Points
    var points = new THREE.Points(
        new THREE.Geometry(),
        new THREE.PointsMaterial({
            map: circleTexture,
            size: 16,
            sizeAttenuation: false,
            transparent: true,
            depthTest: false
        })
    );
    _.times(count, function () {
        points.geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    });

    // Add objects if there's something to render
    if (count > 1) scene.add(lines);
    if (count > 0) scene.add(points);

    var isRotating = true;
    var slowdown = 1000;
    var axis = new THREE.Vector3(0.1, 1, 0.1);
    var angle = Math.PI / 2 / slowdown;

    function render(pointsData) {
        var lineIndex = 0;
        // update point & line vertices with particle vectors
        _.each(pointsData, function (pointA, index) {
            var x1 = radius * pointA[0];
            var y1 = radius * pointA[1];
            var z1 = radius * pointA[2];
            points.geometry.vertices[index].set(x1, y1, z1);
            _.each(pointsData, function (pointB) {
                if (pointA === pointB) return;
                var x2 = radius * pointB[0];
                var y2 = radius * pointB[1];
                var z2 = radius * pointB[2];
                lines.geometry.vertices[lineIndex++].set(x1, y1, z1);
                lines.geometry.vertices[lineIndex++].set(x2, y2, z2);
            });
        });
        if (isRotating) {
            lines.rotateOnAxis(axis, angle);
            points.rotateOnAxis(axis, angle);
        }
        lines.geometry.verticesNeedUpdate = true;
        points.geometry.verticesNeedUpdate = true;
        renderer.render(scene, camera);
        controls.update();
    }

    window.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        switch (key) {
            case 32: // spacebar
                e.preventDefault();
                isRotating = !isRotating;
                break;
        }
    });

    function requestInit() {
        pool.send({
            moduleName: 'Diffuse',
            methodName: 'init',
            argArr: [count, space],
        }, function (points) {
            requestTick(points);
        });
    }

    function requestTick(points) {
        pool.send({
            moduleName: 'Diffuse',
            methodName: 'tick',
            argArr: [points, options],
        }, function (points) {
            queue.add(function () {
                requestTick(points);
                render(points);
            });
        });
    }

    return { start: requestInit };

}