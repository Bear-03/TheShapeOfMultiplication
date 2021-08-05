import PropTypes from "prop-types";

import PaletteItem from "./PaletteItem";

import style from "./PaletteContainer.module.scss";
import tooltipStyle from "../wrappers/TooltipWrapper.module.scss";

export default function PaletteContainer({
	palettes,
	showTooltip,
	tooltipButtonRef
}) {
	return (
		<div className={style.container}>
			<div className={`${style.label} ${tooltipStyle.label}`}>
				<span>Palettes</span>
				<button ref={tooltipButtonRef} onClick={showTooltip}>
					Palette picker tooltip
				</button>
			</div>
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
