import { generateGradientArray } from "./palette-manager";
import { CustomCanvas, Circle } from "./classes";

/**
 * The closure passed to create the p5 instance
 * @param {CustomCanvas} c
 */
export function createSketch(maxNodeCount, ref) {
	/*
	 * @param {CustomCanvas} c
	 */
	function sketch(c) {
		const lineColors = generateGradientArray(
			c,
			maxNodeCount,
			//["#B9E3C6", "#59C9A5", "#D81E5B", "#23395B", "#FFFD98"]
			["#AFCBFF", "#254441", "#43AA8B", "#B2B09B", "#EF3054"]
		);

		const circle = new Circle(c, lineColors);

		function resizeComponents() {
			c.resize();
			circle.resize();
		}

		c.setup = () => {
			resizeComponents();
		};

		c.draw = () => {
			c.clear();
			// Moves the origin to the center of the canvas
			c.translate(c.width / 2, c.height / 2);
			// flips the y values so y increases "up"
			c.scale(1, -1);

			circle.draw();
		};

		c.windowResized = () => {
			resizeComponents();
		};
	}

	return new CustomCanvas(sketch, ref);
}
