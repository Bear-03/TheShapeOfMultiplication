import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { useEvent } from "hooks";
import { addPropsToChildren } from "shared/scripts/util";

import style from "./TooltipWrapper.module.scss";

export default function TooltipWrapper({ text, shown, onShow, children }) {
	const tooltipButtonRef = useRef();
	const [tooltipButtonPosition, setTooltipButtonPosition] = useState({
		horizontalCenter: undefined,
		bottom: undefined
	});

	const childrenWithTooltipProps = addPropsToChildren(children, {
		showTooltip: onShow,
		tooltipButtonRef
	});

	useEvent("resize", true, () => {
		const button = tooltipButtonRef.current;

		const horizontalCenter = button.offsetLeft + button.offsetWidth / 2;
		const bottom = button.offsetTop + button.offsetHeight;

		// Middle of the element. Coordinates relative to the parent
		setTooltipButtonPosition({ horizontalCenter, bottom });
	});

	return (
		<div
			className={`${style.container} ${shown ? style.shown : ""}`}
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
	text: PropTypes.string.isRequired,
	shown: PropTypes.bool.isRequired,
	onShow: PropTypes.func.isRequired
};
