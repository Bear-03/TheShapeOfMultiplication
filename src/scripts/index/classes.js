import p5 from "p5";
import { clampNumber } from "scripts/common/util";

export class CustomCanvas extends p5 {
	constructor(...args) {
		super(...args);

		/* Number multiplied by the available length so
		the canvas has some margin */
		this.sizeScalingFactor = 0.9;
	}

	resize() {
		const canvasSize = this.calculateSize();
		this.resizeCanvas(canvasSize, canvasSize);
	}

	get vmax() {
		return Math.max(this.width, this.height);
	}

	get boundingRect() {
		return document.querySelector("canvas").getBoundingClientRect();
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
	/* Defined based on the relation between the man circle diameter
	and the node diameter, in order to make it responsive.

	i.e. The min node diameter is 0.01 * this.circle.diameter ...
	*/
	static minDiameterRelation = 0.01;
	static maxDiameterRelation = 0.03;

	/**
	 * @param {p5} s
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(s, angle) {
		this.s = s;
		this.angle = angle;
		this.position = this.s.createVector(0, 0);
	}

	draw() {
		this.s.noStroke();
		this.s.fill(255);
		this.s.circle(this.position.x, this.position.y, Node.diameter);
	}

	static recalculateDiameter() {
		Node.diameter = Circle.instance.diameter * clampNumber(this.minDiameterRelation, 1 / Circle.instance.nodeCount, this.maxDiameterRelation);
	}

	recalculatePosition() {
		this.position = this.s.createVector(Math.cos(this.angle), Math.sin(this.angle)).mult(Circle.instance.diameter / 2);
	}
}

// Singleton
export class Circle {

	/**
	 * @param {CustomCanvas} s
	 */
	constructor(s) {
		if (!Circle.instance) Circle.instance = this;
		else return Circle.instance;

		this.s = s;

		this.strokeWeight = 2;
		this.nodes = [];
		this.nodeCount = 5;

		this.diameter = 0;
	}

	get nodeCount() {
		return this._nodeCount;
	}

	set nodeCount(value) {
		this._nodeCount = value;
		this.generateNodes();
	}

	resize() {
		this.recalculateDiameter();

		/* The circle radius, and thus, the node position, will depend on
		the node diameter, so that must be calculated first */
		Node.recalculateDiameter();

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
		this.s.noFill();
		this.s.stroke(255);
		this.s.strokeWeight(this.strokeWeight);
		this.s.ellipse(0, 0, this.diameter);

		this.drawNodes();
	}

	recalculateDiameter() {
		this.diameter = this.s.vmax - this.strokeWeight;
	}

	generateNodes() {
		this.nodes = [];
		const angleBetweenNodes = 2 * Math.PI / this.nodeCount;

		for (let angleTraveled = 0; angleTraveled < 2 * Math.PI; angleTraveled += angleBetweenNodes)
			this.nodes.push(new Node(this.s, angleTraveled));
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
