//
//
/////////////////////////////////////////
function makeFacetsSeeds(args) {
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
      switch (grid.matrix.length - i - 1) {
        case -1:
          // all seeds
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
          genesis.drawFacets("vesica");
          genesis.drawFacets("treble");
          genesis.drawFacets("petal");
          genesis.drawSeeds("petal", "within", "selves");
          genesis.drawSeeds("petal", "around", "selves");
          genesis.drawSeeds("treble", "within", "selves");
          genesis.drawSeeds("treble", "around", "selves");
          genesis.drawSeeds("vesica", "within", "selves");
          genesis.drawSeeds("vesica", "around", "selves");
          break;
        case 0:
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
          genesis.drawFacets("vesica");
          break;
        case 1:
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
          genesis.drawFacets("treble");
          break;
        case 2:
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
          genesis.drawFacets("petal");
          break;
        case 3:
          // seeds (petal)
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
          genesis.drawSeeds("petal", "within", "selves");
          genesis.drawSeeds("petal", "around", "selves");
          break;
        case 4:
          // seeds (treble)
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
          genesis.drawSeeds("treble", "within", "selves");
          genesis.drawSeeds("treble", "around", "selves");
          break;
        case 5:
          // seeds (vesica)
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
          genesis.drawSeeds("vesica", "within", "selves");
          genesis.drawSeeds("vesica", "around", "selves");
          break;
        case 6:
          // all seeds
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
          genesis.drawSeeds("petal", "within", "selves");
          genesis.drawSeeds("petal", "around", "selves");
          genesis.drawSeeds("treble", "within", "selves");
          genesis.drawSeeds("treble", "around", "selves");
          genesis.drawSeeds("vesica", "within", "selves");
          genesis.drawSeeds("vesica", "around", "selves");
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
