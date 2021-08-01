/**
 * @typedef {import("p5")} p5
 * @typedef {import("p5").Color} Color
 */

/**
 * @param {string[]} palette
 * @returns {Color[]}
 */
function hexToColorObjectPalette(sketch, palette) {
	return palette.map((e) => sketch.color(e));
}

function distributeColors(colorsToGenerate, intervalCount) {
	const colorsPerInterval = new Array(intervalCount).fill(
		Math.floor(colorsToGenerate / intervalCount)
	);

	/* Then, if the color count couldn't be shared evenly among all intervals (newColorCount != multiple of intervalCount),
	the number of remaining colors (newColorCount % intervalCount) will be added to the first intervals */
	for (let i = colorsToGenerate % intervalCount, j = 0; i > 0; i--, j--)
		colorsPerInterval[j]++;

	return colorsPerInterval;
}

/**
 * @param {p5} sketch
 * @param {number} maxNodeCount
 * @param {string[]} strPalette
 * @returns {Color[]}
 */
export function generateGradientArray(sketch, maxNodeCount, strPalette) {
	// If there's only one color there's no need to calculate anything
	if (strPalette.length === 1)
		return new Array(maxNodeCount).fill(strPalette[0]);

	const palette = hexToColorObjectPalette(sketch, strPalette);

	const result = [];

	/* For simplicity, colorCount also includes the palette colors, but those don't
	have to be generated */
	const colorsToGenerate = maxNodeCount - palette.length;
	const intervalCount = palette.length - 1;

	const colorsPerInterval = distributeColors(colorsToGenerate, intervalCount);

	for (const [interval, startColor] of palette.entries()) {
		/* The endColor will be the startColor in the next iteration,
		so it has to be pushed before checking for endColor*/
		result.push(startColor);

		const endColor = palette[interval + 1];
		if (!endColor) break;

		for (
			let colorNumber = 1;
			colorNumber < colorsPerInterval[interval] + 1;
			colorNumber++
		) {
			/* The loop has to behave as if it needed 2 colors more: startColor and endColor. Both of them
			will be skipped, the former with colorNumber starting at 1 and the latter with the <
			Both colors still have to be taken into account when calculating lerpAmt. lerpAmt = 0 will be skipped
			because colorNumber starts at 1, the + 1 in the denominator will account for endColor.
			*/
			const lerpAmt = colorNumber / (colorsPerInterval[interval] + 1);

			result.push(sketch.lerpColor(startColor, endColor, lerpAmt));
		}
	}

	return result;
}
