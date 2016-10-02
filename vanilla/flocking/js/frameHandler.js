
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
  if(!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
  };
}());






//
// animation frames
//


var frameHandler = (function () {
	var isPaused = false;
	var animations = [];
	// fires on each animation frame
	function handleFrame(time) {
		if (isPaused) return;
		var completed = [];
		// execute each animation
		for (var i = 0, l = animations.length; i < l; i++) {
			// animations return bool flag to complete
			var isComplete = animations[i](time);
			if (isComplete) {completed.push(i);}
		}
		// clean out completed animations
		for (var i = 0, l = completed.length; i < l; i++) {
			animations.slice(completed[i], 1);
		}
		// pass handler to browser for next frame
		requestAnimationFrame(handleFrame);
	}
	// interface
	return {
		start: function () {
			handleFrame(new Date().getTime());
		},
		pause: function () {
			isPaused = true;
		},
		togglePause: function () {
			isPaused = !isPaused;
			if (!isPaused) {frameHandler.start();}
		},
		addAnimation: function (animation, thisValue) {
			animations.push(function (time) {
				return animation.call(thisValue, time);
			});
		}
	};
})();