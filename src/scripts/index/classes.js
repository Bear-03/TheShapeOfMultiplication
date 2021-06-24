import p5 from "p5";

export class CustomCanvas extends p5 {
	constructor(...args) {
		super(...args);

		/* Number multiplied by the available length so
		the canvas has some margin */
		this.sizeScalingFactor = 0.9;

		this.canvasCreated = false;
	}

	resize() {
		const canvasSize = this.calculateSize();

		if (this.canvasCreated) this.resizeCanvas(canvasSize, canvasSize);
		else this.createCanvas(canvasSize, canvasSize);
	}

	get boundingRect() {
		return document.querySelector("canvas").getBoundingClientRect();
	}

	createCanvas(...args) {
		super.createCanvas(...args);
		this.canvasCreated = true;
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
		return Math.min(this.windowWidth, this.windowHeight - this.boundingRect.top) * this.sizeScalingFactor;
	}
}

class Node {
	static diameter = 0;

	/* The diameter of the nodes will me calculated dividing the
	circle diameter by the node count. These numbers will be used
	to clamp the dividend so the nodes don't become invisible nor huge.

	The values can be interpreted as the max and min node count that
	will be used for the calculations. i.e. nodes will never be smaller than
	the size they get with nodeCount == maxDiameter, etc.
	*/
	static minNodeCountForDiameter = 60;
	static maxNodeCountForDiameter = 200;

	/**
	 * @param {p5} c
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(c, angle) {
		this.c = c;
		this.angle = angle;

		this.position = this.c.createVector(0, 0);
	}

	static async recalculateDiameter() {
		const { clampNumber } = await import("scripts/other/util");
		Node.diameter = Circle.instance.diameter / clampNumber(Node.minNodeCountForDiameter, Circle.instance.nodeCount, Node.maxNodeCountForDiameter);
	}

	static get maxDiameter() {
		return Circle.instance.diameter / Node.minNodeCountForDiameter;
	}

	draw() {
		this.c.noStroke();
		this.c.fill(255);
		this.c.circle(this.position.x, this.position.y, Node.diameter);
	}

	recalculatePosition() {
		this.position = this.c.createVector(Math.cos(this.angle), Math.sin(this.angle)).mult(Circle.instance.diameter / 2);
	}
}

// Singleton
export class Circle {

	/**
	 * @param {CustomCanvas} c
	 */
	constructor(c) {
		if (!Circle.instance) Circle.instance = this;
		else return Circle.instance;

		this.c = c;

		this.strokeWeight = 2;
		this.diameter = 0;
		this.nodes = [];

		this.setPropertyWithElementValue("option-menu__node-count", "_nodeCount");
		this.setPropertyWithElementValue("option-menu__mult-number", "multNumber");

		this.populateNodeArray();
	}

	get nodeCount() {
		return this._nodeCount;
	}

	set nodeCount(value) {
		if (value === this.nodeCount) return;

		this._nodeCount = value;
		this.populateNodeArray();
		this.updateNodes();
	}

	async resize() {
		this.recalculateDiameter();
		this.diameter -= Node.maxDiameter;

		this.updateNodes();
	}

	/**
	 * Draws the circle and all its components
	 */
	draw() {
		this.c.noFill();
		this.c.stroke(255);
		this.c.strokeWeight(this.strokeWeight);

		this.c.ellipse(0, 0, this.diameter);

		this.drawNodes();
		this.drawLines();
	}

	recalculateDiameter() {
		this.diameter = this.c.width - this.strokeWeight;
	}

	/**
	 * Sets the value of a variable to the value of an input element.
	 * This is used to pass the default value of the <input> to the
	 * variable that it controls in order to avoid duplication and,
	 * thus, make the code easier to maintain
	 *
	 * @param {*} elementId id of the input element.
	 * @param {*} propertyName property of this object that will be set.
	 */
	setPropertyWithElementValue(elementId, propertyName) {
		/* JS doesn't allow passing by reference so the
		property has to be accessed with [] and a string */
		this[propertyName] = this._nodeCount = document.getElementById(elementId).value;
	}

	populateNodeArray() {
		this.nodes = [];
		const angleBetweenNodes = 2 * Math.PI / this.nodeCount;

		for (let angleTraveled = 0; angleTraveled < 2 * Math.PI; angleTraveled += angleBetweenNodes)
			this.nodes.push(new Node(this.c, angleTraveled));
	}

	/**
	 * Recalculates all node positions and diameter
	 */
	async updateNodes() {
		for (const node of this.nodes) node.recalculatePosition();
		await Node.recalculateDiameter();
	}

	/**
	 * Draws all the circles in the canvas
	 */
	drawNodes() {
		for (const node of this.nodes) node.draw();
	}

	drawLines() {
		// Start at node 1 because first node is 0 and 0 * anything = 0
		for (let [i, node] of this.nodes.slice(1).entries()) {
			/* i starts at 0 because a new array is created, but it is
			node number 1 */
			i++;

			const endNodeIndex = (i * this.multNumber) % this.nodeCount;
			this.drawLineBetweenNodes(node, this.nodes[endNodeIndex]);
		}
	}

	drawLineBetweenNodes(startNode, endNode) {
		this.c.noFill();
		this.c.stroke(255);

		this.c.line(startNode.position.x, startNode.position.y, endNode.position.x, endNode.position.y);
	}
}
