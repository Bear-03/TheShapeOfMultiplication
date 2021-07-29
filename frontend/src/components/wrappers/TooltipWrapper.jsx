import PropTypes from "prop-types";
import { addPropsToChildren } from "../../common/scripts/util";

import style from "./TooltipWrapper.module.css";

export default function TooltipWrapper({
	optionIndex,
	text,
	shownTooltipState,
	children
}) {
	const [shownTooltip, setShownTooltip] = shownTooltipState;

	function showTooltip() {
		setShownTooltip((prevTooltip) => {
			if (prevTooltip === optionIndex) return null;
			return optionIndex;
		});
	}

	const childrenWithTooltipProps = addPropsToChildren(children, {
		showTooltip
	});

	return (
		<div
			className={`${style.container} ${
				shownTooltip === optionIndex ? style.shown : ""
			}`}
			tooltip={text}
		>
			{childrenWithTooltipProps}
		</div>
	);
}

TooltipWrapper.propTypes = {
	optionIndex: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	shownTooltipState: PropTypes.array
};
