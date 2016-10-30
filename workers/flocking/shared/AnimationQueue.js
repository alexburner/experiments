function AnimationQueue() {
    this.__queue = [];
    this.__animateThis = this.__animate.bind(this);
}

AnimationQueue.prototype.add = function (fn) {
    this.__queue.push(fn);
    if (this.__queue.length === 1) {
        window.requestAnimationFrame(this.__animateThis);
    }
};

AnimationQueue.prototype.__animate = function () {
    // run any functions that made it into queue during wait
    while (this.__queue.length) this.__queue.shift()();
};