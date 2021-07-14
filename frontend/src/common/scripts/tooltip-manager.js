export class Tooltip {
	/** @type {string} */
	text;
	/** @type {number} */
	optionId;
	/** @type {Function} */
	setShownTooltipId;
	/** @type {boolean} */
	shown;

	constructor({ text, optionId, shownTooltipId, setShownTooltipId }) {
		this.text = text;
		this.optionId = optionId;
		this.setShownTooltipId = setShownTooltipId;

		this.shown = shownTooltipId === optionId;
	}

	// Arrow function is needed for autobind "this" (React doesn't do it automatically)
	/**
	 * Toggles tooltip open and close. It will handle closing other tooltips
	 * when this one is opened as well as only closing this one if it was already open
	 */
	toggleShown = () => {
		if (this.shown) this.setShownTooltipId(null);
		else this.setShownTooltipId(this.optionId);
	};
}
