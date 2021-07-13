import React, { useRef, useState, useEffect, useContext } from "react";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./PaletteItem.module.css";

export default function PaletteItem({ index, palette }) {
	const [options, updateOptions] = useContext(OptionContext);
	const [hasScrollbar, setHasScrollbar] = useState(false);
	const container = useRef();

	const isSelected = options.selectedPalette === index;

	useEffect(() => {
		const elementOverflows =
			container.current.scrollWidth > container.current.clientWidth;

		if (elementOverflows) setHasScrollbar(true);
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
