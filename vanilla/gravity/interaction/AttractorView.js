function AttractorView() {
    this.id = AttractorView.getId();
    this.el = AttractorView.makeEl(this.id);
    this.dotEl = AttractorView.makeDotEl();
    this.discEl = AttractorView.makeDiscEl();
    this.el.appendChild(this.dotEl);
    this.el.appendChild(this.discEl);
}

AttractorView.count = 0;

AttractorView.getId = function () {
    return ++AttractorView.count;
};

AttractorView.makeEl = function (id) {
    var el = document.createElement('div');
    el.className = 'particle';
    el.dataset.id = id;
    return el;
};

AttractorView.makeDotEl = function (id) {
    var el = document.createElement('div');
    el.className = 'dot';
    return el;
};

AttractorView.makeDiscEl = function (id) {
    var el = document.createElement('div');
    el.className = 'disc';
    return el;
};

AttractorView.prototype.destroy = function () {
    this.el.remove();
    this.el = null;
    this.dotEl = null;
    this.discEl = null;
};

AttractorView.prototype.setPosition = function (x, y) {
    this.el.style.top = y + 'px';
    this.el.style.left = x + 'px';
};

AttractorView.prototype.setMass = function (mass) {
    var doublemass = mass * 2;
    this.discEl.style.width = doublemass + 'px';
    this.discEl.style.height = doublemass + 'px';
    this.discEl.style.marginTop = -mass + 'px';
    this.discEl.style.marginLeft = -mass + 'px';
};