var Maths = {

    addVectors: function (vectorA, vectorB) {
        return _.map(vectorA, function (n, i) {
            return n + vectorB[i];
        });
    },

    subtractVectors: function (vectorA, vectorB) {
        return _.map(vectorA, function (n, i) {
            return n - vectorB[i];
        });
    },

    vectorLength: function (vector) {
        return Math.sqrt(Maths.vectorLengthSq(vector));
    },

    vectorLengthSq: function (vector) {
        return _.reduce(vector, function (memo, n) {
            return memo + n * n;
        }, 0);
    },

    scaleVectorToLength: function (vector, length) {
        return Maths.scaleVector(
            vector, length / Maths.vectorLength(vector)
        );
    },

    scaleVector: function (vector, factor) {
        return _.map(vector, function (n) {
            return n * factor;
        });
    },

    randomWithin: function (min, max) {
        return min + Math.random() * (max - min);
    },

    clampNumber: function (n, min, max) {
        return Math.min(Math.max(n, min), max);
    },

    coinFlip: function () {
        return Math.random() < 0.5;
    }

};