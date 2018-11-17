//
//
/////////////////////////////////////////
function makeCirclesDotsLines(args) {
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
      var genesis = undefined;
      switch (j) {
        case 0:
          // circles
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          break;
        case 1:
          // circles + points
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.markPoints();
          break;
        case 2:
          // points
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
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
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.markPoints();
          genesis.extend(GenesisLines);
          genesis.drawAllLines("in");
          genesis.hideAllLines();
          genesis.showLinesByLength("radius");
          genesis.showLinesByLength("vesica");
          genesis.showLinesByLength("strange");
          break;
        case 4:
          // lines
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
          // genesis.hideAllLines();
          // genesis.showLinesByLength('radius');
          // genesis.showLinesByLength('vesica');
          // genesis.showLinesByLength('strange');
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
