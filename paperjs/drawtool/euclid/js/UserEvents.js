/**
 * UserEvents class
 */

function UserEvents() {
	// properties
	this.nearPoints = [];
	this.decisivePoint = null;
	this.cursorPosition = null;
	this.tool = new paper.Tool();
	// construction
	this.addEventListeners();
}


UserEvents.prototype.addEventListeners = function () {

	var _this = this;

	this.tool.onMouseMove = function (e) {
		app.cursor.current.position = e.point;
		_this.cursorPosition = e.point;
		app.userShape.handleMousemove(e);
		_this.checkValidities();
		paper.view.draw();
	};

	this.tool.onMouseDown = function (e) {
		if (app.menu.hit(e.point)) {
			app.userShape.clear();
			//app.points.hideAll();
			paper.view.draw();
			return;
		}

		app.userShape.handleMousedown(e);

		if (app.shapes.count() === 0 && app.userShape.shape) {
			app.userShape.strokeColor = app.settings.strokeColor_success;
		}

		paper.view.draw();

	};

	this.tool.onKeyDown = function (e) {
		switch (e.key) {
			case 'escape':
			case 'enter':
				app.userShape.clear();
				break;
		}
	};

};


UserEvents.prototype.checkValidities = function () {
	var point, mark;
	var shape = app.userShape.shape;
	var shapesCount = app.shapes.count();
	if (shapesCount === 0) {
		// first shape, all is good
		app.cursor.current.style.strokeColor = app.settings.strokeColor_success;
		if (shape) {
			shape.strokeColor = app.settings.strokeColor_success;
		}
	} else if (shapesCount === 1 && !shape) {
		// creating second shape, first shape is good
		if (Points.isPointNearShape(this.cursorPosition, app.shapes.get(0))) {
			// shape hit, near
			app.cursor.current.style.strokeColor = app.settings.strokeColor_success;
		} else {
			app.cursor.current.style.strokeColor = app.settings.strokeColor;
		}
	} else {
		// committing second or creating more
		this.nearPoints = [];
		this.decisivePoint = null;
		app.cursor.current.style.strokeColor = app.settings.strokeColor;
		var points = app.points.points.arr;
		var marks = app.points.marks.arr;
		for (var i = 0, l = points.length; i < l; i++) {
			point = points[i];
			mark = marks[i];
			if (Points.isPointNearPoint(point, this.cursorPosition)) {
				if (!this.decisivePoint) {
					// cursor hit, decisive
					app.cursor.current.style.strokeColor = app.settings.strokeColor_success;
					mark.style.strokeColor = app.settings.strokeColor_success;

					if (app.settings.pointHiding) {
						mark.visible = true;
					}

					this.nearPoints.push(point);
					this.decisivePoint = point;
					if (shape) {
						shape.strokeColor = app.settings.strokeColor_success;
					}
				} else {
					// cursor already hit a point, is this one closer?
					var oldVector = this.cursorPosition.subtract(this.decisivePoint);
					var newVector = this.cursorPosition.subtract(point);
					if (newVector.length < oldVector.length) {
						// this point is closer to cursor, update
						var oldMark = app.points.marks.map[this.decisivePoint.toString()];
						oldMark.strokeColor = app.settings.strokeColor;
						mark.strokeColor = app.settings.strokeColor_success;
						this.decisivePoint = point;
					}
				}
			} else if (shape && shape.data.type === 'circle' &&
					Points.isPointNearShape(point, shape)) {
				// shape hit, near
				shape.strokeColor = app.settings.strokeColor_success;
				mark.style.strokeColor = app.settings.strokeColor_mark;

				if (app.settings.pointHiding) {
					mark.visible = true;
				}

				this.nearPoints.push(point);
			} else {
				// hide point
				if (app.settings.pointHiding) {
					mark.visible = false;
				} else {
					mark.style.strokeColor = app.settings.strokeColor_mark;
				}
			}
		}
		if (this.nearPoints.length &&
				!this.decisivePoint &&
				shape && shape.data.type === 'circle') {
			// found near points but not decisive, choose & mark first
			point = this.nearPoints[0];
			this.decisivePoint = point;
			mark = app.points.marks.map[point.toString()];
			mark.strokeColor = app.settings.strokeColor_success;
		}
		if (!this.decisivePoint && shape) {
			// no decisive point, reset shape color
			shape.strokeColor = app.settings.strokeColor;
		}
	}
};