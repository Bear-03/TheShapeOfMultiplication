import PropTypes from "prop-types";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.css";
import tooltipStyle from "../wrappers/TooltipWrapper.module.css";

export default function PaletteContainer({
	palettes,
	showTooltip,
	tooltipButtonRef
}) {
	return (
		<div className={style.container}>
			<span>Palettes</span>
			<button
				ref={tooltipButtonRef}
				className={tooltipStyle.tooltipButton}
				onClick={showTooltip}
			>
				Palette picker tooltip
			</button>
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
