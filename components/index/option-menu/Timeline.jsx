import { useContext } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "contexts/OptionContext";

import style from "./Timeline.module.scss";
import tooltipStyle from "../wrappers/TooltipWrapper.module.scss";

export default function Timeline({ showTooltip, tooltipButtonRef }) {
	const [options, updateOptions] = useContext(OptionContext);

	function onValueInput(event) {
		updateOptions({ timelinePosition: parseFloat(event.target.value) });
	}

	return (
		<div className={style.container}>
			<div className={`${style.label} ${tooltipStyle.label}`}>
				<label htmlFor="timelineController">Timeline</label>
				<button ref={tooltipButtonRef} onClick={showTooltip}>
					Timeline tooltip
				</button>
			</div>
			<input
				type="range"
				id="timelineController"
				min={0}
				max={1}
				step={0.001}
				value={options.timelinePosition}
				onChange={onValueInput}
			/>
		</div>
	);
}

Timeline.propTypes = {
	showTooltip: PropTypes.func
};
