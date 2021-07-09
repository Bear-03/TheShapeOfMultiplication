import p5 from "p5";
import { generateGradientArray } from "./palette-manager";
import { CanvasManager, Circle } from "./classes";

/**
 *
 * @param {{}} options Option menu context object
 * @param {string} ref Reference to the canvas parent div
 * @returns {Function} onOptionChange function
 */
export function createSketch(options, ref) {
	console.log("A");
	let onOptionChange = () => {};

	/*
	 * @param {CustomCanvas} c
	 */
	function sketch(c) {
		const lineColors = generateGradientArray(
			c,
			options.maxNodeCount,
			//["#B9E3C6", "#59C9A5", "#D81E5B", "#23395B", "#FFFD98"]
			["#AFCBFF", "#254441", "#43AA8B", "#B2B09B", "#EF3054"]
		);

		const circle = new Circle(c, options, lineColors);

		function resizeComponents() {
			CanvasManager.resizeCanvas(c);
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

		/**
		 * Function that will be run when options change
		 * @param {{}} newOptions
		 */
		onOptionChange = (newOptions) => {
			circle.options = newOptions;
		};

		c.windowResized = () => {
			resizeComponents();
		};
	}

	new p5(sketch, ref);

	return onOptionChange;
}
