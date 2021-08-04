import p5 from "p5";
import { CanvasManager, Circle } from "./classes";

/**
 *
 * @param {{}} options Option menu context object
 * @param {string} ref Reference to the canvas parent div
 * @returns {p5} sketch
 */
export function createSketch(options, ref) {
	/**
	 * @param {p5} sketch
	 */
	function sketchFunction(sketch) {
		let screenshotRequested = false;

		const canvasManager = new CanvasManager(sketch);
		const circle = new Circle(sketch, options);

		function resizeComponents() {
			canvasManager.resizeCanvas();
			circle.resize();
		}

		sketch.setup = () => {
			resizeComponents();
			sketch.noLoop();
		};

		sketch.draw = () => {
			sketch.clear();
			// Moves the origin to the center of the canvas
			sketch.translate(sketch.width / 2, sketch.height / 2);
			// flips the y values so y increases "up"
			sketch.scale(1, -1);

			circle.draw();

			if (screenshotRequested) {
				sketch.save("the-shape-of-multiplication.png");
				screenshotRequested = false;
			}
		};

		sketch.windowResized = () => {
			resizeComponents();
			sketch.redraw();
		};

		/**
		 * Function that will be run when options change
		 * @param {{}} newOptions
		 */
		sketch.onOptionChange = (newOptions) => {
			circle.options = newOptions;
			sketch.redraw();
		};

		sketch.requestScreenshot = () => {
			screenshotRequested = true;
			sketch.redraw();
		};
	}

	return new p5(sketchFunction, ref);
}
