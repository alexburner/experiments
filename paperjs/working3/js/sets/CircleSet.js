function makePointSet (circles) {
	
	var pointSet = new PointSet();
	
	// circle centers
	circles.forEach(function (circle) {
		pointSet.add(circle.position);
	});

	// circle intsersections
	circles.forEach(function (circleA, indexA) {
		var pointA = circleA.position;
		circles.forEach(function (circleB, indexB) {
			if (indexA === indexB) return;
			var pointB = circleB.position;
			var vector = pointA.subtract(pointB);
			vector.length = util.roundish(vector.length);
			if (vector.length === SIZES.DIAMETER) {
				// kissing circles
				pointSet.add(new Point(
					util.getCentroid([pointA, pointB])
				));
			} else if (vector.length < SIZES.DIAMETER) {
				// overlapping circles
				var intersections = circleA.getIntersections(circleB);
				pointSet.addAll(intersections.map(function (intersection) {
					return intersection.point;
				}));
			}
		});	
	});

	return pointSet;

}