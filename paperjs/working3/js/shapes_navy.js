/**
 * Shapes
 */

var shapes = {

	Backdrop: function (bounds) {
		bounds = bounds || paper.view.bounds;
		var backdrop = new paper.Path.Rectangle(bounds);
		backdrop.fillColor = '#002';
		return backdrop;
	},

	Panel: function (origin, size) {
		var rect = new paper.Rectangle(origin, size);
		var panel = new paper.Path.Rectangle(rect);
		panel.strokeColor = 'white';
		panel.strokeWidth = 1;
		panel.opacity = 0.2;
		return panel;
	},

	Circle: function (center, radius) {
		return new paper.Path.Circle({
			center: center,
			radius: radius,
			strokeCap: 'round',
			strokeColor: 'white',
			strokeWidth: 1.6,
			opacity: 0.33
		});
	},

	Seed: function (center, radius) {
		var seed = new shapes.Circle(center, radius);

		return seed;
	},

	Line: function (from, to) {
		return new paper.Path.Line({
			from: from,
			to: to,
			strokeCap: 'round',
			strokeColor: 'white',
			strokeWidth: 1.4,
			opacity: 0.25
		});
	},

	Mark: function (point, color) {
		color = color || 'white';
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
		return mark;
	}

};