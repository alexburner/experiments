//
// container
//


/**
 * Project parent element
 * @type {Object}
 */
var container = {};
container.width = window.innerWidth;
container.height = window.innerHeight;
container.el = document.createElement('div');
container.el.setAttribute('id', 'container');
document.body.appendChild(container.el);
addEvent(window, 'resize', function (e) {
	container.width = window.innerWidth;
	container.height = window.innerHeight;
});