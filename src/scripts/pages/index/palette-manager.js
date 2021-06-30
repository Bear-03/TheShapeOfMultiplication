/**
 * @typedef {import("p5").Color} Color
 * @typedef {import("./classes").CustomCanvas} CustomCanvas
 */

/**
 * @param {string[]} palette
 * @returns {Color[]}
 */
function hexToColorPalette(c, palette) {
	return palette.map(e => c.color(e));
}

/**
 * @param {CustomCanvas} c
 * @param {number} maxNodeCount
 * @param {string[]} palette
 * @returns {Color[]}
 */
export function generateGradientArray(c, maxNodeCount, strPalette) {
	const palette = hexToColorPalette(c, strPalette);

	const result = [];

	/* For simplicity, colorCount also includes the palette colors, but those don't
	have to be generated */
	const newColorCount = maxNodeCount - palette.length;
	const intervalCount = palette.length - 1;


	// How many colors each interval should have. Shares the color count among all intervals
	const colorCountForIntervals = new Array(intervalCount).fill(Math.floor(newColorCount / intervalCount));

	/* Then, if the color count couldn't be shared evenly among all intervals (newColorCount != multiple of intervalCount),
	the number of remaining colors (newColorCount % intervalCount) will be added to the first intervals */
	for (let i = newColorCount % intervalCount, j = 0; i > 0; i--, j--)
		colorCountForIntervals[j]++;


	for (const [interval, startColor] of palette.entries()) {
		/* The endColor will be the startColor in the next iteration,
		so it has to be pushed before checking for endColor*/
		result.push(startColor);

		const endColor = palette[interval + 1];
		if (!endColor) break;

		for(let colorNumber = 1; colorNumber < colorCountForIntervals[interval] + 1; colorNumber++) {
			/* The loop has to behave as if it needed 2 colors more: startColor and endColor. Both of them
			will be skipped, the former with colorNumber starting at 1 and the latter with the <

			Both colors still have to be taken into account when calculating lerpAmt. lerpAmt = 0 will be skipped
			because colorNumber starts at 1, the + 1 in the denominator will account for endColor.
			*/
			const lerpAmt = colorNumber / (colorCountForIntervals[interval] + 1);

			result.push(c.lerpColor(startColor, endColor, lerpAmt));
		}
	}

	return result;
}
