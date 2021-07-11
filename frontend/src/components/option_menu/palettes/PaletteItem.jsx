import React, { useRef, useEffect, useContext } from "react";
import { OptionContext } from "../../../contexts/OptionContext";

import style from "./PaletteItem.module.css";

export default function PaletteItem({ index, palette }) {
	const [options, updateOptions] = useContext(OptionContext);
	const container = useRef();
	const hasScrollbar = useRef(false);

	const isSelected = options.selectedPalette === index;

	function onPaletteSelect() {
		updateOptions({ selectedPalette: index });
	}

	useEffect(() => {
		hasScrollbar.current =
			container.current.scrollWidth > container.current.clientWidth;
	}, []);

	return (
		<li className={`${style.outerLi} ${isSelected ? style.selected : ""}`}>
			<ul
				ref={container}
				className={`${style.container} ${
					hasScrollbar.current ? style.scrollable : ""
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
