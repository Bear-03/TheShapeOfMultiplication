import React from "react";
import { useStateObject } from "../hooks";

export const OptionContext = React.createContext();

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

export function OptionProvider({ children }) {
	const [options, updateOptions] = useStateObject(defaultOptions);

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
