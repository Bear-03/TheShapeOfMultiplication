export class Tooltip {
	/** @type {string} */
	text;
	/** @type {number} */
	optionIndex;
	/** @type {Function} */
	setShownTooltipIndex;
	/** @type {boolean} */
	shown;

	constructor({
		text,
		optionIndex,
		shownTooltipIndex,
		setShownTooltipIndex
	}) {
		this.text = text;
		this.optionIndex = optionIndex;
		this.setShownTooltipIndex = setShownTooltipIndex;

		this.shown = shownTooltipIndex === optionIndex;
	}

	// Arrow function is needed for autobind "this" (React doesn't do it automatically)
	/**
	 * Toggles tooltip open and close. It will handle closing other tooltips
	 * when this one is opened as well as only closing this one if it was already open
	 */
	toggleShown = () => {
		if (this.shown) this.setShownTooltipIndex(null);
		else this.setShownTooltipIndex(this.optionIndex);
	};
}
