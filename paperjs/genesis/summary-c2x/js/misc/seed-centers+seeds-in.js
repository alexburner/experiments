//
//
/////////////////////////////////////////
function makeSeedsSeedCentersIn(args) {
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
        5
    );

    for (var i = 0; i < grid.matrix.length; i++) {
        var stage = i + 1;
        for (var j = 0; j < grid.matrix[i].length; j++) {
            var rect = grid.matrix[i][j];
            var genesis = null;
            switch (j) {
                case 0:
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
                    genesis.drawSeeds('petal', 'within', 'centers');
                    genesis.drawSeeds('petal', 'within', 'selves');
                    break;
                case 1:
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
                    genesis.drawSeeds('treble', 'within', 'centers');
                    genesis.drawSeeds('treble', 'within', 'selves');
                    break;
                case 2:
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
                    genesis.drawSeeds('vesica', 'within', 'centers');
                    genesis.drawSeeds('vesica', 'within', 'selves');
                    break;
                case 4:
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
                    genesis.drawSeeds('petal', 'within', 'centers');
                    genesis.drawSeeds('treble', 'within', 'centers');
                    genesis.drawSeeds('vesica', 'within', 'centers');
                    genesis.drawSeeds('petal', 'within', 'selves');
                    genesis.drawSeeds('treble', 'within', 'selves');
                    genesis.drawSeeds('vesica', 'within', 'selves');
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