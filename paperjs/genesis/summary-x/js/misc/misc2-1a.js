//
//
/////////////////////////////////////////
function makeMisc2_1a(args) {
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
            switch (j - 1) {
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
                    // genesis.drawSeeds('petal', 'around', 'centers');
                    // genesis.drawSeeds('petal', 'around', 'selves');
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
                    // genesis.drawSeeds('treble', 'around', 'centers');
                    // genesis.drawSeeds('treble', 'around', 'selves');
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
                    // genesis.drawSeeds('vesica', 'around', 'centers');
                    // genesis.drawSeeds('vesica', 'around', 'selves');
                    genesis.drawSeeds('vesica', 'within', 'centers');
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
            }
        }
    }
}