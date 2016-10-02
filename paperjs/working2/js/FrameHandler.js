/**
 * Request animation frame handler
 *
 * An "animation" is a function that is run for each animation frame
 * of the browser render engine. It will call any provided method using
 * the provided "this" value, passing it the timestamp of the frame.
 *
 * All animations are run in parallel, and can self-destruct by 
 * returning any truthy value.
 * 
 */

function FrameHandler () {
	this.callbacks = [];
	this.isAnimating = false;
}

FrameHandler.prototype.start = function () {
	this.isAnimating = true;
	this._handleFrame(new Date().getTime());
};

FrameHandler.prototype.toggle = function () {
	this.isAnimating = !this.isAnimating;
	if (this.isAnimating) this.start();
};

FrameHandler.prototype.addCallback = function (callback, thisObj) {
	this.callbacks.push(function (time) {
		// preserve thisObj with anonymous closure & call
		return callback.call(thisObj, time);
	});
};

FrameHandler.prototype._handleFrame = function (time) {
	if (!this.isAnimating) return;
	var nextCallbacks = [];
	this.callbacks.forEach(function (callback) {
		// callback returns self to continue
		callback = callback(time);
		if (callback) {
			nextCallbacks.push(callback);
		}
	});
	// update callbacks
	this.callbacks = nextCallbacks;
	// pass handler to browser for another go
	requestAnimationFrame(this._exportHandler());
};

FrameHandler.prototype._exportHandler = function () {
	var self = this;
	return function () {
		// capture thisself with anonymous closure & apply
		return self._handleFrame.apply(self, arguments);
	};
};