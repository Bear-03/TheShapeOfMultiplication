import { useState, useEffect, useRef, useContext } from "react";
import { useToggleState } from "../../hooks";
import { OptionContext } from "../../contexts/OptionContext";
import { Tooltip } from "../../common/scripts/tooltip-manager";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./PaletteContainer";

const localStorageKey = "optionMenu";

export default function OptionMenu() {
	const optionsContainer = useRef();
	const [options, updateOptions] = useContext(OptionContext);
	const [optionsAreLoaded, setOptionsAreLoaded] = useState(false);
	const [shownTooltipId, setShownTooltipId] = useState(null);
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

	function expandOrClose() {
		if (menuExpanded) setShownTooltipId(null);
		toggleMenuExpanded();
	}

	return (
		<div
			className={`${
				menuExpanded ? "menu--expanded" : ""
			} menu menu--expand-left`}
		>
			<button onClick={expandOrClose}>Hi</button>
			{optionsAreLoaded ? (
				<aside ref={optionsContainer}>
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
								optionId: 0,
								shownTooltipId: shownTooltipId,
								setShownTooltipId: setShownTooltipId
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
								optionId: 1,
								shownTooltipId: shownTooltipId,
								setShownTooltipId: setShownTooltipId
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
								optionId: 2,
								shownTooltipId: shownTooltipId,
								setShownTooltipId: setShownTooltipId
							})
						}
					/>
				</aside>
			) : null}
		</div>
	);
}
