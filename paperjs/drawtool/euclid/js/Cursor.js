/**
 * Cursor class
 */

function Cursor() {
	this.cCursor = new Cursor.Circle();
	this.lCursor = new Cursor.Line();
	this.current = this.cCursor;
}

Cursor.Circle = function(point) {
	var radius = app.settings.tolerance;
	point = point || new paper.Point(-radius, -radius);
	var circle = new paper.Path.Circle({
		center: new paper.Point(0, 0),
		radius: radius,
		strokeColor: app.settings.strokeColor,
		strokeWidth: app.settings.strokeWidth,
		opacity: app.settings.opacity
	});
	var dot = new paper.Path.Circle({
		center: new paper.Point(0, 0),
		radius: 1,
		fillColor: app.settings.strokeColor,
		opacity: app.settings.opacity
	});
	var group = new paper.Group();
	group.addChildren([circle, dot]);
	group.data.type = 'circle';
	group.position = point;
	return group;
};

Cursor.Line = function(point) {
	var radius = app.settings.tolerance;
	point = point || new paper.Point(-radius, -radius);
	var x = Math.sqrt(Math.pow(2 * radius, 2) / 2);
	var halfx = x / 2;
	var line1 = new paper.Path.Line({
		from: new paper.Point(-halfx, -halfx),
		to: new paper.Point(halfx, halfx),
		strokeCap: 'round',
		strokeColor: app.settings.strokeColor,
		strokeWidth: app.settings.strokeWidth,
		opacity: app.settings.opacity
	});
	var line2 = new paper.Path.Line({
		from: new paper.Point(-halfx, halfx),
		to: new paper.Point(halfx, -halfx),
		strokeCap: 'round',
		strokeColor: app.settings.strokeColor,
		strokeWidth: app.settings.strokeWidth,
		opacity: app.settings.opacity
	});
	var group = new paper.Group();
	group.addChildren([line1, line2]);
	group.data.type = 'line';
	group.position = point;
	return group;
};

Cursor.prototype.setCurrent = function (type, point) {
	if (type === this.current.data.type) return;
	switch (type) {
		case 'circle':
			this.current = this.cCursor;
			this.current.position = point;
			this.lCursor.visible = false;
			this.cCursor.visible = true;
			break;
		case 'line':
			this.current = this.lCursor;
			this.current.position = point;
			this.cCursor.visible = false;
			this.lCursor.visible = true;
			break;
	}
};

Cursor.prototype.setColor = function (type) {
	var color = app.settings.strokeColor;
	switch (type) {
		case 'default':
			color = app.settings.strokeColor;
			break;
		case 'success':
			color = app.settings.strokeColor_success;
			break;
		case 'danger':
			color = app.settings.strokeColor_danger;
			break;
	}
	this.cCursor.style.strokeColor = color;
	this.lCursor.style.strokeColor = color;
};