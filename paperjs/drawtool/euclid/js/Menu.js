/**
 * Menu class
 */

	/* 

	todo
	
	menu.items
		- box
		- icon
		- name
		- key
		- action

	menu.hit(point)
		items.foreach hitTest
			if hit, update w/ chosen item
		return if any hit 
		(only one call in listener)


	*/


function Menu() {
	this.disabled = false;
	this.cCursor = new Cursor.Circle(new paper.Point(15, 15));
	this.lCursor = new Cursor.Line(new paper.Point(15, 30));
	this.disable();
}

Menu.hitTest = function (icon, point) {
	return icon.hitTest(point, {
		tolerance: app.settings.tolerance,
		bounds: true
	});
};

Menu.prototype.disable = function () {
	this.disabled = true;
	this.cCursor.opacity = app.settings.opacity / 2;
	this.lCursor.opacity = app.settings.opacity / 2;
};

Menu.prototype.enable = function () {
	this.disabled = false;
	this.cCursor.opacity = 1;
	this.lCursor.opacity = 1;
};

Menu.prototype.hit = function (point) {
	if (this.hitCircle(point)) return true;
	if (this.hitLine(point)) return true;
	return false;
};

Menu.prototype.hitCircle = function (point) {
	if (!Menu.hitTest(this.cCursor, point)) return false;
	if (!this.disabled) {
		app.cursor.setCurrent('circle', point);
	}
	return true;
};

Menu.prototype.hitLine = function (point) {
	if (!Menu.hitTest(this.lCursor, point)) return false;
	if (!this.disabled) {
		app.cursor.setCurrent('line', point);
	}
	return true;
};