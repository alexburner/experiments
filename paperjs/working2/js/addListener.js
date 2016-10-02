/**
 * Cross-browser event listening
 */

var addListener = function(target, type, listener) {
	if (!target) return;
	if (target.addEventListener) {
		// standard practice
		target.addEventListener(type, listener, false);
	} else if (target.attachEvent) {
		// IE prior to 9
		target.attachEvent('on' + type, listener);
	} else {
		// old as balls
		target['on' + type] = listener;
	}
};