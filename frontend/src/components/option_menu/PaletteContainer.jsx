import React from "react";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.css";

export default function PaletteContainer({ palettes, tooltip }) {
	return (
		<div
			className={`${style.label} ${
				tooltip.shown ? "tooltip--shown" : ""
			}`}
			tooltip-text={tooltip.text}
		>
			<span>Palettes</span>
			<button className="tooltip__button" onClick={tooltip.toggleShown}>
				?
			</button>
			<ul className={style.paletteUl}>
				{palettes.map((palette, i) => (
					<PaletteItem key={i} index={i} palette={palette} />
				))}
			</ul>
		</div>
	);
}
