function drawFacetSeeds(xOffset) {
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
        4
    );


    for (var i = 0; i < grid.matrix.length; i++) {
        var stage = i + 1;
        for (var j = 0; j < grid.matrix[i].length; j++) {
            var rect = grid.matrix[i][j];

            rect.point.y -= 10;
            rect.point.y -= 22 * i;

            var genesis = null;
            switch (j) {
                case 0:
                    // seeds (petal)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawSeeds('petal', 'within', 'selves');
                    genesis.drawSeeds('petal', 'around', 'selves');
                    break;
                case 1:
                    // seeds (treble)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawSeeds('treble', 'within', 'selves');
                    genesis.drawSeeds('treble', 'around', 'selves');
                    break;
                case 2:
                    // seeds (vesica)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawSeeds('vesica', 'within', 'selves');
                    genesis.drawSeeds('vesica', 'around', 'selves');
                    break;
                case 3:
                    // circles
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    break;
                default:
                    break;
            }
        }
    }

}