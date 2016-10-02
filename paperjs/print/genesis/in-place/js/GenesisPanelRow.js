/**
 * Makes a set of GenesisPanels
 */

function GenesisPanelRow (args) {
	// config
	var width = args.width;
	var height = args.height;
	var radius = args.radius;
	var padding = args.padding;
	var originX = args.originX;
	var originY = args.originY;
	// attributes
	this.geneses = [];
	// constrution
	var x = originX;
	var y = originY;
	var w = util.roundish((width - (padding * 6)) / 7);
	var h = height;
	for (var i = 0, l = 7; i < l; i++) {
		var stage = i + 1;
		this.geneses.push(
			new GenesisPanel(
				stage,
				radius,
				new paper.Point(x, y),
				new paper.Size(w, h)
			)
		);
		x += w + padding;
	}
}

GenesisPanelRow.prototype.applyForEach = function(methodName, argsArray) {
	this.geneses.forEach(function (genesis) {
		if (typeof genesis[methodName] === 'function') {
			genesis[methodName].apply(genesis, argsArray);
		}
	});
};