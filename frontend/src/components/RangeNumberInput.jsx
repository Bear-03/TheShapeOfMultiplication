import { useState } from "react";
import PropTypes from "prop-types";

import style from "./RangeNumberInput.module.css";

export default function RangeNumberInput({ label, min, max, defaultValue }) {
	const [displayedValue, setDisplayedValue] = useState(defaultValue);
	let value = defaultValue; // Will be used later on for the sketch

	function onValueInput(event) {
		setDisplayedValue(event.target.value);

		if (event.target.checkValidity()) value = displayedValue;
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
