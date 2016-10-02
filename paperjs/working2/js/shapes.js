/**
 * Shapes
 */

var shapes = {

	Backdrop: function (bounds) {
		bounds = bounds || paper.view.bounds;
		var backdrop = new paper.Path.Rectangle(bounds);
		backdrop.fillColor = 'white';
		return backdrop;
	},

	Panel: function (origin, size) {
		var rect = new paper.Rectangle(origin, size);
		var panel = new paper.Path.Rectangle(rect);
		panel.strokeColor = 'black';
		panel.strokeWidth = 1;
		panel.opacity = 0.1;
		return panel;
	},

	Circle: function (center, radius) {
		return new paper.Path.Circle({
			center: center,
			radius: radius,
			strokeCap: 'round',
			strokeColor: '#ADE',
			strokeWidth: 0.75
		});
	},

	Seed: function (center, radius) {
		var seed = new shapes.Circle(center, radius);
		seed.strokeColor = 'black';
		seed.opacity = 0.25;
		return seed;
	},

	Line: function (from, to) {
		return new paper.Path.Line({
			from: from,
			to: to,
			strokeCap: 'round',
			strokeColor: 'black',
			strokeWidth: 1.2,
			opacity: 0.25
		});
	},

	Dot: function (point, color) {
		color = color || 'black';
		var dot = new shapes.Circle(point, 2);
		dot.strokeColor = color;
		dot.opacity = 0.67;
		return dot;
	}

};