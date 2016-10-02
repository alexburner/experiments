function Diffuse(args) {
    this.count = args.count; // Number of particles
    this.space = args.space; // Number of spatial dimensions
    this.speed = args.speed; // Distance traveled per particle per tick

    // origin vector = [n1, n2, ...]
    this.origin = new Uint8Array(this.space);

    // particle = {vector: [n1, n2, ...]}
    this.particles = _.map(_.range(this.count), function (n) {
        // vector math utility functions create new copies instead of
        // modifiying originals, so we need a wrapper object we can
        // hang on to while overwriting the contained vector
        return {
            vector: _.map(this.origin, function () {
                var init = Math.random();
                if (Maths.coinFlip()) init *= -1;
                return init;
            })
        };
    }.bind(this));
}

Diffuse.prototype.tick = function (args) {
    args = args || {};
    this.handleNeighbors();
    if (args.bounding) this.constrainPosition();
    if (args.centering) this.constrainCenter();
    if (args.limiting) this.constrainSize();
    return this.particles;
};

Diffuse.prototype.handleNeighbors = function () {

    // find all the shortest delta vectors between each particle pair
    var shortestDeltas = [];
    this.particles.forEach(function (particleA) {

        // find deltas from particle A to every other particle
        var deltas = [];
        this.particles.forEach(function (particleB) {
            if (particleA === particleB) return;
            deltas.push(
                Maths.subtractVectors(
                    particleA.vector,
                    particleB.vector
                )
            );
        });

        // find shortest delta for this particle
        var shortestLength = Infinity;
        var shortestDelta = null;
        deltas.forEach(function (delta) {
            var length = Maths.vectorLengthSq(delta);
            if (length < shortestLength) {
                shortestLength = length;
                shortestDelta = delta;
            }
        });
        shortestDeltas.push(shortestDelta);
    }, this);

    // apply shortest deltas to their respective particles
    shortestDeltas.forEach(function (delta, index) {
        var particle = this.particles[index];
        particle.vector = Maths.addVectors(
            particle.vector, this.speedLimit(particle, delta)
        );
    }, this);
};

// limit delta vector length to magic number
Diffuse.prototype.speedLimit = function (particle, delta) {
    return Maths.scaleVector(
        delta, this.speed / Maths.vectorLengthSq(delta) / this.count
    );
    // return Maths.scaleVectorToLength(
    //     delta, this.speed
    // );
};

// constrain particle position to 1 unit from origin
Diffuse.prototype.constrainPosition = function () {
    _.each(this.particles, function (particle) {
        particle.vector = Maths.scaleVectorToLength(particle.vector, 1);
    }.bind(this));
};

// constrain particle centroid to origin
Diffuse.prototype.constrainCenter = function () {
    var centroid = _.reduce(this.particles, function (memo, particle) {
        return _.map(particle.vector, function (n, i) {
            return memo[i] + n / this.count;
        }.bind(this));
    }.bind(this), this.origin);

    _.each(this.particles, function (particle) {
        particle.vector = Maths.subtractVectors(particle.vector, centroid);
    }.bind(this));
};

// constrain particle proximity to 4 units apart
Diffuse.prototype.constrainSize = function () {
    var longestLength = -Infinity;

    _.each(this.particles, function (particleA) {
        _.each(this.particles, function (particleB) {
            if (particleA === particleB) return;
            longestLength = Math.max(
                longestLength,
                Maths.vectorLengthSq(
                    Maths.subtractVectors(
                        particleA.vector,
                        particleB.vector
                    )
                )
            );
        }.bind(this));
    }.bind(this));

    if (longestLength < 4) return;

    var scale = 4 / longestLength;
    _.each(this.particles, function (particle) {
        particle.vector = Maths.scaleVector(
            particle.vector, scale
        );
    });
};