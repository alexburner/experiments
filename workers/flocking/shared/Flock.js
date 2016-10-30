var Flock = (function () {

    //
    // Private statless methods
    //

    function update(boids, options) {
        _.each(boids, function (boid) {
            var neighborCount = 0;
            var neighborPositionSum = _.map(boid.position, function () { return 0; });
            var speed = Maths.vectorLength(boid.velocity);

            var minDistance = Infinity;
            var minNeighbor = null;

            _.each(boids, function (neighbor) {
                if (boid === neighbor) return;
                var difference = Maths.subtractVectors(boid.position, neighbor.position);
                var distance = Maths.vectorLength(difference);
                if (distance > options.awareness) return;
                if (distance < options.aversion) {

                    // "Separation: steer to avoid crowding local flockmates"
                    var separation = _.map(difference, function (n) {
                        return n / ((options.aversion / distance) * options.magic);
                    });
                    boid.velocity = Maths.addVectors(boid.velocity, separation);
                    boid.velocity = Maths.scaleVectorToLength(boid.velocity, speed);

                } else {

                    // "Alignment: steer towards the average velocity of local flockmates"
                    var alignment = _.map(neighbor.velocity, function (n) {
                        return n / ((options.awareness / distance) * options.magic);
                    });
                    boid.velocity = Maths.addVectors(boid.velocity, alignment);
                    boid.velocity = Maths.scaleVectorToLength(boid.velocity, speed);

                }

                if (distance < minDistance) {
                    minDistance = distance;
                    minNeighbor = neighbor;
                }

                neighborCount++;
                neighborPositionSum = Maths.addVectors(
                    neighborPositionSum, neighbor.position
                );
            });

            // "Cohesion: steer to move toward the average position of local flockmates"
            if (!neighborCount) return;
            var centroid = _.map(neighborPositionSum, function (n) {
                return n / neighborCount;
            });
            var cohesion = _.map(centroid, function (n, i) {
                return (n - boid.position[i]) / (options.magic);
            });
            boid.velocity = Maths.addVectors(boid.velocity, cohesion);
            boid.velocity = Maths.scaleVectorToLength(boid.velocity, speed);
            boid.position = Maths.addVectors(boid.position, boid.velocity);
            boid.minDistance = minDistance;
            boid.minNeighbor = minNeighbor;
        });

        return boids;
    }

    function bound(boids) {
        // limit each boid to 1 unit from center
        return _.map(boids, function (boid) {
            return Maths.scaleVectorToLength(boid.position, 1);
        });
    }

    function center(boids) {

        // only works with 1 or more boids
        if (boids.length < 1) return;

        // find geometric center of boids (by averaging them)
        var centroid = _.reduce(boids, function (memo, boid) {
            return _.map(boid.position, function (n, i) {
                return memo[i] + n / boids.length;
            });
        }, _.times(boids[0].position.length, _.constant(0)));

        // shift each boid over (moving centroid to origin)
        _.each(boids, function (boid) {
            boid.position = Maths.subtractVectors(boid.position, centroid);
        });

        return boids;
    }

    function scaleLength(points) {

        // only works with more than 1 point
        if (points.length < 2) return points;

        // find longest distance between any two points
        var length = -Infinity;
        _.each(points, function (pointA) {
            _.each(points, function (pointB) {
                if (pointA === pointB) return;
                length = Math.max(length, Maths.vectorLengthSq(
                    Maths.subtractVectors(pointA, pointB)
                ));
            });
        });

        // abort if already within limits
        if (length < 4) return points;

        // scale down all points
        var factor = 4 / length;
        return _.map(points, function (point) {
            return Maths.scaleVector(point, factor);
        });
    }

    function scaleRadius(points) {

        // only works with more than 1 point
        if (points.length < 2) return points;

        // find geometric center of points (by averaging them)
        var centroid = _.reduce(points, function (memo, point) {
            return _.map(point, function (n, i) {
                return memo[i] + n / points.length;
            });
        }, _.times(points[0].length, _.constant(0)));

        // find longest radius between point & center
        var radius = -Infinity;
        _.each(points, function (point) {
            radius = Math.max(radius, Maths.vectorLengthSq(
                Maths.subtractVectors(point, centroid)
            ));
        });

        // abort if already within limits
        if (radius < 1) return points;

        // scale down all points
        var factor = 1 / radius;
        return _.map(points, function (point) {
            return Maths.scaleVector(point, factor);
        });
    }


    //
    // Public export
    //
    return {

        // create a new list of boids
        init: function (count, space, options) {
            return _.times(count, function () {
                // boids consist of two vectors:
                // "position" = location (vector from origin)
                // "velocity" = movement (vector from position)
                return {
                    // vector = [ n1, n2, ... ]
                    position: new Uint8Array(space),
                    velocity: _.times(space, function () {
                        var speed = Maths.randomWithin(
                            options.minSpeed,
                            options.maxSpeed
                        );
                        if (Maths.coinFlip()) speed *= -1;
                        return speed;
                    }),
                };
            });
        },

        // iterate on a list of boids
        tick: function (boids, options) {
            if (!boids || !boids.length) return [];
            boids = update(boids, options);
            if (options.bounding) boids = bound(boids);
            if (options.centering) boids = center(boids);
            // if (options.scaling) boids = scaleRadius(boids);
            return boids;
        },

    };

})();