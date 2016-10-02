// requires Vector

function Body(args) {
    args              = args              || {};
    this.dimensions   = args.dimensions   || 1;
    this.gravity      = args.gravity      || 1;
    this.mass         = args.mass         || 1;
    this.locationp    = args.locationp    || new Vector(this.dimensions);
    this.location     = args.location     || new Vector(this.dimensions);
    this.velocity     = args.velocity     || new Vector(this.dimensions);
    this.acceleration = args.acceleration || new Vector(this.dimensions);
}

Body.prototype.import = function (o) {
    this.dimensions   = o.dimensions;
    this.gravity      = o.gravity;
    this.mass         = o.mass;
    this.locationp    = new Vector(o.locationp);
    this.location     = new Vector(o.location);
    this.velocity     = new Vector(o.velocity);
    this.acceleration = new Vector(o.acceleration);
};

Body.prototype.export = function () {
    return {
        dimensions:   this.dimensions,
        gravity:      this.gravity,
        mass:         this.mass,
        location:     this.location.tuple,
        locationp:    this.locationp.tuple,
        velocity:     this.velocity.tuple,
        acceleration: this.acceleration.tuple,
    };
};

Body.prototype.applyForce = function (force) {
    this.acceleration.add(Vector.divide(force, this.mass));
};

Body.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.locationp = this.location.clone();
    this.location.add(this.velocity);
    this.acceleration.multiply(0);
};