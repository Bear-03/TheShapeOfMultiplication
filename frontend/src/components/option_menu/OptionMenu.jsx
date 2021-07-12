import { useState, useEffect, useContext } from "react";
import { useToggleState } from "../../hooks";
import { OptionContext } from "../../contexts/OptionContext";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./PaletteContainer";

const localStorageKey = "optionMenu";

export default function OptionMenu() {
	const [options, updateOptions] = useContext(OptionContext);
	const [optionsAreLoaded, setOptionsAreLoaded] = useState(false);
	const [menuExpanded, toggleMenuExpanded] = useToggleState(false);

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
		<div
			className={`${
				menuExpanded ? "menu--expanded" : ""
			} menu menu--expand-left`}
		>
			<button onClick={toggleMenuExpanded}>Hi</button>
			{optionsAreLoaded ? (
				<aside>
					<RangeNumberInput
						optionName="multNumber"
						label="Multiplication number"
						max={100}
						defaultValue={options.multNumber}
						tooltip={
							"Number by which the node index will be multiplied. " +
							"e.g. With multNumber = 3, node no. 2 would be linked to node no. 6 because 2 x 3 = 6."
						}
					/>
					<RangeNumberInput
						optionName="nodeCount"
						label="Number of nodes"
						max={options.maxNodeCount}
						defaultValue={options.nodeCount}
						tooltip="Number of nodes the circle has."
					/>
					<PaletteContainer
						palettes={options.palettes}
						tooltip={
							"Color palette for the lines. The lines will use colors in order (first color " +
							"for the first line, last color for the last line, etc.), creating a gradient."
						}
					/>
				</aside>
			) : null}
		</div>
	);
}
