import React, { useRef, useEffect, useContext } from "react";
import { OptionContext } from "../../../contexts/OptionContext";

import style from "./PaletteItem.module.css";

export default function PaletteItem({ id, palette }) {
	const [, updateOptions] = useContext(OptionContext);
	const container = useRef();
	const hasScrollbar = useRef(false);

	function onPaletteSelect() {
		updateOptions({ selectedPalette: id });
	}

	useEffect(() => {
		hasScrollbar.current =
			container.current.scrollWidth > container.current.clientWidth;
	}, []);

	return (
		<li className={style.outerLi}>
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
