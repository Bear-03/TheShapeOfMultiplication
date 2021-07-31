/**
 * @typedef {import("p5")} p5
 */

import { generateGradientArray } from "./palette-manager";

export class CanvasManager {
	/* Number multiplied by the available
	length so the canvas has some margin */
	sizeScalingFactor = 0.9;
	/** @type {p5} */
	sketch;

	constructor(sketch) {
		this.sketch = sketch;
	}

	resizeCanvas() {
		const canvasSize = this.calculateSize(this.sketch, this.sketch.canvas);
		this.sketch.resizeCanvas(canvasSize, canvasSize);
	}

	getCanvasBoundingRect() {
		return this.sketch.canvas.getBoundingClientRect();
	}

	/**
	 * Sets the size of the canvas to the minimum value of the width or height available.
	 * @returns {number}
	 */
	calculateSize() {
		/*
		The width available is the whole window width because there will be no elements on the sides
		The height available is the window height, but subtracting the height of the elements on top, as
		they have to stay there and that space isn't available. (canvas top coordinate = height of the elements on top)
		*/
		return (
			Math.min(
				this.sketch.windowWidth,
				this.sketch.windowHeight - this.getCanvasBoundingRect().top
			) * this.sizeScalingFactor
		);
	}
}

class Node {
	/** @type {number} */
	static diameter;

	/* The diameter of the nodes will me calculated dividing the
	circle diameter by the node count. These numbers will be used
	to clamp the dividend so the nodes don't become invisible nor huge.
	The values can be interpreted as the max and min node count that
	will be used for the calculations. i.e. nodes will never be smaller than
	the size they get with nodeCount == maxDiameter, etc.
	*/
	static minNodeCountToShrink = 60;
	static maxNodeCountToDisappear = 250;
	static hidden = false;

	/** @type {p5} */
	sketch;
	/** @type {number} */
	angle;
	/** @type {p5.Vector} */
	position;

	/**
	 * @param {p5}
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(sketch, angle) {
		this.sketch = sketch;
		this.angle = angle;

		this.position = this.sketch.createVector(0, 0);
	}

	static recalculateDiameter(circle) {
		Node.hidden = circle.nodeCount > Node.maxNodeCountToDisappear;
		if (Node.hidden) return;

		Node.diameter =
			circle.diameter /
			Math.max(Node.minNodeCountToShrink, circle.nodeCount);
	}

	static getMaxDiameter(circle) {
		return circle.diameter / Node.minNodeCountToShrink;
	}

	draw() {
		if (Node.hidden) return;

		this.sketch.noStroke();
		this.sketch.fill(255);
		this.sketch.circle(this.position.x, this.position.y, Node.diameter);
	}

	recalculatePosition(circle) {
		this.position = this.sketch
			.createVector(Math.cos(this.angle), Math.sin(this.angle))
			.mult(circle.diameter / 2);
	}
}

export class Circle {
	/** @type {p5} */
	sketch;
	/** @type {{}} */
	_options;

	/** @type {number} */
	strokeWeight = 2;
	/** @type {number} */
	diameter;
	/** @type {Node[]} */
	nodes;
	/** @type {p5.Color[]} */
	lineColors;
	/** @type {p5.Color[]} */
	usedLineColors;

	constructor(sketch, options) {
		this.sketch = sketch;
		this._options = options;

		this.populateNodeArray();
		this.updateLineColors();
	}

	get options() {
		return this._options;
	}

	set options(newOptions) {
		const oldOptions = this.options;
		this._options = newOptions;

		if (oldOptions.nodeCount !== this.nodeCount) this.updateNodeCount();
		if (oldOptions.selectedPalette !== this.options.selectedPalette)
			this.updateLineColors();
	}

	get nodeCount() {
		return this.options.nodeCount;
	}

	get usedPalette() {
		return this.options.palettes[this.options.selectedPalette];
	}

	updateNodeCount() {
		this.populateNodeArray();
		this.updateNodeProperties();
		this.pickUsedLineColors();
	}

	updateLineColors() {
		this.lineColors = generateGradientArray(
			this.sketch,
			this.options.maxNodeCount,
			this.usedPalette
		);

		this.pickUsedLineColors();
	}

	resize() {
		this.recalculateDiameter();
		this.diameter -= Node.getMaxDiameter(this);

		this.updateNodeProperties();
	}

	/**
	 * Draws the circle and all its components
	 */
	draw() {
		this.drawLines();
		this.drawCircle();
		this.drawNodes();
	}

	/**
	 * Draws the circle (see draw() for the circle and components)
	 */
	drawCircle() {
		this.sketch.noFill();
		this.sketch.stroke(255);
		this.sketch.strokeWeight(this.strokeWeight);

		this.sketch.ellipse(0, 0, this.diameter);
	}

	recalculateDiameter() {
		this.diameter = this.sketch.width - this.strokeWeight;
	}

	populateNodeArray() {
		this.nodes = [];
		const angleBetweenNodes = (2 * Math.PI) / this.nodeCount;

		for (let nodeNumber = 0; nodeNumber < this.nodeCount; nodeNumber++) {
			const angle = nodeNumber * angleBetweenNodes;
			this.nodes.push(new Node(this.sketch, angle));
		}
	}

	/**
	 * Recalculates all node positions and diameter
	 */
	updateNodeProperties() {
		for (const node of this.nodes) node.recalculatePosition(this);
		Node.recalculateDiameter(this);
	}

	drawNodes() {
		for (const node of this.nodes) node.draw();
	}

	drawLines() {
		for (let [i, node] of this.nodes.entries()) {
			// Start at node 1 because first node is 0 and 0 * anything = 0
			if (i === 0) continue;

			const endNodeIndex = (i * this.options.multNumber) % this.nodeCount;
			this.drawLineBetweenNodes(
				node,
				this.nodes[endNodeIndex],
				this.usedLineColors[i]
			);
		}
	}

	drawLineBetweenNodes(startNode, endNode, color) {
		this.sketch.noFill();
		this.sketch.stroke(color);

		this.sketch.line(
			startNode.position.x,
			startNode.position.y,
			endNode.position.x,
			endNode.position.y
		);
	}

	/**
	 * Picks evenly spaced colors from the lineColors array
	 * so there are as many colors as nodes.
	 */
	pickUsedLineColors() {
		this.usedLineColors = [];

		for (let i = 0; i < this.nodeCount; i++) {
			/* Number from 0 to 1 where the element to select is
			located, 0 being the first element and 1 the last one */
			const elementProportionInArray = i / this.nodeCount;
			const elementIndex = Math.round(
				elementProportionInArray * this.lineColors.length
			);

			this.usedLineColors.push(this.lineColors[elementIndex]);
		}
	}
}
