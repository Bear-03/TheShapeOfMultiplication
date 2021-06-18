import p5 from "p5";

export class CustomCanvas extends p5 {
	constructor(...args) {
		super(...args);
		this.sizeScalingFactor = 0.95;
	}

	get centerPoint() {
		return this.createVector(this.width / 2, this.height / 2);
	}

	/**
	 * Gets the size of the smaller side of the canvas (width or height)
	 */
	get vmin() {
		return Math.min(this.windowWidth, this.windowHeight);
	}

	get boundingRect() {
		return document.querySelector("canvas").getBoundingClientRect();
	}

	calculateSize() {


		return Math.min(this.windowWidth, this.windowHeight - this.boundingRect.top) * this.sizeScalingFactor;
	}

	updateDraw() {
		const canvasSize = this.calculateSize();
		this.resizeCanvas(canvasSize, canvasSize);
		this.clear();
	}
}

export class Circle {
	/**
	 * @param {CustomCanvas} s
	 */
	constructor(s) {
		this.s = s;
		this.strokeWeight = 2;
	}

	get radius() {
		return Math.max(this.s.width, this.s.height) - this.strokeWeight;
	}

	/**
	 * Draws the circle and all its components
	 * @param {number} numberCount number of circles mapped to a number
	 */
	draw(numberCount) {
		this.s.noFill();
		this.s.stroke(255);
		this.s.strokeWeight(this.strokeWeight);
		this.s.circle(this.s.centerPoint.x, this.s.centerPoint.y, this.radius);

		this.drawNumberCircles(numberCount);
	}
}
