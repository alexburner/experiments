function TwoCell(props) {
    var space = 2;

    var count = props.count;
    var width = props.width;
    var height = props.height;
    var top = props.top;
    var left = props.left;
    var centerX = props.centerX;
    var centerY = props.centerY;
    var radius = props.radius;
    var options = props.options;
    var draw = props.draw;
    var pool = props.pool;
    var queue = props.queue;
    var context = props.context;

    function render(points) {
        context.clearRect(left, top, width, height);
        context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        _.each(points, function (pointA) {
            var x1 = centerX + radius * pointA[0];
            var y1 = centerY + radius * pointA[1];
            if (draw.dots) {
                context.beginPath();
                context.arc(x1, y1, 4, 0, Math.PI * 2);
                context.fill();
            }
            var closestPoint = null;
            var closestLength = Infinity;
            _.each(points, function (pointB) {
                if (pointA === pointB) return;
                if (draw.lines) {
                    var x2 = centerX + radius * pointB[0];
                    var y2 = centerY + radius * pointB[1];
                    context.beginPath();
                    context.moveTo(x1, y1);
                    context.lineTo(x2, y2);
                    context.stroke();
                }

                if (draw.circles) {
                    var length = Maths.vectorLength(
                        Maths.subtractVectors(
                            pointA, pointB
                        )
                    );
                    if (length < closestLength) {
                        closestLength = length;
                        closestPoint = pointB;
                    }
                }
            });
            if (draw.circles) {
                context.beginPath();
                context.arc(x1, y1, radius * closestLength, 0, Math.PI * 2);
                context.stroke();
            }
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