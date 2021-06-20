/**
 * @typedef {import("./classes").CustomCanvas} CustomCanvas
 */

/**
 * The closure passed to create the p5 instance
 * @param {CustomCanvas} s
 */
const sketch = async (s) => {
	const { Circle } = await import("./classes");

	const circle = new Circle(s);

	function resizeComponents() {
		s.resize();
		circle.resize();
	}

	s.setup = () => {
		s.createCanvas(0, 0);
		resizeComponents();
	};

	s.draw = () => {
		s.clear();
		s.translate(s.width/2, s.height/2);

		circle.draw();
	};

	s.windowResized = () => {
		resizeComponents();
	};
};

(async () => {
	const { CustomCanvas } = await import("./classes");
	new CustomCanvas(sketch, "sketch-container"); // Not saved in a variable because it wont be used
})();
