// requires _.lodash

/**
 * Constructor
 */

function Vector(init) {
    if (_.isNumber(init)) {
        // init is the number of dimensions
        this.tuple = Vector.makeTuple(init, 0);
    }
    else if (_.isArray(init)) {
        // init is a tuple
        this.tuple = init;
    }
    else {
        // init is meaningless
        this.tuple = [];
    }
}

/**
 * Static methods
 */

Vector.makeTuple = function (length, n) {
    return _.times(length, _.constant(n));
};

Vector.clone = function (vector) {
    return new Vector(vector.tuple.slice());
};

Vector.getLength = function (vector) {
    return Math.sqrt(Vector.getLengthSq(vector));
};

Vector.getLengthSq = function (vector) {
    return _.reduce(vector.tuple, function (memo, n) {
        return memo + n * n;
    }, 0);
};

Vector.normalize = function(vector) {
    return Vector.setLength(vector, 1);
};

Vector.setLength = function(vector, length) {
    return Vector.multiply(vector, length / vector.getLength());
};

Vector.merge = function(vectorA, vectorB, action) {
    // We want to support expressions like:
    // > var vectorC = Vector.multiply(vectorA, 10);
    // so if vectorB is a number, make it a vector of itself
    if (_.isNumber(vectorB)) {
        vectorB = new Vector(Vector.makeTuple(vectorA.tuple.length, vectorB));
    }
    // Merge A and B into a new vector
    return new Vector(_.times(vectorA.tuple.length, function (i) {
        return action(vectorA.tuple[i], vectorB.tuple[i]);
    }));
};

//
// Extend Vector with static math methods like:
// > var vectorC = Vector.add(vectorA, vectorB);
//

_.each([
    'add',
    'subtract',
    'multiply',
    'divide',
], function (method) {
    Vector[method] = function (vectorA, vectorB) {
        return Vector.merge(vectorA, vectorB, Vector.maths[method]);
    };
});

Vector.maths = {
    add      : function (n1, n2) { return n1 + n2; },
    subtract : function (n1, n2) { return n1 - n2; },
    multiply : function (n1, n2) { return n1 * n2; },
    divide   : function (n1, n2) { return n1 / n2; },
};

/**
 * Instance methods
 */

//
// We extend Vector prototype
// with in-place proxies
// for static Vector methods
//
// Sugar: only for convenience
//

//
// Some static methods return new vectors:
// > var vectorC = Vector.add(vectorA, vectorB);
//
// These instance methods update in place:
// > vectorA.add(vectorB);
//
// And these can be chained, like:
// > vectorA.add(vectorB).subtract(vectorC);
//
_.each([
    'merge',
    'add',
    'subtract',
    'multiply',
    'divide',
    'normalize',
    'setLength',
], function (method) {
    Vector.prototype[method] = function () {
        // sanitize args array
        var i = arguments.length;
        var args = [];
        while (i--) args[i] = arguments[i];
        // prepend self
        args.unshift(this);
        // get static method's result vector
        var vector = Vector[method].apply(null, args);
        // overwrite self tuple with result's
        this.tuple = vector.tuple;
        // return self (for chaining)
        return this;
    };
});

//
// Static methods are kinda clunky for these:
// > var vectorB = Vector.clone(vectorA);
// > var length = Vector.getLength(vectorA);
// > var lengthSq = Vector.getLengthSq(vectorA);
//
// Instance methods seem more convenient:
// > var vectorB = vectorA.clone();
// > var length = vectorA.getLength();
// > var lengthSq = vectorA.getLengthSq();
//
_.each([
    'clone',
    'getLength',
    'getLengthSq',
], function (method) {
    Vector.prototype[method] = function () {
        // sanitize args array
        var i = arguments.length;
        var args = [];
        while (i--) args[i] = arguments[i];
        // prepend self
        args.unshift(this);
        // return static method's result
        return Vector[method].apply(null, args);
    };
});
