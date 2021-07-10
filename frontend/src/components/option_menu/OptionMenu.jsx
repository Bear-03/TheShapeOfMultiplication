import { useContext, useEffect } from "react";
import { OptionContext } from "../../contexts/OptionContext";

import style from "./OptionMenu.module.css";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./palettes/PaletteContainer";

import "../common/styles/menu.css";
import { expandMenu } from "../common/scripts/menu";

const defaultOptions = {
	multNumber: 2,
	nodeCount: 10,
	maxNodeCount: 700,
	palettes: [
		["#AFCBFF", "#254441", "#43AA8B", "#B2B09B", "#EF3054"],
		["#B9E3C6", "#59C9A5", "#D81E5B", "#23395B", "#FFFD98", "#FFFFFF"],
		["#D60270", "#9B4F96", "#0038A8"],
		["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
		["#FF76A4", "#FFFFFF", "#BF11D7", "#000000", "#303CBE"],
		["#FFFFFF"]
	],
	selectedPalette: 0
};

export default function OptionMenu() {
	const [, updateOptions] = useContext(OptionContext);

	useEffect(() => {
		/* Give priority to already set options in
		case they exist in the local storage */
		updateOptions(defaultOptions, true);
	}, []);

	return (
		<div className={`${style.container} menu menu--expand-left`}>
			<button onClick={expandMenu}>Hi</button>
			<aside>
				<RangeNumberInput
					id="multNumber"
					label="Multiplication number"
					max={100}
					defaultValue={defaultOptions.multNumber}
				/>
				<RangeNumberInput
					id="nodeCount"
					label="Number of nodes"
					max={defaultOptions.maxNodeCount}
					defaultValue={defaultOptions.nodeCount}
				/>
				<PaletteContainer palettes={defaultOptions.palettes} />
			</aside>
		</div>
	);
}
