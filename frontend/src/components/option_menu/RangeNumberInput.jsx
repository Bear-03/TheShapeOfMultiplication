import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./RangeNumberInput.module.css";

export default function RangeNumberInput({
	optionName,
	label,
	min,
	max,
	defaultValue
}) {
	/* value will only be updated if displayedValue is valid.
	If it isn't, displayedValue will still be updated so the input
	element shows feedback */
	const [displayedValue, setDisplayedValue] = useState(defaultValue);
	const [, updateOptions] = useContext(OptionContext);

	function onValueInput(event) {
		setDisplayedValue(event.target.value);

		if (event.target.checkValidity())
			updateOptions({ [optionName]: parseInt(event.target.value) });
	}

	return (
		<label className={style.container}>
			<span>{label}</span>
			<input
				type="range"
				min={min}
				max={max}
				value={displayedValue}
				onChange={onValueInput}
			/>
			<input
				required
				type="number"
				min={min}
				max={max}
				value={displayedValue}
				onChange={onValueInput}
			/>
		</label>
	);
}

RangeNumberInput.propTypes = {
	label: PropTypes.string.isRequired,
	min: PropTypes.number,
	max: PropTypes.number.isRequired,
	defaultValue: PropTypes.number.isRequired
};

RangeNumberInput.defaultProps = {
	min: 1
};
