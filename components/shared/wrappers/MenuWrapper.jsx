import { useRef, useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

import { useWindowResize } from "hooks";

import style from "./MenuWrapper.module.scss";

/**
 * Enum containing the name of the menu classes for each direction
 */
export const menuExpandDirections = Object.freeze({
	LEFT: "expandLeft",
	RIGHT: "expandRight"
});

export function MenuWrapper({
	buttonData,
	expanded,
	onExpand,
	expandDirection,
	children
}) {
	const [headerHeight, setHeaderHeight] = useState();
	const menuWrapperRef = useRef();

	useWindowResize(() => {
		setHeaderHeight(menuWrapperRef.current.parentElement.offsetHeight);
	});

	return (
		<div
			ref={menuWrapperRef}
			className={`${style.container} ${style[expandDirection]} ${
				expanded ? style.expanded : ""
			}`}
			style={{
				"--header-height": headerHeight + "px"
			}}
		>
			<button onClick={onExpand}>
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
	buttonData: PropTypes.shape({
		image: PropTypes.string,
		alt: PropTypes.string
	}),
	expanded: PropTypes.bool.isRequired,
	onExpand: PropTypes.func.isRequired,
	expandDirection: PropTypes.oneOf(Object.values(menuExpandDirections))
		.isRequired
};
