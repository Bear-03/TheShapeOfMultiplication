import React from "react";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.css";

export default function PaletteContainer({ palettes }) {
	return (
		<label className={style.label}>
			<p>Palettes</p>
			<ul className={style.paletteUl}>
				{palettes.map((palette, i) => (
					<PaletteItem key={i} id={i} palette={palette} />
				))}
			</ul>
		</label>
	);
}
