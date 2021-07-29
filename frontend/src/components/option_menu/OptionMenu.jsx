import { useState, useEffect, useContext } from "react";
import { useToggleState } from "../../hooks";
import { OptionContext } from "../../contexts/OptionContext";
import { Tooltip } from "../../common/scripts/tooltip-manager";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./PaletteContainer";

import style from "./OptionMenu.module.css";

const localStorageKey = "optionMenu";

export default function OptionMenu() {
	const [options, updateOptions] = useContext(OptionContext);
	const [optionsAreLoaded, setOptionsAreLoaded] = useState(false);
	/* Options will use IDs starting from 0 that will identify
	which tooltip is open. null = no tooltip shown */
	const [shownTooltipIndex, setShownTooltipIndex] = useState(null);
	const [menuExpanded, toggleMenuExpanded] = useToggleState(false);

	Tooltip.setStaticProperties(shownTooltipIndex, setShownTooltipIndex);

	useEffect(() => {
		const storedOptions = JSON.parse(localStorage.getItem(localStorageKey));
		if (storedOptions !== null) updateOptions(storedOptions);
		setOptionsAreLoaded(true);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		/* Avoids re-saving the options when they are first loaded, as the
		options object would be updated and this useEffect would be called */
		if (!optionsAreLoaded) return;

		localStorage.setItem(localStorageKey, JSON.stringify(options));
	}, [options]); // eslint-disable-line react-hooks/exhaustive-deps

	function expandOrClose() {
		/* Menu was expanded but is gonna be closed,
		so all tooltips should be hidden as well */
		if (menuExpanded) setShownTooltipIndex(null);
		toggleMenuExpanded();
	}

	return (
		<div
			className={`${style.container} ${
				menuExpanded ? "menu--expanded" : ""
			} menu menu--expand-left`}
		>
			<button onClick={expandOrClose}>Hi</button>
			{optionsAreLoaded ? (
				<aside>
					<RangeNumberInput
						optionName="multNumber"
						label="Multiplication number"
						max={100}
						value={options.multNumber}
						tooltip={
							new Tooltip({
								text:
									"Number by which the node index will be multiplied. " +
									"e.g. With multNumber = 3, node no. 2 would be linked to node no. 6 because 2 x 3 = 6.",
								optionIndex: 0
							})
						}
					/>
					<RangeNumberInput
						optionName="nodeCount"
						label="Number of nodes"
						max={options.maxNodeCount}
						value={options.nodeCount}
						tooltip={
							new Tooltip({
								text: "Number of nodes the circle has.",
								optionIndex: 1
							})
						}
					/>
					<PaletteContainer
						palettes={options.palettes}
						tooltip={
							new Tooltip({
								text:
									"Color palette for the lines. The lines will use colors in order (first color " +
									"for the first line, last color for the last line, etc.), creating a gradient.",
								optionIndex: 2
							})
						}
					/>
				</aside>
			) : null}
		</div>
	);
}
