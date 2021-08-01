import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import { useWindowResize } from "../../hooks";

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
	buttonData,
	expandedState,
	expandDirection,
	children
}) {
	const [expandedMenu, toggleSwitchExpandedMenu] = expandedState;
	const [headerHeight, setHeaderHeight] = useState();
	const menuWrapperRef = useRef();

	const handleExpand = () => toggleSwitchExpandedMenu(menuIndex);

	useWindowResize(() => {
		setHeaderHeight(menuWrapperRef.current.parentElement.offsetHeight);
	});

	return (
		<div
			ref={menuWrapperRef}
			className={`${style.container} ${style[expandDirection]} ${
				expandedMenu === menuIndex ? style.expanded : ""
			}`}
			style={{
				"--header-height": headerHeight + "px"
			}}
		>
			<button onClick={handleExpand}>
				<Image
					src={buttonData.image}
					alt={buttonData.alt}
					height={40}
					width={40}
				/>
			</button>
			{children}
		</div>
	);
}

MenuWrapper.propTypes = {
	menuIndex: PropTypes.number,
	expandedState: PropTypes.array,
	expandDirection: PropTypes.oneOf(Object.values(menuExpandDirections))
};
