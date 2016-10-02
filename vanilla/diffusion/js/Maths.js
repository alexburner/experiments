var Maths = {

    subtractVectors: function (vectorA, vectorB) {
        return _.map(vectorA, function (n, i) {
            return vectorA[i] - vectorB[i];
        });
    },

    addVectors: function (vectorA, vectorB) {
        return _.map(vectorA, function (n, i) {
            return vectorA[i] + vectorB[i];
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

    setVectorLength: function (vector, length) {
        var scale = length / Maths.vectorLength(vector);
        return _.map(vector, function (n) {
            return n * scale;
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