import { useState, useEffect, useContext } from "react";

import { OptionContext } from "contexts/OptionContext";
import { useToggleSwitchState } from "hooks";

import {
	MenuWrapper,
	menuExpandDirections
} from "components/shared/wrappers/MenuWrapper";
import TooltipWrapper from "../wrappers/TooltipWrapper";
import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./PaletteContainer";

import style from "./OptionMenu.module.css";

const localStorageKey = "optionMenu";

export default function OptionMenu({ expanded, onExpand }) {
	return (
		<MenuWrapper
			buttonData={{
				image: "/cog.svg",
				alt: "Options Menu"
			}}
			expanded={expanded}
			onExpand={onExpand}
			expandDirection={menuExpandDirections.LEFT}
		>
			<OptionMenuAside />
		</MenuWrapper>
	);
}

function OptionMenuAside() {
	const [options, updateOptions] = useContext(OptionContext);
	const [optionsAreLoaded, setOptionsAreLoaded] = useState(false);
	/* Options will use IDs starting from 0 that will identify
	which tooltip is open. null = no tooltip shown */
	const shownTooltipState = useToggleSwitchState(null);

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

	return optionsAreLoaded ? (
		<aside className={style.container}>
			<TooltipWrapper
				optionIndex={0}
				text={
					"Number by which the node index will be multiplied. " +
					"e.g. With multNumber = 3, node no. 2 would be linked to node no. 6 because 2 x 3 = 6."
				}
				shownTooltipState={shownTooltipState}
			>
				<RangeNumberInput
					optionName="multNumber"
					label="Multiplication number"
					max={100}
					value={options.multNumber}
				/>
			</TooltipWrapper>
			<TooltipWrapper
				optionIndex={1}
				text="Number of nodes the circle has."
				shownTooltipState={shownTooltipState}
			>
				<RangeNumberInput
					optionName="nodeCount"
					label="Number of nodes"
					max={options.maxNodeCount}
					value={options.nodeCount}
				/>
			</TooltipWrapper>
			<TooltipWrapper
				optionIndex={2}
				text={
					"Color palette for the lines. The lines will use colors in order (first color " +
					"for the first line, last color for the last line, etc.), creating a gradient."
				}
				shownTooltipState={shownTooltipState}
			>
				<PaletteContainer palettes={options.palettes} />
			</TooltipWrapper>
		</aside>
	) : null;
}
