// requires _
// requires Maths

/**
 * Constructor
 */

function Vector(init) {
    if (_.isNumber(init)) {
        // init is the number of dimensions
        this.tuple = Vector.tuple(init, 0);
    }
    else if (_.isArray(init)) {
        // init is a tuple
        this.tuple = init;
    }
    else {
        // init is broke
        this.tuple = [];
    }
}

/**
 * Static methods
 */

Vector.tuple = function (count, n) {
    return _.times(count, _.constant(n));
};

Vector.normalize = function(vector) {
    return Vector.setLength(vector, 1);
};

Vector.setLength = function(vector, length) {
    return Vector.multiply(vector, length / vector.length());
};

Vector.merge = function(vectorA, vectorB, action) {
    if (_.isNumber(vectorB)) {
        // We want to support expressions like
        // > var vectorC = Vector.multiply(vectorA, 10);
        // so if vectorB is a number, make it a vector of itself
        vectorB = new Vector(Vector.tuple(vectorA.tuple.length, vectorB));
    }
    return new Vector(
        _.map(vectorA.tuple, function (n, i) {
            return action(vectorA.tuple[i], vectorB.tuple[i]);
        })
    );
};

//
// Extend Vector object with basic maths like
// > var vectorC = Vector.add(vectorA, vectorB);
//
_.each(
    [
        'add',
        'subtract',
        'multiply',
        'divide',
    ],
    function (method) {
        Vector[method] = function (vectorA, vectorB) {
            return Vector.merge(vectorA, vectorB, Maths[method]);
        };
    }
);

/**
 * Instance methods
 */

Vector.prototype.clone = function () {
    return new Vector(this.tuple.slice());
};

Vector.prototype.length = function () {
    return Math.sqrt(this.lengthSq());
};

Vector.prototype.lengthSq = function () {
    return _.reduce(this.tuple, function (memo, n) {
        return memo + n * n;
    }, 0);
};

//
// Extend Vector prototype with in-place
// versions of static Vector math methods
//
// so instead of doing all our math like
// > var vectorC = Vector.add(vectorA, vectorB);
//
// we can also do it in-place like
// > vectorA.add(vectorB);
//
// and we return self to support chaining like
// > vectorA.add(vectorB).subtract(vectorC);
//
_.each(
    [
        'merge',
        'add',
        'subtract',
        'multiply',
        'divide',
        'normalize',
        'setLength',
    ],
    function (method) {
        Vector.prototype[method] = function () {
            // call static method with self prepended
            var args = _.concat([this], arguments);
            var result = Vector[method].apply(null, args);
            // overwrite own tuple with result's
            this.tuple = result.tuple;
            // support chaining
            return this;
        };
    }
);
