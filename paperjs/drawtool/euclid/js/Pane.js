/**
 * Pane class
 */

function Pane() {
	this.background = new paper.Path.Rectangle(paper.view.bounds);
	this.background.fillColor = app.settings.backgroundColor;
}