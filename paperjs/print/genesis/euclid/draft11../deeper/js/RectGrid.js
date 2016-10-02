function RectGrid(origin, size, rowCount, colCount) {
	// properties
	this.origin = origin;
	this.size = size;
	this.group = new paper.Group();
	this.matrix = undefined;
	// construction
	this.makePanels(rowCount, colCount);
}

RectGrid.prototype.makePanels = function(rowCount, colCount) {

	this.matrix = [];

	var cellWidth = Math.round((this.size.width) / colCount);
	var cellHeight = Math.round((this.size.height) / rowCount);

	var currentX = this.origin.x;
	var currentY = this.origin.y;

	for (var i = 0; i < rowCount; i++) {
		var rectRow = [];
		for (var j = 0; j < colCount; j++) {

			var rect = new paper.Rectangle(
				new paper.Point(
					currentX,
					currentY
				),
				new paper.Size(
					cellWidth,
					cellHeight
				)
			);

            var boxRect = rect.clone();
            boxRect.x -= 1/2;
            boxRect.y -= 1/2;
            boxRect.width += 1;
            boxRect.height += 1;
            var box = new paper.Path.Rectangle(boxRect);
            box.strokeWidth = 1;
            box.strokeColor = 'white';

			rectRow.push(rect);
			currentX += cellWidth;
		}
		this.matrix.push(rectRow);
		currentY += cellHeight;
		currentX = this.origin.x;
	}
};
