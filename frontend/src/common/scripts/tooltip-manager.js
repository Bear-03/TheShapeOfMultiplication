export class Tooltip {
	/** @type {Function} */
	static setShownTooltipIndex;
	/** @type {number} */
	static shownTooltipIndex;
	/** @type {string} */
	text;
	/** @type {number} */
	optionIndex;
	/** @type {boolean} */
	shown;

	constructor({ text, optionIndex }) {
		this.text = text;
		this.optionIndex = optionIndex;

		this.shown = Tooltip.shownTooltipIndex === optionIndex;
	}

	static setStaticProperties(shownTooltipIndex, setShownTooltipIndex) {
		Tooltip.shownTooltipIndex = shownTooltipIndex;
		Tooltip.setShownTooltipIndex = setShownTooltipIndex;
	}

	// Arrow function is needed for autobind "this" (React doesn't do it automatically)
	/**
	 * Toggles tooltip open and close. It will handle closing other tooltips
	 * when this one is opened as well as only closing this one if it was already open
	 */
	toggleShown = () => {
		if (this.shown) Tooltip.setShownTooltipIndex(null);
		else Tooltip.setShownTooltipIndex(this.optionIndex);
	};
}
