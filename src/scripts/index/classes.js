import p5 from "p5";
import { clampNumber } from "scripts/common/util";

export class CustomCanvas extends p5 {
	constructor(...args) {
		super(...args);

		/* Number multiplied by the available length so
		the canvas has some margin */
		this.sizeScalingFactor = 0.9;

		this.center = this.createVector(0, 0);
	}

	resize() {
		const canvasSize = this.calculateSize();
		this.resizeCanvas(canvasSize, canvasSize);

		this.recalculateCenter();
	}

	recalculateCenter() {
		this.center = this.createVector(this.width / 2, this.height / 2);
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
	/**
	 * @param {p5} s
	 * @param {Circle} circle main circle
	 * @param {number} angle angle between the position vector of the node and the horizontal
	 */
	constructor(s, circle, angle) {
		this.s = s;
		this.circle = circle;
		this.angle = angle;

		this.diameter = 0;

		/* Defined based on the relation between the man circle diameter
		and the node diameter, in order to make it responsive.

		i.e. The min node diameter is 0.01 * this.circle.diameter ...
		*/
		this.minDiameterRelation = 0.01;
		this.maxDiameterRelation = 0.03;
	}

	resize() {
		this.recalculateDiameter();
	}

	draw() {
		const position = this.position;

		this.s.noStroke();
		this.s.fill(255);
		this.s.circle(position.x, position.y, this.diameter);
	}

	recalculateDiameter() {
		this.diameter = this.circle.diameter * clampNumber(this.minDiameterRelation, 1 / this.circle.nodeCount, this.maxDiameterRelation);
	}

	get position() {
		return this.s.createVector(Math.cos(this.angle), Math.sin(this.angle)).mult(this.circle.diameter / 2);
	}
}

export class Circle {

	/**
	 * @param {CustomCanvas} s
	 */
	constructor(s) {
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
		this.resizeNodes();
		// Subtract the node diameter so there isn't overflow
		this.diameter -= this.nodes[0].diameter;
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
			this.nodes.push(new Node(this.s, this, angleTraveled));
	}

	resizeNodes() {
		for (const node of this.nodes)
			node.resize();
	}

	/**
	 * Draws all the circles in the
	 */
	drawNodes() {
		for (const node of this.nodes)
			node.draw();
	}
}
