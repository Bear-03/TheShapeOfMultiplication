import { CustomCanvas, Circle } from "./classes.js";

/**
 * The closure passed to create the p5 instance
 * @param {CustomCanvas} s
 */
const sketch = (s) => {
	const circle = new Circle(s);

	s.setup = () => {
		s.createCanvas(0, 0);
	};

	s.draw = () => {
		s.updateDraw();

		circle.draw();
	};
};

new CustomCanvas(sketch, "sketch-container"); // Not saved in a variable because it wont be used
