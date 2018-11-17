/**
 * extension for Genesis centroid
 */

function GenesisCentroid(genesis) {
  // namespace
  this.centroid = {};
  // elements
  // this.centroid.point = util.getCentroid(genesis.points);
  this.centroid.point = util.getCentroid(
    genesis.circles.map(function(circle) {
      return circle.position;
    })
  );
  this.centroid.lines = [];

  // other
  this.centroid.radii = {};
  this.centroid.radii.points = [];
  this.centroid.radii.lines = [];
  this.centroid.radii.circles = [];

  // copy this to genesis
  for (var key in this) {
    genesis[key] = this[key];
  }
}

GenesisCentroid.prototype.markCentroid = function() {
  var mark = new shapes.MarkCentroid(this.centroid.point);
  this.group.addChild(mark);
};

GenesisCentroid.prototype.markCentroidVectors = function() {
  this.circles.forEach(function(circle) {
    var point = circle.position;
    var line = new shapes.Line(point, this.centroid.point);
    this.group.addChild(line);
  }, this);
};

GenesisCentroid.prototype.findCentroidLines = function() {
  this.lines.all.forEach(function(line) {
    var coordsA = line.data.endpoints[0].toString();
    var coordsB = line.data.endpoints[1].toString();
    var lineOpacity = line.opacity;
    line.opacity = shapes.opacity;
    var wasHit = line.hitTest(this.centroid.point, {
      type: "PathItem",
      fill: false,
      stroke: true,
      segments: false,
      tolerance: 0.1
    });
    if (wasHit) this.centroid.lines.push(line);
    line.opacity = lineOpacity;
  }, this);
};

GenesisCentroid.prototype.showCentroidLines = function() {
  this.centroid.lines.forEach(function(line) {
    line.opacity = shapes.opacity;
  });
};

GenesisCentroid.prototype.hideCentroidLines = function() {
  this.centroid.lines.forEach(function(line) {
    line.opacity = 0;
  });
};

GenesisCentroid.prototype.hideLinesNotCentroid = function() {
  this.lines.all.forEach(function(line) {
    if (!line.opacity) return;
    var wasHit = line.hitTest(this.centroid.point, {
      type: "PathItem",
      fill: false,
      stroke: true,
      segments: false,
      tolerance: 0.1
    });
    if (!wasHit) line.opacity = 0;
  }, this);
};

GenesisCentroid.prototype.drawCentroidCircles = function() {
  // mystic centroid is not euclid
  if (this.stage === 6) return;

  //
  // find all unique information points
  var points = [];
  var pointExists = {};
  // existing points
  this.points.forEach(function(point) {
    pointExists[point.toString()] = true;
    points.push(point);
  });
  // centroid line & circle intersection points
  this.circles.forEach(function(circle) {
    this.centroid.lines.forEach(function(line) {
      var intersects = circle.getIntersections(line);
      intersects.forEach(function(intersect) {
        var point = intersect.point;
        point.x = util.roundish(point.x);
        point.y = util.roundish(point.y);
        if (!pointExists[point.toString()]) {
          pointExists[point.toString()] = true;
          points.push(point);
        }
      });
    });
  }, this);

  //
  // find all unique circle radii
  var radii = [];
  var radiusExists = {};
  points.forEach(function(point) {
    var vector = this.centroid.point.subtract(point);
    var radius = util.roundish(vector.length);
    if (radius < this.sizes.radius / 24) return;
    if (radiusExists[radius]) return;
    radiusExists[radius] = true;
    radii.push(radius);
  }, this);

  //
  // draw circles
  radii.forEach(function(radius) {
    var circle = new shapes.CentroidCircle(this.centroid.point, radius);
    this.group.addChild(circle);
  }, this);
};

//
// other

GenesisCentroid.prototype.findOtherCentroidRadii = function() {
  // mystic centroid not euclidean from lines
  if (this.stage === 6) return;

  var lengthExists = {};
  this.points.forEach(function(point) {
    var length = util.roundish(point.subtract(this.centroid.point).length);
    if (!length) return;
    // if (!lengthExists[length]) {
    if (true) {
      // paint repeats
      lengthExists[length] = true;
      this.centroid.radii.points.push(point);
    }
  }, this);
};

GenesisCentroid.prototype.drawOtherCentroidCircles = function() {
  this.centroid.radii.points.forEach(function(point) {
    var circle = new shapes.CentroidCircle(
      this.centroid.point,
      this.centroid.point.subtract(point).length
    );
    this.centroid.radii.circles.push(circle);
    this.group.addChild(circle);
  }, this);
};

GenesisCentroid.prototype.markOtherCentroidVectors = function() {
  this.centroid.radii.points.forEach(function(point) {
    var vector = new shapes.Line(point, this.centroid.point);
    this.centroid.radii.lines.push(vector);
    this.group.addChild(vector);
  }, this);
};
