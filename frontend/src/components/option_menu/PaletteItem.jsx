import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./PaletteItem.module.css";

export default function PaletteItem({ index, palette }) {
	const [options, updateOptions] = useContext(OptionContext);
	const [hasScrollbar, setHasScrollbar] = useState(false);
	const container = useRef();

	const isSelected = options.selectedPalette === index;

	useEffect(() => {
		function checkOverflow() {
			const elementOverflows =
				container.current.scrollWidth > container.current.clientWidth;

			setHasScrollbar(elementOverflows);
		}

		checkOverflow();
		/* useEffect only runs when the component is re-rendered, but
		this check has to be run every time the window resizes */
		window.addEventListener("resize", checkOverflow);
	}, []);

	function onPaletteSelect() {
		updateOptions({ selectedPalette: index });
	}

	return (
		<li className={`${style.outerLi} ${isSelected ? style.selected : ""}`}>
			<ul
				ref={container}
				className={`${style.container} ${
					hasScrollbar ? style.scrollable : ""
				}`}
				onClick={onPaletteSelect}
			>
				{palette.map((color, i) => (
					<li
						key={i}
						className={style.color}
						style={{ "--color": color }}
					></li>
				))}
			</ul>
		</li>
	);
}

PaletteItem.propTypes = {
	index: PropTypes.number.isRequired,
	palette: PropTypes.arrayOf(PropTypes.string).isRequired
};
