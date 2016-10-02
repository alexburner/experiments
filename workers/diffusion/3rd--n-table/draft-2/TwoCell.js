function TwoCell(args) {

    var el = args.el;
    var radius = args.radius;
    var width = args.width;
    var height = args.height;
    var count = args.count;
    var space = 2;
    var options = args.options;
    var pool = args.pool;
    var queue = args.queue;

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

    function render(pointsData) {
        context.clearRect(0, 0, width, height);
        context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        _.each(pointsData, function (pointA) {
            var x1 = centerX + radius * pointA[0];
            var y1 = centerY + radius * pointA[1];
            context.beginPath();
            context.arc(x1, y1, 8, 0, Math.PI * 2);
            context.fill();
            _.each(pointsData, function (pointB) {
                if (pointA === pointB) return;
                var x2 = centerX + radius * pointB[0];
                var y2 = centerY + radius * pointB[1];
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
            });
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