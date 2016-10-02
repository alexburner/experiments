// http://stackoverflow.com/questions/641857/javascript-window-resize-event
var addEvent = function(elem, type, eventHandle) {
	if (elem == null || elem == undefined) return;
	if ( elem.addEventListener ) {
		elem.addEventListener( type, eventHandle, false );
	} else if ( elem.attachEvent ) {
		elem.attachEvent( "on" + type, eventHandle );
	} else {
		elem["on"+type]=eventHandle;
	}
};