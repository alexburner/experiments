/**
 * UserShape class
 */

function UserShape() {
	this.shape = null;
	this.origin = null;
}

UserShape.prototype.createCircle = function (point) {
	this.origin = point;
	this.shape = new paper.Path.Circle({
		center: this.origin,
		radius: 1,
		strokeWidth: app.settings.strokeWidth,
		strokeColor: app.settings.strokeColor,
		fillColor: app.settings.fillColor,
		opacity: app.settings.opacity
	});
	this.shape.data.type = 'circle';
	this.shape.data.radius = 1;

	// todo note warn hack
	if (app.shapes.count() <= 1) {
		// color 1st & 2nd new circle green
		this.shape.strokeColor = app.settings.strokeColor_success;
	}
};

UserShape.prototype.createLine = function (point) {
	this.origin = point;
	this.shape = new paper.Path.Line({
		from: this.origin,
		to: this.origin,
		strokeWidth: app.settings.strokeWidth,
		strokeColor: app.settings.strokeColor,
		fillColor: app.settings.fillColor,
		opacity: app.settings.opacity
	});
	this.shape.data.type = 'line';
};

UserShape.prototype.updateCircle = function (point) {
	var radius = this.origin.subtract(point).length;
	var newShape = new paper.Path.Circle({
		center: this.origin,
		radius: radius,
		strokeWidth: app.settings.strokeWidth,
		strokeColor: app.settings.strokeColor,
		fillColor: app.settings.fillColor,
		opacity: app.settings.opacity
	});
	this.shape.remove();
	this.shape = newShape;
	this.shape.data.type = 'circle';
	this.shape.data.radius = radius;
};

UserShape.prototype.updateLine = function (point) {
	var newShape = new paper.Path.Line({
		from: this.origin,
		to: point,
		strokeWidth: app.settings.strokeWidth,
		strokeColor: app.settings.strokeColor,
		fillColor: app.settings.fillColor,
		opacity: app.settings.opacity
	});
	this.shape.remove();
	this.shape = newShape;
	this.shape.data.type = 'line';
};

UserShape.prototype.create = function (point) {
	switch (app.cursor.current.data.type) {
		case 'circle':
			this.createCircle(point);
			break;
		case 'line':
			this.createLine(point);
			break;
	}
};

UserShape.prototype.update = function (point) {
	switch (app.cursor.current.data.type) {
		case 'circle':
			this.updateCircle(point);
			break;
		case 'line':
			this.updateLine(point);
			break;
	}
};

UserShape.prototype.commit = function (nearPoint) {
	if (nearPoint) {
		switch (app.cursor.current.data.type) {
			case 'circle':
				this.updateCircle(nearPoint);
				break;
			case 'line':
				this.updateLine(nearPoint);
				break;
		}
	}
	// reset color/state
	this.shape.strokeColor = app.settings.strokeColor;
	app.cursor.current.style.strokeColor = app.settings.strokeColor;
	var marks = app.points.marks.arr;
	for (var i = 0, l = marks.length; i < l; i++) {
		var mark = marks[i];
		if (app.settings.pointHiding) {
			mark.visible = false;
		} else {
			mark.style.strokeColor = app.settings.strokeColor;
		}
	}
	// add to collection
	app.shapes.add(this.shape);
	// reset usershape
	this.shape = null;
	this.origin = null;
	// check validities again
	app.userEvents.checkValidities();
};

UserShape.prototype.clear = function () {
	if (!this.shape) return;
	this.shape.remove();
	this.shape = null;
	this.origin = null;
};

UserShape.prototype.handleMousemove = function (e) {
	if (!this.shape) return;
	this.update(e.point);
};

UserShape.prototype.handleMousedown = function (e) {
	if (app.shapes.count() === 0) {
		// first circle
		if (!this.shape) {
			// not drawn yet, create
			this.create(e.point);
		} else {
			// already drawn, commit
			this.commit();
		}
	} else if (app.shapes.count() === 1 && !this.shape) {
		// second circle, not drawn yet
		var hitResult = app.shapes.get(0).hitTest(e.point, {
			tolerance: app.settings.tolerance,
			stroke: true
		});
		if (hitResult) {
			// create if touching first circle
			this.create(hitResult.point);
		}
	} else {
		// any further shape clicks
		if (app.userEvents.decisivePoint) {
			// user is near a valid point
			if (this.shape) {
				// shape is drawn, commit
				this.commit(app.userEvents.decisivePoint);
			} else {
				this.create(app.userEvents.decisivePoint);
			}
		}
	}


	return;

};