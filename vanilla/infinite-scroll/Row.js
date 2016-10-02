function Row() {
    this.id = Row.getId();
    this.el = Row.makeEl(this.id);
    this.top = null;
}

Row.count = 0;

Row.getId = function () {
    return ++Row.count;
};

Row.makeEl = function (id) {
    var el = document.createElement('div');
    var text = document.createTextNode('Hello World ' + id);
    el.className = 'scroll-row';
    el.appendChild(text);
    return el;
};

Row.prototype.destroy = function () {
    this.el.remove();
    this.el = null;
};

Row.prototype.setTop = function (top) {
    this.el.style.top = top + 'px';
    this.top = top;
    return top;
};

Row.prototype.getTop = function () {
    return this.top;
};