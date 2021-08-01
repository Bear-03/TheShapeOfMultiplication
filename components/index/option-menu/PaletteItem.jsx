import { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "contexts/OptionContext";

import { useWindowResize } from "hooks";

import style from "./PaletteItem.module.css";

export default function PaletteItem({ index, palette }) {
	const [options, updateOptions] = useContext(OptionContext);
	const [hasScrollbar, setHasScrollbar] = useState(false);
	const container = useRef();

	const isSelected = options.selectedPalette === index;

	useWindowResize(() => {
		const elementOverflows =
			container.current.scrollWidth > container.current.clientWidth;

		setHasScrollbar(elementOverflows);
	});

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
