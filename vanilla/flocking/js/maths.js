//
// maths
// 



/**
 * 50%ish chance bool flag
 * @return {Boolean} Heads/tails
 */
function coinFlip() {
	return Math.random() > 0.5;
}

/**
 * Pythagorean theorem a & b into c
 * @param  {Number} x A
 * @param  {Number} y B
 * @return {Number}   C
 */
function getHypotenuse(x, y) {
	return Math.sqrt(x * x + y * y);
}

/**
 * Contstain a number to +/- boundary
 * @param  {Number} number To constrain
 * @param  {Number} limit  +/- boundary
 * @return {Number}        Constrained number
 */
function limitNumber(number, limit) {
	if (number > limit) {
		number = limit;
	} else if (number < -1 * limit) {
		number = -1 * limit;
	}
	return number;
}

/**
 * Sum two vectors & normalize the result to null velocity change
 * @param  {Number} takerDX Absorber dx
 * @param  {Number} takerDY Absorber dy
 * @param  {Number} giverDX Absorbed dx
 * @param  {Number} giverDY Absorbed dy
 * @return {Object}         Resulting dx and dy
 */
function getNormalizedVectorSum(takerDX, takerDY, giverDX, giverDY) {
	var takerVectorLength = getHypotenuse(takerDX, takerDY);
	var summedDX = takerDX + giverDX;
	var summedDY = takerDY + giverDY;
	var summedVectorLength = getHypotenuse(summedDX, summedDY);
	var normalize = takerVectorLength / summedVectorLength;
	return {
		dx: summedDX * normalize,
		dy: summedDY * normalize
	};
}