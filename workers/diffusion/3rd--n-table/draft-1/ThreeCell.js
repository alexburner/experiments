function ThreeCell(args) {

    var el = args.el;

    var radius = args.radius;
    var width = args.width;
    var height = args.height;

    var count = args.count;
    var space = 3;

    // temp hack until vertices are rendered
    if (count < 2) return {
        start: function () {},
    };

    var options = args.options;

    var pool = args.pool;
    var queue = args.queue;

    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var d = 36;
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

    var controls = new THREE.OrthographicTrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.2;
    controls.noZoom = true;
    controls.noPan = true;
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });
    window.addEventListener('resize', function() {
        controls.handleResize();
    });

    // pre-draw lines
    var material = new THREE.LineBasicMaterial({
        linewidth: 1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.25
    });
    var geometry = new THREE.Geometry();
    _.times(count * count - count, function () {
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    });
    var lines = new THREE.Line(geometry, material);
    scene.add(lines);

    var isRotating = true;

    function render(points) {
        var index = 0;
        // update line vertices with particle vectors
        _.each(points, function (pointA) {
            var x1 = radius * pointA[0];
            var y1 = radius * pointA[1];
            var z1 = radius * pointA[2];
            // var z1 = 0; // for 2d version
            _.each(points, function (pointB) {
                if (pointA === pointB) return;
                var x2 = radius * pointB[0];
                var y2 = radius * pointB[1];
                var z2 = radius * pointB[2];
                // var z2 = 0; // for 2d version
                var v1 = geometry.vertices[index++];
                var v2 = geometry.vertices[index++];
                v1.x = x1;
                v1.y = y1;
                v1.z = z1;
                v2.x = x2;
                v2.y = y2;
                v2.z = z2;
            });
        });
        if (isRotating) {
            var slowdown = 800;
            lines.rotateX(-Math.PI / 2 / slowdown / 10);
            lines.rotateY(Math.PI / 2 / slowdown);
            lines.rotateZ(-Math.PI / 2 / slowdown / 10);
        }
        geometry.verticesNeedUpdate = true;
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