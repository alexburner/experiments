/**
 * Shapes
 */

var shapes = {

    strokeColor: 'white',
	strokeWidth: 1,
    opacity: 1/2,

	Backdrop: function (bounds) {
		bounds = bounds || paper.view.bounds;
		var backdrop = new paper.Path.Rectangle(bounds);
		backdrop.fillColor = 'black';
        return backdrop;
	},

	Panel: function (origin, size) {
		var rect = new paper.Rectangle(origin, size);
		var panel = new paper.Path.Rectangle(rect);
		panel.strokeColor = shapes.strokeColor;
		panel.strokeWidth = shapes.strokeWidth;
		panel.opacity = 0;
		return panel;
	},

	Circle: function (center, radius) {
		return new paper.Path.Circle({
			center: center,
			radius: radius,
			strokeCap: 'round',
			strokeColor: shapes.strokeColor,
			strokeWidth: shapes.strokeWidth,
			opacity: shapes.opacity
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
			strokeColor: shapes.strokeColor,
			strokeWidth: shapes.strokeWidth,
			opacity: shapes.opacity
		});
	},

	Mark: function (point, color) {
		color = color || shapes.strokeColor;
		var mark = new shapes.Circle(point, 3/2);
		mark.strokeColor = color;
		mark.fillColor = color;
		mark.opacity = shapes.opacity;
		return mark;
	},

	MarkCentroid: function (point) {
		var mark = new shapes.Mark(point);
		return mark;
	},

	MarkFacet: function (point) {
		var mark = new shapes.Mark(point);
		return mark;
	}

};
