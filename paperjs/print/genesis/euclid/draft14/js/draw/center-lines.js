function drawCenterLines(xOffset) {
    xOffset = xOffset || 0;

    // background color shape
    var gutterX = 20;
    var gutterY = 25;
    var backdrop = new paper.Path.Rectangle(
        new paper.Point(
            xOffset + gutterX,
            gutterY
        ),
        new paper.Size(
            pageWidth / 2 - gutterX * 2,
            pageHeight - gutterY * 2 - 105
        )
    );
    backdrop.fillColor = shapes.backColor;

    var grid = new RectGrid(
        new paper.Point(xOffset, 0),
        new paper.Size(pageWidth / 2, pageHeight - 20),
        120,
        7,
        5
    );


    for (var i = 0; i < grid.matrix.length; i++) {
        var stage = i + 1;
        for (var j = 0; j < grid.matrix[i].length; j++) {
            var rect = grid.matrix[i][j];
            var genesis = null;
            switch (j) {
                case 0:
                    // centroid + vectors + centers
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.markCenters();
                    genesis.extend(GenesisCentroid);
                    // genesis.markCentroid();
                    genesis.markCentroidVectors();
                    break;
                case 1:
                    // points + centroid
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.markPoints();
                    genesis.extend(GenesisCentroid);
                    genesis.markCentroid();
                    break;
                case 2:
                    // circles + centroid
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.extend(GenesisCentroid);
                    genesis.markCentroid();
                    break;
                case 3:
                    // lines + centroid
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisLines);
                    genesis.drawAllLines('in');
                    genesis.extend(GenesisCentroid);
                    genesis.markCentroid();
                    break;
                case 4:
                    // centroid + centroid lines
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisLines);
                    genesis.drawAllLines('in');
                    genesis.extend(GenesisCentroid);
                    genesis.markCentroid();
                    genesis.findCentroidLines();
                    genesis.hideLinesNotCentroid();
                    break;
                default:
                    break;
            }
        }
    }

}