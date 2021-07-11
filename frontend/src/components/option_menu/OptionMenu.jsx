import { useState, useEffect, useContext } from "react";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./OptionMenu.module.css";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./palettes/PaletteContainer";

import "../common/styles/menu.css";
import { expandMenu } from "../common/scripts/menu";

const localStorageKey = "optionMenu";

export default function OptionMenu() {
	const [options, updateOptions] = useContext(OptionContext);
	const [optionsAreLoaded, setOptionsAreLoaded] = useState(false);

	useEffect(() => {
		const storedOptions = JSON.parse(localStorage.getItem(localStorageKey));
		if (storedOptions !== null) updateOptions(storedOptions);
		setOptionsAreLoaded(true);
	}, []);

	useEffect(() => {
		/* Avoids re-saving the options when they are first loaded, as the
		options object would be updated and this useEffect would be called */
		if (!optionsAreLoaded) return;

		localStorage.setItem(localStorageKey, JSON.stringify(options));
	}, [options]);

	return (
		<div className={`${style.container} menu menu--expand-left`}>
			<button onClick={expandMenu}>Hi</button>
			{optionsAreLoaded ? (
				<aside>
					<RangeNumberInput
						optionName="multNumber"
						label="Multiplication number"
						max={100}
						defaultValue={options.multNumber}
					/>
					<RangeNumberInput
						optionName="nodeCount"
						label="Number of nodes"
						max={options.maxNodeCount}
						defaultValue={options.nodeCount}
					/>
					<PaletteContainer palettes={options.palettes} />
				</aside>
			) : null}
		</div>
	);
}
