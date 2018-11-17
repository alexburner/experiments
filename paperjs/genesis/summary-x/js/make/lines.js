//
//
/////////////////////////////////////////
function makeLines(args) {
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
    6
  );

  for (var i = 0; i < grid.matrix.length; i++) {
    for (var j = 0; j < grid.matrix[i].length; j++) {
      var rect = grid.matrix[i][j];
      var stage = j + 2;
      var genesis = null;
      switch (grid.matrix.length - i) {
        case 1:
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
          break;
        case 7:
          // lines (vesica2)
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
          genesis.showLinesByLength("vesica2");
          break;
        case 6:
          // lines (radius3)
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
          genesis.showLinesByLength("radius3");
          break;
        case 5:
          // lines (strange)
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
          genesis.showLinesByLength("strange");
          break;
        case 4:
          // lines (radius2)
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
          genesis.showLinesByLength("radius2");
          break;
        case 3:
          // lines (vesica)
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
          genesis.showLinesByLength("vesica");
          break;
        case 2:
          // lines (radius)
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
        genesis.group.rotate(-90, genesis.center);
        if (double === "origin") genesis.doubleOrigin();
        if (double === "centroid") genesis.doubleCentroid();
      }
    }
  }
}
