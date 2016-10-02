function Scroll() {
    this.el = Scroll.makeEl();
    this.elHeight = null;
    this.rowCount = null;
    this.rowHeight = 200;
    this.rowMap = {};
}

Scroll.makeEl = function () {
    var el = document.createElement('div');
    el.className = 'scroll';
    return el;
};

Scroll.prototype.destroy = function () {
    for (var rowId in this.rowMap) {
        this.removeRow(this.rowMap[rowId]);
    }
    this.el.remove();
    this.el = null;
};

Scroll.prototype.initialize = function () {
    // prereq: append this.el to document
    // measure height
    // calc row count
    // add rows needed
    this.elHeight = this.measureElHeight();
    this.rowCount = 1 + Math.ceil(this.elHeight / this.rowHeight);
    for (var i = 0; i < this.rowCount; i++) {
        this.addRow(i * this.rowHeight - this.rowHeight);
    }
};

Scroll.prototype.update = function () {
    // measure height
    // calc row count
    // if new count !== curr count
    // add/remove rows as needed
    var currCount = this.rowCount;
    this.elHeight = this.measureElHeight();
    this.rowCount = 1 + Math.ceil(this.elHeight / this.rowHeight);
    var countDiff = currCount - this.rowCount;
    if (countDiff < 0) {
        while (countDiff !== 0) {
            this.addRowAtBottom();
            countDiff++;
        }
    }
    else if (countDiff > 0) {
        while (countDiff !== 0) {
            this.removeRowAtBottom();
            countDiff--;
        }
    }
};

Scroll.prototype.scroll = function (deltaY) {
    if (!deltaY) return;
    for (var rowId in this.rowMap) {
        var row = this.rowMap[rowId];
        var top = row.setTop(row.getTop() - deltaY);
        if (top + this.rowHeight < 0) {
            // row too low
            // remove row
            // add new at bottom
            this.removeRow(row);
            this.addRow(top + this.rowHeight * this.rowCount);
        }
        else if (top - this.rowHeight > (this.rowCount - 2) * this.rowHeight) {
            // row too high
            // remove row
            // add new at top
            this.removeRow(row);
            this.addRow(top - this.rowHeight * this.rowCount);
        }
    }
};

Scroll.prototype.measureElHeight = function () {
    var rect = this.el.getBoundingClientRect();
    return rect.height;
};

Scroll.prototype.addRow = function (top) {
    var row = new Row();
    row.setTop(top);
    this.el.appendChild(row.el);
    this.rowMap[row.id] = row;
};

Scroll.prototype.removeRow = function (row) {
    delete this.rowMap[row.id];
    row.destroy();
};

Scroll.prototype.addRowAtBottom = function () {
    var bottomRow = this.findBottomRow();
    this.addRow(bottomRow.getTop() + this.rowHeight);
};

Scroll.prototype.removeRowAtBottom = function () {
    var bottomRow = this.findBottomRow();
    this.removeRow(bottomRow);
};

Scroll.prototype.findBottomRow = function () {
    var bottomRow = null;
    var bottomTop = -Infinity;
    for (var rowId in this.rowMap) {
        var row = this.rowMap[rowId];
        var top = row.getTop();
        if (top > bottomTop) {
            bottomRow = row;
            bottomTop = top;
        }
    }
    return bottomRow;
};