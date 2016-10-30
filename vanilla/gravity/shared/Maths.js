function Maths () {}

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
