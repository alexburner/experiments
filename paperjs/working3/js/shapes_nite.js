/**
 * Shapes
 */

var shapes = {

	Backdrop: function (bounds) {
		bounds = bounds || paper.view.bounds;
		var backdrop = new paper.Path.Rectangle(bounds);
		backdrop.fillColor = '#111';
		return backdrop;
	},

	Panel: function (origin, size) {
		var rect = new paper.Rectangle(origin, size);
		var panel = new paper.Path.Rectangle(rect);
		panel.strokeColor = '#FFE';
		panel.strokeWidth = 1;
		panel.opacity = 0.2;
		return panel;
	},

	Circle: function (center, radius) {
		return new paper.Path.Circle({
			center: center,
			radius: radius,
			strokeCap: 'round',
			strokeColor: '#521',
			strokeWidth: 1.2
		});
	},

	Seed: function (center, radius) {
		var seed = new shapes.Circle(center, radius);
		seed.strokeColor = '#FFD';
		seed.strokeWidth = 1.2;
		seed.opacity = 0.33;
		return seed;
	},

	Line: function (from, to) {
		return new paper.Path.Line({
			from: from,
			to: to,
			strokeCap: 'round',
			strokeColor: '#FFE',
			strokeWidth: 1.2,
			opacity: 0.25
		});
	},

	Mark: function (point, color) {
		color = color || '#FFD';
		var mark = new shapes.Circle(point, 2);
		mark.strokeColor = color;
		mark.fillColor = color;
		mark.opacity = 0.67;
		return mark;
	},

	MarkCentroid: function (point) {
		var mark = new shapes.Mark(point);
		var color = '#F00';
		mark.strokeColor = color;
		mark.fillColor = color;
		return mark;
	},

	MarkFacet: function (point) {
		var mark = new shapes.Mark(point);
		var color = '#FC4';
		mark.strokeColor = color;
		mark.fillColor = color;
		return mark;
	}

};