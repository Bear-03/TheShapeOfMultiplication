import React from "react";
import PropTypes from "prop-types";

import style from "./MenuWrapper.module.css";

/**
 * Enum containing the name of the menu classes for each direction
 */
export const menuExpandDirections = Object.freeze({
	LEFT: "expandLeft",
	RIGHT: "expandRight"
});

export function MenuWrapper({
	menuIndex,
	buttonText,
	expandedState,
	expandDirection,
	children
}) {
	const [expandedMenu, toggleSwitchExpandedMenu] = expandedState;

	const handleExpand = () => toggleSwitchExpandedMenu(menuIndex);

	return (
		<div
			className={`${style.container} ${style[expandDirection]} ${
				expandedMenu === menuIndex ? style.expanded : ""
			}`}
		>
			<button onClick={handleExpand}>{buttonText}</button>
			{children}
		</div>
	);
}

MenuWrapper.propTypes = {
	menuIndex: PropTypes.number,
	buttonText: PropTypes.string.isRequired,
	expandedState: PropTypes.array,
	expandDirection: PropTypes.oneOf(Object.values(menuExpandDirections))
};
