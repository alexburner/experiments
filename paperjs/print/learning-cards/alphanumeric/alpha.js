function alpha(center, char, radius, fonts) {
    var count = fonts.length * 2;

    var letter = new paper.PointText({
        content: char === 0 ? '?' : String.fromCharCode(64 + char),
        fillColor: 'black',
        fontFamily: 'Times',
        fontWeight: 'bold',
        fontSize: 240
    });
    letter.position = center;
    letter.position.y += 9.3;

    var littles = [];
    var points = [];
    var angle = 360 / count;
    var vector = new paper.Point(center);
    vector.length = radius;
    vector.angle = -90;
    for (var i = 0, l = count; i < l; i++) {
        var point = new paper.Point(center);
        point = point.add(vector);
        points.push(point);

        var little = new paper.PointText({
            content: char === 0 ? '?' : String.fromCharCode(64 + char),
            fillColor: 'black',
            fontFamily: 'Times',
            fontWeight: 'bold',
            fontSize: 164
        });
        little.position = point;
        little.rotate(vector.angle, point)
        littles.push(little);

        vector.angle += angle;
    }

    littles = new paper.Group(littles);
    littles.scale(1.37, center);

    return radius;
}