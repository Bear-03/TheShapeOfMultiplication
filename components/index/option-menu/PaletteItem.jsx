import { useRef, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "contexts/OptionContext";

import style from "./PaletteItem.module.scss";

export default function PaletteItem({ index, palette }) {
	const [options, updateOptions] = useContext(OptionContext);
	const [hasScrollbar, setHasScrollbar] = useState(false);
	const container = useRef();

	const isSelected = options.selectedPalette === index;

	useEffect(() => {
		const elementOverflows =
			container.current.scrollWidth > container.current.clientWidth;

		setHasScrollbar(elementOverflows);

		// Update when the "seen width" of PaletteItem <ul> changes
	}, [container?.current?.clientWidth]);

	function onPaletteSelect() {
		updateOptions("selectedPalette", index);
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
