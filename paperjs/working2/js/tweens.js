/**
 * Tweening (for animations with frame handler)
 */

// generic tweens
var tweens = {
	
	Linear: function (args) {
		// parse out arguments
		var action = args.action;
		var data = args.data;
		var step = args.step;
		var end = args.end;
		// track progress
		var current = 0;
		// recursive frame execution
		var animateFrame = function () {
			// calculate this delta (either increment or whatever is left)
			var delta = current + step < end ? step : end - current;
			// pass data & delta to action
			action(data, delta);
			// mark the change
			current += delta;
			// are we there yet?
			if (current < end) return animateFrame;
			else animateFrame = null; return;
		};
		// for frame handler
		return animateFrame;
	}

};

// paper vector tweens
tweens.vector = twins.v = {

	Linear = function (args) {

		// TODO
		
	}

}