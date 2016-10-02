function Flock(args) {
    this.count = args.count; // Number
    this.aversion = args.aversion; // radius of personal space bubble
    this.awareness = args.awareness; // radius of visibility
    this.minSpeed = args.minSpeed; // Number
    this.maxSpeed = args.maxSpeed; // Number
    this.magic = args.magic; // Number
    this.origin = args.origin; // [Number, ...]
    this.dimensions = args.dimensions; // [Number, ...]
    this.holdCenter = args.holdCenter; // Boolean

    // create boid objects
    this.boids = _.map(_.range(this.count), function () {
        // boids consist of two vectors:
        // "position" = location (vector from origin)
        // "velocity" = movement (vector from position)
        var boid = {
            position: this.origin.slice(),
            velocity: _.map(this.origin, function () {
                var init = Math.random();
                if (Maths.coinFlip()) init *= -1;
                return init;
            }.bind(this))
        };

        var speed = Maths.randomWithin(
            this.minSpeed,
            this.maxSpeed
        );

        boid.velocity = Maths.setVectorLength(boid.velocity, speed);

        return boid;
    }.bind(this));
}

Flock.prototype.tick = function () {
    this.handleNeighbors();
    this.updatePositions();
    if (this.holdCenter) this.reCenter();
    return this.boids;
};

Flock.prototype.handleNeighbors = function () {
    _.each(this.boids, function (boid) {
        var neighborCount = 0;
        var neighborPositionSum = _.map(boid.position, function () { return 0; });
        var speed = Maths.vectorLength(boid.velocity);
        _.each(this.boids, function (neighbor) {
            if (boid === neighbor) return;
            var difference = Maths.subtractVectors(boid.position, neighbor.position);
            var distance = Maths.vectorLength(difference);
            if (distance > this.awareness) return;
            if (distance < this.aversion) {

                // "Separation: steer to avoid crowding local flockmates"
                var separation = _.map(difference, function (n) {
                    return n / ((this.aversion / distance) * this.magic);
                }.bind(this));
                boid.velocity = Maths.addVectors(boid.velocity, separation);
                boid.velocity = Maths.setVectorLength(boid.velocity, speed);

            } else {

                // "Alignment: steer towards the average velocity of local flockmates"
                var alignment = _.map(neighbor.velocity, function (n) {
                    return n / ((this.awareness / distance) * this.magic);
                }.bind(this));
                boid.velocity = Maths.addVectors(boid.velocity, alignment);
                boid.velocity = Maths.setVectorLength(boid.velocity, speed);

            }
            neighborCount++;
            neighborPositionSum = Maths.addVectors(
                neighborPositionSum, neighbor.position
            );
        }.bind(this));

        // "Cohesion: steer to move toward the average position of local flockmates"
        if (!neighborCount) return;
        var centroid = _.map(neighborPositionSum, function (n) {
            return n / neighborCount;
        });
        var cohesion = _.map(centroid, function (n, i) {
            return (n - boid.position[i]) / (this.magic);
        }.bind(this));
        boid.velocity = Maths.addVectors(boid.velocity, cohesion);
        boid.velocity = Maths.setVectorLength(boid.velocity, speed);

    }.bind(this));
};

Flock.prototype.updatePositions = function () {
    _.each(this.boids, function (boid) {
        boid.position = Maths.addVectors(boid.position, boid.velocity);
    });
};

Flock.prototype.reCenter = function () {

    // find centroid of flock
    var sum = _.reduce(this.boids, function (memo, boid) {
        return _.map(memo, function (n, i) {
            return memo[i] + boid.position[i];
        });
    }, new Uint8Array(this.origin.length));
    var centroid = _.map(sum, function (n) {
        return n / this.boids.length;
    }.bind(this));

    // find vector from centroid to origin
    var difference = Maths.subtractVectors(this.origin, centroid);

    // add vector to each bird
    _.each(this.boids, function (boid) {
        boid.position = Maths.addVectors(boid.position, difference);
    });

};