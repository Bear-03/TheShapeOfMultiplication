import React from "react";
import { useToggleState } from "../../../hooks";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.css";

export default function PaletteContainer({ palettes, tooltip }) {
	const [tooltipShown, toggleTooltipShown] = useToggleState(false);

	return (
		<label
			className={`${style.label} ${tooltipShown ? "tooltip--shown" : ""}`}
			tooltip={tooltip}
		>
			<span>Palettes</span>
			<button className="tooltip__button" onClick={toggleTooltipShown}>
				?
			</button>
			<ul className={style.paletteUl}>
				{palettes.map((palette, i) => (
					<PaletteItem key={i} index={i} palette={palette} />
				))}
			</ul>
		</label>
	);
}
