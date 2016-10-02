/**
 * Center lines
 */
var path;

// center horizontal
path = new paper.Path();
path.strokeColor = 'black';
path.add(new paper.Point([
	0,
	(1 * pageHeight) / 2
]));
path.add(new paper.Point([
	pageWidth,
	(1 * pageHeight) / 2
]));

// left center vertical
path = new paper.Path();
path.strokeColor = 'black';
path.add(new paper.Point([
	(1 * pageWidth) / 4,
	0
]));
path.add(new paper.Point([
	(1 * pageWidth) / 4,
	pageHeight
]));

// right center vertical
path = new paper.Path();
path.strokeColor = 'black';
path.add(new paper.Point([
	(3 * pageWidth) / 4,
	0
]));
path.add(new paper.Point([
	(3 * pageWidth) / 4,
	pageHeight
]));


/**
 * Text bounds
 */
var bounds = new paper.Path.Rectangle(text.bounds);
bounds.strokeWidth = 1;
bounds.strokeColor = 'red';


/**
 * Render paper onto canvas
 */
paper.view.draw();