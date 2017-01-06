function RectGrid(origin, size, padding, rowCount, colCount) {
	// properties
	this.origin = origin;
	this.size = size;
	this.group = new paper.Group();
	this.matrix = undefined;
	// construction
	this.makePanels(padding, rowCount, colCount);
}

RectGrid.prototype.makePanels = function(padding, rowCount, colCount) {

	this.matrix = [];

	var cellWidth = Math.round((this.size.width - padding) / colCount);
	var cellHeight = Math.round((this.size.height - padding) / rowCount);

	cellHeight = cellWidth;

	var currentX = this.origin.x;
	var currentY = this.origin.y;

	for (var i = 0; i < rowCount; i++) {
		var rectRow = [];
		for (var j = 0; j < colCount; j++) {

			var rect = new paper.Rectangle(
				new paper.Point(
					currentX + padding,
					currentY + padding
				),
				new paper.Size(
					cellWidth - padding,
					cellHeight - padding
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
