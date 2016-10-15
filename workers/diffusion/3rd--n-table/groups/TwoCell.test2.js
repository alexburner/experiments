function TwoCell(props) {

    var el = props.el;
    var radius = props.radius;
    var width = props.width;
    var height = props.height;
    var count = props.count;
    var space = 2;
    var options = props.options;
    var pool = props.pool;
    var queue = props.queue;

    var canvasEl = document.createElement('canvas');
    var context = canvasEl.getContext('2d');
    canvasEl.width = width;
    canvasEl.height = height;
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = 0;
    canvasEl.style.left = 0;
    el.appendChild(canvasEl);

    var centerX = width / 2;
    var centerY = height / 2;

    function render(points) {
        context.clearRect(0, 0, width, height);
        context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        _.each(points, function (pointA) {
            var x = centerX + radius * pointA[0];
            var y = centerY + radius * pointA[1];
            context.beginPath();
            context.arc(x, y, 8, 0, Math.PI * 2);
            context.fill();
            // find nearest point
            var closestPoint = null;
            var closestLength = Infinity;
            _.each(points, function (pointB) {
                if (pointA === pointB) return;
                var length = Maths.vectorLength(
                    Maths.subtractVectors(pointA, pointB)
                );
                if (length < closestLength) {
                    closestLength = length;
                    closestPoint = pointB;
                }
            });
            // draw circle out to nearest point
            context.beginPath();
            context.arc(x, y, radius * closestLength, 0, Math.PI * 2);
            context.stroke();
        });
    }

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