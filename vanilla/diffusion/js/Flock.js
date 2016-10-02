function Flock(args) {
    this.population = args.population; // Number of birds
    this.dimensions = args.dimensions; // Number of spatial dimensions
    this.speed = args.speed; // Distance traveled per bird per tick

    // create origin point w/in given dimensions
    this.origin = new Uint8Array(this.dimensions);

    // create bird objects
    this.birds = _.map(_.range(this.population), function (n) {
        // birds consist of two vectors:
        // "position" = location (vector from origin)
        // "velocity" = movement (vector from position)
        return {
            position: _.map(this.origin, function () {
                var init = Math.random();
                if (Maths.coinFlip()) init *= -1;
                return init;
            }.bind(this))
        };
    }.bind(this));
}

Flock.prototype.tick = function (noContraints) {
    this.handleNeighbors();
    if (!noContraints) this.constrainPosition();
    return this.birds;
};

Flock.prototype.handleNeighbors = function () {
    // find all the shortest vectors between points
    var shortestVectors = [];
    this.birds.forEach(function (bird1, indexA) {

        // find vectors from bird1 to every other point
        var vectors = [];
        this.birds.forEach(function (bird2, indexB) {
            if (bird1 === bird2) return;
            vectors.push(Maths.subtractVectors(bird1.position, bird2.position));
        }, this);

        // find shortest vector
        var shortestLength = Infinity;
        var shortestVector = null;
        vectors.forEach(function (vector) {
            var length = Maths.vectorLengthSq(vector);
            if (length < shortestLength) {
                shortestLength = length;
                shortestVector = vector;
            }
        });

        shortestVectors.push(shortestVector);

    }, this);

    // apply shortest vectors
    shortestVectors.forEach(function (vector, index) {
        vector = Maths.setVectorLength(vector, this.speed);
        this.birds[index].position = Maths.addVectors(this.birds[index].position, vector);
    }, this);
};

Flock.prototype.constrainPosition = function () {
    _.each(this.birds, function (bird) {
        // constrain bird position w/in 1 unit from origin
        var difference = Maths.subtractVectors(bird.position, this.origin);
        bird.position = Maths.setVectorLength(difference, 1);
    }.bind(this));
};