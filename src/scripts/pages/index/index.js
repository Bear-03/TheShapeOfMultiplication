/**
 * @typedef {import("./classes").CustomCanvas} CustomCanvas
 */

/**
 * The closure passed to create the p5 instance
 * @param {CustomCanvas} c
 */
const sketch = async (c) => {
	const { loadDropdowns, changePropertyOnInput } = await import("./menus");
	const { generateGradientArray } = await import("./palette-manager");
	const { Circle } = await import("./classes");


	const maxNodeCount = document.getElementById("option-menu__node-count").max;

	const lineColors = generateGradientArray(
		c,
		maxNodeCount,
		["#B9E3C6", "#59C9A5", "#D81E5B", "#23395B", "#FFFD98"]
	);

	const circle = new Circle(c, lineColors);


	loadDropdowns();
	changePropertyOnInput("option-menu__node-count", circle, "nodeCount");
	changePropertyOnInput("option-menu__mult-number", circle, "multNumber");


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
