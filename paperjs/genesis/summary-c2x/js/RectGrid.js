function RectGrid(origin, size, paddingV, paddingH, rows, cols) {
	// properties
	this.origin = origin;

	this.origin.y -= 7;

	this.size = size;
	this.group = new paper.Group();
	this.matrix = undefined;
	// construction
	this.makePanels(paddingV, paddingH, rows, cols);
}

RectGrid.prototype.makePanels = function(paddingV, paddingH, rows, cols) {

	this.matrix = [];

	var cellWidth = (this.size.width - paddingH) / cols;
	var cellHeight = (this.size.height - paddingV) / rows;

	// cellHeight = cellWidth;

	var currentX = this.origin.x;
	var currentY = this.origin.y;

	for (var i = 0; i < rows; i++) {
		var rectRow = [];
		for (var j = 0; j < cols; j++) {

			var rect = new paper.Rectangle(
				new paper.Point(
					currentX + paddingH,
					currentY + paddingV
				),
				new paper.Size(
					cellWidth - paddingH,
					cellHeight - paddingV
				)
			);

			rectRow.push(rect);
			currentX += cellWidth;
		}
		this.matrix.push(rectRow);
		currentY += cellHeight;
		currentX = this.origin.x;
	}
};
