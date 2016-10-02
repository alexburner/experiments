var finalCount = 24;


/**
 * Distribute dots around a circle
 * and connect them all with lines
 *
 * @param  {paper.Point} center		center of circle
 * @param  {Number} count  			number of points
 * @param  {Number} length 			length between points
 * @return {Number}        			radius of circle
 */
function drawByLength(center, count, length) {


	var startThickness = 6;
	var endThickness = 2;
	var countPercent = ((finalCount - count) / finalCount);
	var lineThickness = endThickness + ((startThickness - endThickness) * countPercent);


	console.log('countPercent = ' + countPercent);
	console.log('lineThickness = ' + lineThickness);



	// 0 has nothing
	if (count < 1) {
		return 0;
	}

	// 1 only a point
	if (count < 2) {
		new paper.Path.Circle({
			fillColor: 'black',
			center: center,
			radius: 4
		});
		return 0;
	}



	var angle = 360 / count;
	var angleRad = (2 * Math.PI) / count;
	var radius = (length / 2) / (Math.sin(angleRad / 2));

	// shift center to top
	//center[1] += radius;


	var circle = new paper.Path.Circle({

		strokeColor: 'black',
		strokeWidth: 1,
		dashArray: [2, 2],

		center: center,
		radius: radius + (lineThickness / 2)
	});

	var points = [];

	var vector = new paper.Point(center);
	vector.length = radius;
	vector.angle = -90;

	for (var i = 0, l = count; i < l; i++) {
		var point = new paper.Point(center);
		point = point.add(vector);
		points.push(point);
		vector.angle += angle;

		// new paper.Path.Circle({
		// 	fillColor: 'black',
		// 	center: point,
		// 	radius: 8
		// });

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

			var length = pointA.subtract(pointB).length;
			length = length.toFixed(2);

			var line = new paper.Path.Line({
				from: pointA,
				to: pointB,
				strokeCap: 'round',
				strokeColor: 'black',
				strokeWidth: lineThickness
			});

			lines.push(line);

			if (!linesByLength[length]) {
				linesByLength[length] = [];
			}
			linesByLength[length].push(line);

		});
	});

	return radius;
}