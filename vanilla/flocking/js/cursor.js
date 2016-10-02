//
// cursor
//


/**
 * Floaty ball next to mouse pointer
 * @type {Object}
 */
var cursor = {
	el: document.createElement('div'),
	x: -1000,
	y: -1000,
	is: undefined,
	NEUTRAL: 1,
	THREAT: 2,
	FOOD: 3,
	setState: function (state) {
		switch (state) {
			case cursor.NEUTRAL:
				cursor.is = cursor.NEUTRAL;
				cursor.el.setAttribute('class', 'neutral');
				break;
			case cursor.THREAT:
				cursor.is = cursor.THREAT;
				cursor.el.setAttribute('class', 'threat');
				break;
			case cursor.FOOD:
				cursor.is = cursor.FOOD;
				cursor.el.setAttribute('class', 'food');
				break;
		}
	},
	mousemove: function (e) {
		e = e || window.event;
		cursor.x = e.pageX;
		cursor.y = e.pageY;
		cursor.el.style.left = cursor.x + 'px';
		cursor.el.style.top = cursor.y + 'px';
	},
	mouseup: function (e) {
		if (cursor.is === cursor.FOOD) {
			cursor.setState(cursor.THREAT);
		} else if (cursor.is === cursor.THREAT) {
			cursor.setState(cursor.NEUTRAL);
		} else if (cursor.is === cursor.NEUTRAL) {
			cursor.setState(cursor.FOOD);
		}
	}
};

// set cursor state
cursor.setState(cursor.NEUTRAL);

// insert cursor into document
container.el.appendChild(cursor.el);

// add cursor event handlers
addEvent(window, 'mousemove', cursor.mousemove);
addEvent(window, 'mouseup', cursor.mouseup);