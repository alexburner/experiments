//
// canvas
//


var canvas = {};
canvas.el = document.createElement('canvas');
document.body.appendChild(canvas.el);
if (canvas.el.getContext){
	canvas.ctx = canvas.el.getContext('2d');
	canvas.el.width = container.width;
	canvas.el.height = container.height;
	addEvent(window, 'resize', function (e) {
		canvas.el.width = window.innerWidth;
		canvas.el.height = window.innerHeight;
	});
} else {
	canvas.ctx = undefined;
}