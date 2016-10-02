/**
 * Callback queue for frame handling
 * Serially fires self-sustaining callbacks
 */

function CallBackQueue() {
	this.queue = [];
	this.isPaused = false;
}

CallBackQueue.prototype.handleFrame = function (time) {
	if (!this.queue.length) return;
	// callback returns self to continue
	var callback = this.queue[0](time);
	if (!callback) this.queue.shift();
	else return callback;
};

CallBackQueue.prototype.add = function (callback, thisObj) {
	this.queue.push(function (time) {
		// preserve this with anonymous closure & call
		return callback.call(thisObj, time);
	});
};