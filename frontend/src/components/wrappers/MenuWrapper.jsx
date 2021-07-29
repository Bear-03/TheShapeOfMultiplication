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
	menuId,
	buttonText,
	expandedState,
	expandDirection,
	children
}) {
	const [expandedMenu, setExpandedMenu] = expandedState;

	function openCloseMenu() {
		setExpandedMenu((prevExpandedMenu) => {
			if (prevExpandedMenu === menuId) return null;
			return menuId;
		});
	}

	return (
		<div
			className={`${style.container} ${style[expandDirection]} ${
				expandedMenu === menuId ? style.expanded : ""
			}`}
		>
			<button onClick={openCloseMenu}>{buttonText}</button>
			{children}
		</div>
	);
}

MenuWrapper.propTypes = {
	menuId: PropTypes.number,
	buttonText: PropTypes.string.isRequired,
	expandedState: PropTypes.array,
	expandDirection: PropTypes.oneOf(Object.values(menuExpandDirections))
};
