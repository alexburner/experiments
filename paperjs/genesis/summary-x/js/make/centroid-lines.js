//
//
/////////////////////////////////////////
function makeCentroidLines(args) {
  makeBack(args);

  var radius = args.radius || 16;
  var x = args.x;
  var y = args.y;
  var w = args.width;
  var h = args.height;
  var orient = args.orient || "north";
  var paddingV = args.paddingV || 120;
  var paddingH = args.paddingH || 120;
  var double = args.double;

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
          // circles + vectors + centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.markCenters();
          genesis.extend(GenesisCentroid);
          genesis.markCentroid();
          genesis.markCentroidVectors();
          break;
        case 2:
          // circles + centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.extend(GenesisCentroid);
          genesis.markCentroid();
          genesis.markCentroidVectors();
          break;
        case 1:
          // points + centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.markPoints();
          genesis.extend(GenesisCentroid);
          genesis.markCentroid();
          genesis.markCentroidVectors();
          break;
        case 3:
          // lines + centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.extend(GenesisLines);
          genesis.drawAllLines("in");
          genesis.hideAllLines();
          genesis.showLinesByLength("radius");
          genesis.showLinesByLength("vesica");
          genesis.showLinesByLength("strange");
          genesis.extend(GenesisCentroid);
          genesis.markCentroid();
          break;
        case 4:
          // centroid lines + centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.extend(GenesisLines);
          genesis.drawAllLines("in");
          genesis.extend(GenesisCentroid);
          genesis.markCentroid();
          genesis.findCentroidLines();
          genesis.hideLinesNotCentroid();
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
        if (double === "origin") genesis.doubleOrigin();
        if (double === "centroid") genesis.doubleCentroid();
      }
    }
  }
}
