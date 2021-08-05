import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "contexts/OptionContext";

import style from "./RangeNumberInput.module.scss";
import tooltipStyle from "../wrappers/TooltipWrapper.module.scss";

export default function RangeNumberInput({
	optionName,
	label,
	min,
	max,
	showTooltip,
	tooltipButtonRef
}) {
	/* value will only be updated if displayedValue is valid.
	If it isn't, displayedValue will still be updated so the input
	element shows feedback */
	const [options, updateOptions] = useContext(OptionContext);

	const optionsValue = options[optionName];
	const [displayedValue, setDisplayedValue] = useState(optionsValue);

	/* Displays all valid option changes:
		- They have loaded from localStorage
		- They are valid and have been updated in onValueIput (below) */
	useEffect(() => {
		if (optionsValue === parseInt(displayedValue)) return;

		setDisplayedValue(optionsValue);
	}, [optionsValue]); // eslint-disable-line react-hooks/exhaustive-deps

	function onValueInput(event) {
		setDisplayedValue(event.target.value);

		if (event.target.checkValidity())
			updateOptions(optionName, parseInt(event.target.value));
	}

	return (
		<div className={style.container}>
			<div className={tooltipStyle.label}>
				<span>{label}</span>
				<button
					ref={tooltipButtonRef}
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
	showTooltip: PropTypes.func
};

RangeNumberInput.defaultProps = {
	min: 1
};
