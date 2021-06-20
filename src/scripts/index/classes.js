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
	static minDiameter = 60;
	static maxDiameter = 200;

	/**
	 * @param {p5} c
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(c, angle) {
		this.c = c;
		this.angle = angle;

		this.position = this.c.createVector(0, 0);
	}

	draw() {
		this.c.noStroke();
		this.c.fill(255);
		this.c.circle(this.position.x, this.position.y, Node.diameter);
	}

	static async recalculateDiameter() {
		const { clampNumber } = await import("scripts/other/util");
		Node.diameter = Circle.instance.diameter / clampNumber(Node.minDiameter, Circle.instance.nodeCount, Node.maxDiameter);
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
		this._nodeCount = 5;
		this.populateNodeArray();
	}

	get nodeCount() {
		return this._nodeCount;
	}

	set nodeCount(value) {
		if (value === this.nodeCount) return;

		this._nodeCount = value;
		this.populateNodeArray();

		// Now nodes have different diameter and position, so the circle must be resized
		this.resize();
	}

	async resize() {
		this.recalculateDiameter();

		/* The circle radius, and thus, the node position, will depend on
		the node diameter, so that must be calculated first */
		await Node.recalculateDiameter();

		// Subtract the node diameter so there isn't overflow
		this.diameter -= Node.diameter;

		/* After the main circle and nodes have been resized,
		the position can be calculated */
		this.recalculateNodesPosition();
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
	}

	recalculateDiameter() {
		this.diameter = this.c.width - this.strokeWeight;
	}

	populateNodeArray() {
		this.nodes = [];
		const angleBetweenNodes = 2 * Math.PI / this.nodeCount;

		for (let angleTraveled = 0; angleTraveled < 2 * Math.PI; angleTraveled += angleBetweenNodes)
			this.nodes.push(new Node(this.c, angleTraveled));
	}

	recalculateNodesPosition() {
		for (const node of this.nodes) node.recalculatePosition();
	}

	/**
	 * Draws all the circles in the canvas
	 */
	drawNodes() {
		for (const node of this.nodes) node.draw();
	}
}
