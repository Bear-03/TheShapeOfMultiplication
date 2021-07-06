import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { OptionMenuContext } from "../contexts/OptionMenuContext";

import style from "./RangeNumberInput.module.css";

export default function RangeNumberInput({
	id,
	label,
	min,
	max,
	defaultValue
}) {
	const localStorageKey = "optionMenu." + id;

	/* value will only be updated if displayedValue is valid.
	If it isn't, displayedValue will still be updated so the input
	element shows feedback */
	const [displayedValue, setDisplayedValue] = useState(defaultValue);
	const [options, setOptions] = useContext(OptionMenuContext);

	useEffect(() => {
		// Load value stored in localStorage
		const storedValue = parseInt(localStorage.getItem(localStorageKey));
		if (storedValue) setDisplayedValue(storedValue);
	}, [localStorageKey]);

	function onValueInput(event) {
		const newValue = event.target.value;
		setDisplayedValue(newValue);

		if (event.target.checkValidity()) {
			const intValue = parseInt(newValue);

			setOptions({ ...options, [id]: intValue });
			localStorage.setItem(localStorageKey, intValue);
		}
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
