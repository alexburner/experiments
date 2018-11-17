//
//
/////////////////////////////////////////
function makeSum(args) {
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
        case 2:
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
          break;
        case 3:
          // seeds
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
          genesis.drawSeeds("vesica", "around", "selves");
          genesis.drawSeeds("vesica", "within", "selves");
          genesis.drawSeeds("treble", "around", "selves");
          genesis.drawSeeds("treble", "within", "selves");
          genesis.drawSeeds("petal", "around", "selves");
          genesis.drawSeeds("petal", "within", "selves");
          break;
        case 4:
          // centroid
          genesis = new GenesisPanel(
            stage,
            radius,
            rect.point,
            rect.size,
            orient
          );
          genesis.hideCircles();
          genesis.extend(GenesisLines);
          genesis.extend(GenesisCentroid);
          // genesis.markCentroid();
          genesis.drawAllLines("in");
          genesis.findCentroidLines();
          genesis.hideLinesNotCentroid();
          genesis.findOtherCentroidRadii();
          genesis.drawOtherCentroidCircles();
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
