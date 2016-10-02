/**
 * Shapes class
 */

function Shapes() {
	this.drawn = [];
	this.undrawn = [];
	this.group = new paper.Group();
}

Shapes.prototype.count = function () {
	return this.drawn.length;
};

Shapes.prototype.get = function (index) {
	return this.drawn[index];
};

Shapes.prototype.getAll = function () {
	return this.drawn;
};

Shapes.prototype.getGroup = function () {
	return this.group;
};

Shapes.prototype.add = function (shape) {
	app.points.findNewPoints(shape);
	this.drawn.push(shape);
	this.group.addChild(shape);

	// TODO WARN NOTE where put this?
	if (this.count() > 1) {
		app.menu.enable();
	}
};

Shapes.prototype.undo = function () {



	/*
	
	HEY TODO NOTE WARN DANGER
	if undo need wipe Points
	and refind all points for system

	:',',',',',',',',',',',',',',',','(

	 */




	if (!this.drawn.length) return;
	var shape = this.drawn.pop();
	this.undrawn.push(shape);
	shape.remove();

	// TODO WARN NOTE where put this?
	if (this.count() <= 1) {
		app.menu.enable();
	}

	paper.view.draw();
};

Shapes.prototype.redo = function () {
	if (!this.undrawn.length) return;
	var shape = this.undrawn.pop();
	this.drawn.push(shape);
	paper.project.activeLayer.addChild(shape);
	this.group.addChild(shape);

	// TODO WARN NOTE where put this?
	if (this.count() > 1) {
		app.menu.enable();
	}

	paper.view.draw();
};
