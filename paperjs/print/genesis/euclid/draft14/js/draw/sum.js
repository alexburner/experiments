function drawSum(xOffset) {
    xOffset = xOffset || 0;

    var radius = 17;

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
                    // circles
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    break;
                case 1:
                    // points
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.markPoints();
                    break;
                case 2:
                    // lines
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisLines);
                    genesis.drawAllLines('in');
                    break;
                case 3:
                    // seeds
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawSeeds(
                        'vesica',
                        'around',
                        'selves'
                    );
                    genesis.drawSeeds(
                        'vesica',
                        'within',
                        'selves'
                    );
                    genesis.drawSeeds(
                        'treble',
                        'around',
                        'selves'
                    );
                    genesis.drawSeeds(
                        'treble',
                        'within',
                        'selves'
                    );
                    genesis.drawSeeds(
                        'petal',
                        'around',
                        'selves'
                    );
                    genesis.drawSeeds(
                        'petal',
                        'within',
                        'selves'
                    );
                    break;
                case 4:
                    // centroid
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisLines);
                    genesis.extend(GenesisCentroid);
                    // genesis.markCentroid();
                    genesis.drawAllLines('in');
                    genesis.findCentroidLines();
                    genesis.hideLinesNotCentroid();
                    genesis.findOtherCentroidRadii();
                    genesis.drawOtherCentroidCircles();
                    break;
                default:
                    break;
            }
        }
    }

}