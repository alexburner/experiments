function drawFacetForms(xOffset) {
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
                    // circles
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    break;
                case 1:
                    // facets (vesica)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawFacets('vesica');
                    break;
                case 2:
                    // facets (treble)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawFacets('treble');
                    break;
                case 3:
                    // facets (petal)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawFacets('petal');
                    break;
                default:
                    break;
            }
        }
    }

}