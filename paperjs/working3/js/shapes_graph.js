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
			strokeWidth: 1.4
		});
	},

	Seed: function (center, radius) {
		var seed = new shapes.Circle(center, radius);
		seed.strokeColor = 'black';
		seed.strokeWidth = 1.2;
		seed.opacity = 0.33;
		return seed;
	},

	Line: function (from, to) {
		return new paper.Path.Line({
			from: from,
			to: to,
			strokeCap: 'round',
			strokeColor: 'black',
			strokeWidth: 1.2,
			opacity: 0.33
		});
	},

	Mark: function (point, color) {
		color = color || 'black';
		var mark = new shapes.Circle(point, 2);
		mark.strokeColor = color;
		mark.opacity = 0.67;
		return mark;
	},

	MarkCentroid: function (point) {
		var mark = new shapes.Mark(point);
		mark.strokeColor = '#F00';
		return mark;
	},

	MarkFacet: function (point) {
		var mark = new shapes.Mark(point);
		mark.opacity = 0.34;
		return mark;
	}

};