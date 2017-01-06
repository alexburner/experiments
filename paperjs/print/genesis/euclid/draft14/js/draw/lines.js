function drawLines(xOffset) {
    xOffset = xOffset || 0;

    var radius = 16;

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
        9,
        6
    );


    for (var i = 0; i < grid.matrix.length; i++) {
        for (var j = 0; j < grid.matrix[i].length; j++) {
            var rect = grid.matrix[i][j];
            var stage = j + 2;
            var genesis = null;

            rect.point.y += 7;
            rect.point.y += 4 * i;
            if (i === 7) {
                rect.point.y -= 14;
            }

            switch (i + 2) {
                case 9:
                    // lines (all)
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
                case 7:
                    // lines (vesica2)
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
                    genesis.showLinesByLength('vesica2');
                    break;
                case 6:
                    // lines (radius3)
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
                    genesis.showLinesByLength('radius3');
                    break;
                case 5:
                    // lines (strange)
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
                    genesis.showLinesByLength('strange');
                    break;
                case 4:
                    // lines (radius2)
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
                    genesis.showLinesByLength('radius2');
                    break;
                case 3:
                    // lines (vesica)
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
                    genesis.showLinesByLength('vesica');
                    break;
                case 2:
                    // lines (radius)
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
                    break;
                default:
                    break;
            }
            if (genesis) {
                genesis.group.rotate(-90, genesis.center);
            }
        }
    }

}