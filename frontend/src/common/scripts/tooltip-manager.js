export class Tooltip {
	constructor({ text, optionId, shownTooltipId, setShownTooltipId }) {
		this.text = text;
		this.optionId = optionId;
		this.setShownTooltipId = setShownTooltipId;

		this.shown = shownTooltipId === optionId;
	}

	// Arrow function is needed for autobind "this" (React doesn't do it automatically)
	toggleShown = () => {
		if (this.shown) this.setShownTooltipId(null);
		else this.setShownTooltipId(this.optionId);
	};
}
