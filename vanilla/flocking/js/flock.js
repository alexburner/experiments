



/*

precendents

Boids
http://www.red3d.com/cwr/boids/

BREVE SWARM
http://faculty.hampshire.edu/lspector/pubs/spector-gecco2003.pdf

*/






//
// the birds
//

var flock = {
	birds: [],
	createBirds: function (count) {
		var index = 0;
		while (index < count) {
			var bird = new Bird(flock.birds);
			index++;
		}
	},
	destroyBirds: function (count) {
		var index = 0;
		while (index < count) {
			flock.birds[index].destroy();
			index++;
		}
	}
};



