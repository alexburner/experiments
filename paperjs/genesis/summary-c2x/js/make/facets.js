//
//
/////////////////////////////////////////
function makeFacets(args) {
    makeBack(args);

    var radius = args.radius || 16;
    var x = args.x;
    var y = args.y;
    var w = args.width;
    var h = args.height;
    var orient = args.orient || 'north';
    var paddingV = args.paddingV || 120;
    var paddingH = args.paddingH || 120;

    var grid = new RectGrid(
        new paper.Point(x, y),
        new paper.Size(w, h),
        paddingV,
        paddingH,
        7,
        4
    );

    for (var i = 0; i < grid.matrix.length; i++) {
        var stage = i + 1;
        for (var j = 0; j < grid.matrix[i].length; j++) {
            var rect = grid.matrix[i][j];
            var genesis = null;
            switch (j) {
                case 0:
                    // circles & facets
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size,
                        orient
                    );
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawFacets('vesica');
                    genesis.drawFacets('treble');
                    genesis.drawFacets('petal');
                    genesis.facets.all.forEach(facet => {
                        facet.intersect.opacity = 0.2;
                    });
                    break;
                case 1:
                    // facets (vesica)
                    genesis = new GenesisPanel(
                        stage,
                        radius,
                        rect.point,
                        rect.size,
                        orient
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
                        rect.size,
                        orient
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
                        rect.size,
                        orient
                    );
                    genesis.hideCircles();
                    genesis.extend(GenesisFacets);
                    genesis.makeFacets();
                    genesis.drawFacets('petal');
                    break;
                default:
                    break;
            }
            if (genesis) {
                GenesisPanel.rotate(
                    genesis.group,
                    genesis.center,
                    genesis.stage,
                    genesis.orient
                );
                genesis.doubleCentroid();
            }
        }
    }
}