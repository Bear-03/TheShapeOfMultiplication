import p5 from "p5";
import { CanvasManager, Circle } from "./classes";

/**
 *
 * @param {{}} options Option menu context object
 * @param {string} ref Reference to the canvas parent div
 * @returns {Function} onOptionChange function
 */
export function createSketch(options, ref) {
	let onOptionChange = () => {};

	/**
	 * @param {p5} sketch
	 */
	function sketchFunction(sketch) {
		const canvasManager = new CanvasManager(sketch);
		const circle = new Circle(sketch, options);

		function resizeComponents() {
			canvasManager.resizeCanvas();
			circle.resize();
		}

		sketch.setup = () => {
			resizeComponents();
		};

		sketch.draw = () => {
			sketch.clear();
			// Moves the origin to the center of the canvas
			sketch.translate(sketch.width / 2, sketch.height / 2);
			// flips the y values so y increases "up"
			sketch.scale(1, -1);

			circle.draw();
		};

		/**
		 * Function that will be run when options change
		 * @param {{}} newOptions
		 */
		onOptionChange = (newOptions) => {
			circle.options = newOptions;
		};

		sketch.windowResized = () => {
			resizeComponents();
		};
	}

	new p5(sketchFunction, ref);

	return onOptionChange;
}
