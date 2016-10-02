function Maths () {}

Maths.add      = function (n1, n2) { return n1 + n2; };
Maths.subtract = function (n1, n2) { return n1 - n2; };
Maths.multiply = function (n1, n2) { return n1 * n2; };
Maths.divide   = function (n1, n2) { return n1 / n2; };

Maths.coinFlip = function () {
    return Math.random() < 0.5;
};

Maths.clamp = function (n, min, max) {
    return Math.min(Math.max(n, min), max);
};

Maths.random = function (min, max) {
    min = min || 0;
    max = max || 1;
    return Math.random() * (max - min) + min;
};
