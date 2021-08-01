import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { useWindowResize } from "hooks";
import { addPropsToChildren } from "shared/scripts/util";

import style from "./TooltipWrapper.module.css";

export default function TooltipWrapper({
	optionIndex,
	text,
	shownTooltipState,
	children
}) {
	const [shownTooltip, toggleSwitchShownTooltip] = shownTooltipState;
	const tooltipButtonRef = useRef();
	const [tooltipButtonPosition, SetTooltipButtonPosition] = useState({
		horizontalCenter: undefined,
		bottom: undefined
	});

	const showTooltip = () => toggleSwitchShownTooltip(optionIndex);

	const childrenWithTooltipProps = addPropsToChildren(children, {
		showTooltip,
		tooltipButtonRef
	});

	useWindowResize(() => {
		const button = tooltipButtonRef.current;

		const horizontalCenter = button.offsetLeft + button.offsetWidth / 2;
		const bottom = button.offsetTop + button.offsetHeight;

		// Middle of the element. Coordinates relative to the parent
		SetTooltipButtonPosition({ horizontalCenter, bottom });
	});

	return (
		<div
			className={`${style.container} ${
				shownTooltip === optionIndex ? style.shown : ""
			}`}
			style={{
				"--button-horizontal-center":
					tooltipButtonPosition.horizontalCenter + "px",
				"--button-bottom": tooltipButtonPosition.bottom + "px"
			}}
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
