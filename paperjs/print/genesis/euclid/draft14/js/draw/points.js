function drawPoints(xOffset) {
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
                    // circles
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    break;
                case 1:
                    // circles + points
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.markPoints();
                    break;
                case 2:
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
                case 3:
                    // points + lines
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.markPoints();
                    genesis.extend(GenesisLines);
                    genesis.drawAllLines('in');
                    genesis.hideAllLines();
                    genesis.showLinesByLength('radius');
                    genesis.showLinesByLength('vesica');
                    genesis.showLinesByLength('strange');
                    break;
                case 4:
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
                    genesis.hideAllLines();
                    genesis.showLinesByLength('radius');
                    genesis.showLinesByLength('vesica');
                    genesis.showLinesByLength('strange');
                    break;
                default:
                    break;
            }
        }
    }

}