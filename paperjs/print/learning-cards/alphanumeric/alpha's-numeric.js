function alphanumeric(center, count, radius) {

    // var circle = new paper.Path.Circle({
    //     strokeColor: 'black',
    //     strokeWidth: 1,
    //     dashArray: [2, 3],
    //     center: center,
    //     radius: radius
    // });


    /**
     * No more for 0
     */
    if (count === 0) {
        return radius;
    }


    var points = [];
    var angle = 360 / count;
    var vector = new paper.Point(center);
    vector.length = radius;
    vector.angle = -90;
    for (var i = 0, l = count; i < l; i++) {
        var point = new paper.Point(center);
        point = point.add(vector);
        points.push(point);
        vector.angle += angle;
    }


    /**
     * No more for 1
     */
    if (count === 1) {
        return radius;
    }


    var lines = [];
    var lineExists = {};
    var linesByLength = {};
    points.forEach(function (pointA, indexA) {
        var coordsA = pointA.toString();
        points.forEach(function (pointB, indexB) {
            if (indexA === indexB) return;
            var coordsB = pointB.toString();
            if (lineExists[coordsA + coordsB]) return;
            if (lineExists[coordsB + coordsA]) return;
            lineExists[coordsA + coordsB] = true;

            var distance = pointA.subtract(pointB).length;
            distance = distance.toFixed(2);

            var line = new paper.Path.Line({
                from: pointA,
                to: pointB,
                opacity: 1,
                blendMode: 'multiply',
                strokeCap: 'round',
                strokeColor: '#777',
                strokeWidth: 2,
            });

            lines.push(line);

            if (!linesByLength[distance]) {
                linesByLength[distance] = [];
            }
            linesByLength[distance].push(line);

        });
    });


    return radius;
}

function createGridPoint(args) {
    var width = cellW; // number (pixels)
    var height = cellH; // number (pixels)

    var center = args.center; // paper.Point

    var xSpot = args.xSpot; // number (index)
    var ySpot = args.ySpot; // number (index)

    var xSpots = args.xSpots || 5; // number (length)
    var ySpots = args.ySpots || 5; // number (length)

    var paddingX = args.paddingX || width / 7;
    var paddingY = args.paddingY || height / 7;

    var _height = height - 2 * paddingY;
    var _width = width - 2 * paddingX;

    if (xSpots === 1 && ySpots === 1) {
        // special case for just 1
        var point = new paper.Point();
        point.x = center.x - width / 2;
        point.y = center.y - height / 2;
        point.x += paddingX;
        point.y += paddingY;
        point.x += _width / 2; // middle
        point.y += _height; // bottom
        return point;
    }

    var deltaY = _height / (ySpots - 1);
    var deltaX = _width / (xSpots - 1);

    var point = new paper.Point();
    point.x = center.x - width / 2;
    point.y = center.y - height / 2;
    point.x += paddingX;
    point.y += paddingY;
    point.x += deltaX * (xSpot - 1);
    point.y += deltaY * (ySpot - 1);
    return point;
}

function compareNumbers(a, b) {
    return a - b;
}