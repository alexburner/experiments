var Diffuse = (function () {

    //
    // Private statless methods
    //

    function diffuse(points, speed) {

        // only works with more than 1 point
        if (points.length < 2) return points;

        // compare each point to every other point
        return _.map(points, function (pointA) {

            // find delta from nearest neighbor
            var delta = null;
            var length = Infinity;
            _.each(points, function (pointB) {
                if (pointA === pointB) return;
                var localDelta = Maths.subtractVectors(pointA, pointB);
                var localLength = Maths.vectorLengthSq(localDelta);
                if (localLength < length) {
                    delta = localDelta;
                    length = localLength;
                }
            });

            // limit delta's length
            delta = Maths.scaleVector(
                delta, speed / Maths.vectorLengthSq(delta) / points.length
            );

            // apply delta to point
            return Maths.addVectors(pointA, delta);
        });
    }

    function bound(points) {
        // limit each point to 1 unit from center
        return _.map(points, function (point) {
            return Maths.scaleVectorToLength(point, 1);
        });
    }

    function center(points) {

        // only works with 1 or more points
        if (points.length < 1) return;

        // find geometric center of points (by averaging them)
        var centroid = _.reduce(points, function (memo, point) {
            return _.map(point, function (n, i) {
                return memo[i] + n / points.length;
            });
        }, _.times(points[0].length, _.constant(0)));

        // shift each point over (moving centroid to origin)
        return _.map(points, function (point) {
            return Maths.subtractVectors(point, centroid);
        });
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

        // create a new list of points
        init: function (count, space) {
            return _.times(count, function () {
                return _.times(space, function () {
                    // point = [n1, n2, ...]
                    var n = Math.random();
                    if (Maths.coinFlip()) n *= -1;
                    return n;
                });
            });
        },

        // iterate on a list of points
        tick: function (points, options) {
            if (!points || !points.length) return [];
            points = diffuse(points, options.speed);
            if (options.bounding) points = bound(points);
            if (options.centering) points = center(points);
            if (options.scaling) points = scaleRadius(points);
            return points;
        },

    };

})();