/**
 * Makes a set of GenesisPanels
 * @param {map} config = {
	 *                       set: {
	 *                       	direction,
	 *                       	originX,
	 *                       	originY,
	 *                       	padding
	 *                       },
	 *                       panel: {
	 *                       	radius,
	 *                       	width,
	 *                       	height
	 *                       }
 *                       }
 */
function GenesisPanelSet (config) {
	// elements
	this.geneses = [];
	// construction
	var d = config.set.direction;
	var x = config.set.originX;
	var y = config.set.originY;
	var p = config.set.padding;
	var r = config.panel.radius;
	var w = config.panel.width;
	var h = config.panel.height;
	for (var i = 0, l = 7; i < l; i++) {
		var stage = i + 1;
		var panel = new shapes.Panel(
			new paper.Point(x, y),
			new paper.Size(w, h)
		);
		var bounds = panel.bounds;
		var group = new paper.Group();
		group.addChild(panel);
		this.geneses.push(
			new Genesis({
				stage: stage,
				radius: r,
				origin: panel.position,
				bounds: bounds,
				group: group
			})
		);
		switch (d) {
			case 'up': y += w + p; break;
			case 'right': x += w + p; break;
			case 'left': x -= w + p; break;
			case 'down': y -= w + p; break;
		}
	}
}

GenesisPanelSet.prototype.applyForEach = function(methodName, argsArray) {
	this.geneses.forEach(function (genesis) {
		if (typeof genesis[methodName] === 'function') {
			genesis[methodName].apply(genesis, argsArray);
		}
	});
};