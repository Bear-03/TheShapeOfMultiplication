import PropTypes from "prop-types";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.css";
import { tooltipButton } from "../wrappers/TooltipWrapper.module.css";

export default function PaletteContainer({ palettes, showTooltip }) {
	return (
		<div className={style.container}>
			<span>Palettes</span>
			<button className={tooltipButton} onClick={showTooltip} />
			<ul className={style.paletteUl}>
				{palettes.map((palette, i) => (
					<PaletteItem key={i} index={i} palette={palette} />
				))}
			</ul>
		</div>
	);
}

PaletteContainer.propTypes = {
	palettes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	tooltip: PropTypes.func
};
