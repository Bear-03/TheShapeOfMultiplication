import { useState } from "react";
import PropTypes from "prop-types";

export default function RangeNumberInput({ label, min, max, defaultValue }) {
	const [value, setValue] = useState(defaultValue);

	function onChange(event) {
		if (!event.target.checkValidity()) return;
		setValue(parseInt(event.target.value));
	}

	return (
		<label>
			<span>{label}</span>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				onChange={onChange}
			/>
			<input
				required
				type="number"
				min={min}
				max={max}
				value={value}
				onChange={onChange}
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
