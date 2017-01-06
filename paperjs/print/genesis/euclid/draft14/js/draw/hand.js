function drawHand(xOffset) {
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
                case 2:
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    switch (stage) {
                        case 1: genesis.group.rotate(-30, genesis.center); break;
                        case 2: genesis.group.rotate(0, genesis.center); break;
                        case 3: genesis.group.rotate(-30, genesis.center); break;
                        case 4: genesis.group.rotate(0, genesis.center); break;
                        case 5: genesis.group.rotate(-30, genesis.center); break;
                        case 6: genesis.group.rotate(0, genesis.center); break;
                        case 7: genesis.group.rotate(-30, genesis.center); break;
                    }
                    // switch (stage) {
                    //     case 1: genesis.group.rotate(0, genesis.center); break;
                    //     case 2: genesis.group.rotate(-90, genesis.center); break;
                    //     case 3: genesis.group.rotate(-60, genesis.center); break;
                    //     case 4: genesis.group.rotate(-90, genesis.center); break;
                    //     case 5: genesis.group.rotate(-60, genesis.center); break;
                    //     case 6: genesis.group.rotate(-90, genesis.center); break;
                    //     case 7: genesis.group.rotate(-60, genesis.center); break;
                    // }
                    break;
                default:
                    break;
            }
        }
    }

}