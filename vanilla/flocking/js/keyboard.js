//
// keyboard
//


/**
 * Keyboard event handler
 * @param  {Object} e DOM Event
 * @return undefined
 */
addEvent(window, 'keydown', function (e) {
	e = e || window.event;
	switch (e.keyCode) {
		
	}
});


/**
 * Keyboard event handler
 * @param  {Object} e DOM Event
 * @return undefined
 */
addEvent(window, 'keyup', function (e) {
	e = e || window.event;
	switch (e.keyCode) {
		case 32:
			// spacebar pause
			e.preventDefault();
			frameHandler.togglePause();
			break;
	}
});