/**
 * @typedef {import("p5")} p5
 */

import { clampNumber } from "./util";

export class CanvasManager {
	/* Number multiplied by the available
	length so the canvas has some margin */
	static sizeScalingFactor = 0.9;

	static resizeCanvas(sketch) {
		const canvasSize = this.calculateSize(sketch, sketch.canvas);
		sketch.resizeCanvas(canvasSize, canvasSize);
	}

	static getBoundingRect(canvas) {
		return canvas.getBoundingClientRect();
	}

	/**
	 * Sets the size of the canvas to the minimum value of the width or height available.
	 * @returns {number}
	 */
	static calculateSize(sketch) {
		/*
		The width available is the whole window width because there will be no elements on the sides
		The height available is the window height, but subtracting the height of the elements on top, as
		they have to stay there and that space isn't available. (canvas top coordinate = height of the elements on top)
		*/
		return (
			Math.min(
				sketch.windowWidth,
				sketch.windowHeight -
					CanvasManager.getBoundingRect(sketch.canvas).top
			) * CanvasManager.sizeScalingFactor
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
	/** @type {number} */
	static minNodeCountForDiameter = 60;
	/** @type {number} */
	static maxNodeCountForDiameter = 300;

	/** @type {p5} */
	c;
	/** @type {number} */
	angle;
	/** @type {p5.Vector} */
	position;

	/**
	 * @param {p5}
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(c, angle) {
		this.c = c;
		this.angle = angle;

		this.position = this.c.createVector(0, 0);
	}

	static recalculateDiameter(circle) {
		Node.diameter =
			circle.diameter /
			clampNumber(
				Node.minNodeCountForDiameter,
				circle.nodeCount,
				Node.maxNodeCountForDiameter
			);
	}

	static getMaxDiameter(circle) {
		return circle.diameter / Node.minNodeCountForDiameter;
	}

	draw() {
		this.c.noStroke();
		this.c.fill(255);
		this.c.circle(this.position.x, this.position.y, Node.diameter);
	}

	recalculatePosition(circle) {
		this.position = this.c
			.createVector(Math.cos(this.angle), Math.sin(this.angle))
			.mult(circle.diameter / 2);
	}
}

export class Circle {
	/** @type {p5} */
	c;
	/** @type {{}} */
	_options;
	/** @type {p5.Color[]} */
	lineColors;

	/** @type {number} */
	strokeWeight = 2;
	/** @type {number} */
	diameter;
	/** @type {Node[]} */
	nodes;
	/** @type {p5.Color[]} */
	usedLineColors = [];

	constructor(c, options, lineColors) {
		this.c = c;
		this._options = options;
		this.lineColors = lineColors;

		this.populateNodeArray();
		this.pickUsedLineColors();
	}

	get options() {
		return this._options;
	}

	set options(newOptions) {
		const oldNodeCount = this.nodeCount;
		this._options = newOptions;

		if (oldNodeCount !== this.nodeCount) this.updateNodeCount();
	}

	get nodeCount() {
		return this.options.nodeCount;
	}

	get multNumber() {
		return this.options.multNumber;
	}

	updateNodeCount() {
		this.populateNodeArray();
		this.updateNodeProperties();
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
		this.c.noFill();
		this.c.stroke(255);
		this.c.strokeWeight(this.strokeWeight);

		this.c.ellipse(0, 0, this.diameter);

		this.drawLines();
		this.drawNodes();
	}

	recalculateDiameter() {
		this.diameter = this.c.width - this.strokeWeight;
	}

	populateNodeArray() {
		this.nodes = [];
		const angleBetweenNodes = (2 * Math.PI) / this.nodeCount;

		for (let nodeNumber = 0; nodeNumber < this.nodeCount; nodeNumber++) {
			const angle = nodeNumber * angleBetweenNodes;
			this.nodes.push(new Node(this.c, angle));
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

			const endNodeIndex = (i * this.multNumber) % this.nodeCount;
			this.drawLineBetweenNodes(
				node,
				this.nodes[endNodeIndex],
				this.usedLineColors[i]
			);
		}
	}

	drawLineBetweenNodes(startNode, endNode, color) {
		this.c.noFill();
		this.c.stroke(color);

		this.c.line(
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
