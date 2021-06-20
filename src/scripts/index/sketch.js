/**
 * @typedef {import("./classes").CustomCanvas} CustomCanvas
 */

/**
 * The closure passed to create the p5 instance
 * @param {CustomCanvas} c
 */
const sketch = async (c) => {
	const { Circle } = await import("./classes");

	const circle = new Circle(c);

	function resizeComponents() {
		c.resize();
		circle.resize();
	}

	c.setup = () => {
		resizeComponents();
	};

	c.draw = () => {
		c.clear();
		c.translate(c.width/2, c.height/2);

		circle.draw();
	};

	c.windowResized = () => {
		resizeComponents();
	};
};

(async () => {
	const { CustomCanvas } = await import("./classes");
	new CustomCanvas(sketch, "sketch-container"); // Not saved in a variable because it wont be used
})();
