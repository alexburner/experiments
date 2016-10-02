/**
 * Makes a set of GenesisPanels
 */

function GenesisPanelCol (args) {
	var isSquare = args.isSquare;
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
	var w = width;
	var h = isSquare ? w : util.roundish((height - (padding * 6)) / 7);
	//for (var stage = 1; stage <= 8; stage++) {
	//for (var stage = 8; stage > 0; stage--) {
	for (var stage = 7; stage > 0; stage--) {
	// for (var stage = 1; stage <= 7; stage++) {
		this.geneses.push(
			new GenesisPanel(
				stage,
				radius,
				new paper.Point(x, y),
				new paper.Size(w, h)
			)
		);
		y += h + padding;
	}
}

GenesisPanelCol.prototype.applyForEach = function(methodName, argsArray) {
	this.geneses.forEach(function (genesis) {
		if (typeof genesis[methodName] === 'function') {
			genesis[methodName].apply(genesis, argsArray);
		}
	});
};