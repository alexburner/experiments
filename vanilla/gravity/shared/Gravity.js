// requires Maths
// requires Vector

function Gravity(args) {
    args = args || {};
    this.gravitation = args.gravitation || 1;
    this.minDistance = args.minDistance || 5;
    this.maxDistance = args.maxDistance || 25;
}

Gravity.prototype.attract = function (attracted, attractor) {
    var force = Vector.subtract(
        attractor.location,
        attracted.location
    );

    var distance = Maths.clamp(
        force.getLength(),
        this.minDistance,
        this.maxDistance
    );

    var strength = (
        (this.gravitation * attractor.mass * attracted.mass) /
        (distance * distance)
    );

    return force.setLength(strength);
};
