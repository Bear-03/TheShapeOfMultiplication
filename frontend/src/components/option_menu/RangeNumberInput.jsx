import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./RangeNumberInput.module.css";
import tooltipStyle from "../wrappers/TooltipWrapper.module.css";

export default function RangeNumberInput({
	optionName,
	label,
	min,
	max,
	value,
	showTooltip,
	tooltipButtonRef
}) {
	/* value will only be updated if displayedValue is valid.
	If it isn't, displayedValue will still be updated so the input
	element shows feedback */
	const [displayedValue, setDisplayedValue] = useState(value);
	const [, updateOptions] = useContext(OptionContext);

	function onValueInput(event) {
		setDisplayedValue(event.target.value);

		if (event.target.checkValidity())
			updateOptions({ [optionName]: parseInt(event.target.value) });
	}

	return (
		<div className={style.container}>
			<div>
				<span>{label}</span>
				<button
					ref={tooltipButtonRef}
					className={tooltipStyle.tooltipButton}
					onClick={showTooltip}
				>{`${label} tooltip`}</button>
			</div>
			<div className={style.inputWrapper}>
				<label
					htmlFor={`${optionName}-range`}
				>{`${label}: Range input`}</label>
				<input
					type="range"
					id={`${optionName}-range`}
					min={min}
					max={max}
					value={displayedValue}
					onChange={onValueInput}
				/>
				<label
					htmlFor={`${optionName}-number`}
				>{`${label}: Number input`}</label>
				<input
					required
					type="number"
					id={`${optionName}-number`}
					min={min}
					max={max}
					value={displayedValue}
					onChange={onValueInput}
				/>
			</div>
		</div>
	);
}

RangeNumberInput.propTypes = {
	optionName: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	min: PropTypes.number,
	max: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	showTooltip: PropTypes.func
};

RangeNumberInput.defaultProps = {
	min: 1
};
