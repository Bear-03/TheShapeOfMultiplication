import { useEffect, createContext } from "react";
import { useStateObject, useUpdateEffect } from "../hooks";

export const OptionContext = createContext();

const defaultOptions = {
	multNumber: 2,
	nodeCount: 100,
	maxNodeCount: 700,
	palettes: [
		["#AFCBFF", "#254441", "#43AA8B", "#B2B09B", "#EF3054"],
		["#B9E3C6", "#59C9A5", "#D81E5B", "#23395B", "#FFFD98", "#FFFFFF"],
		["#D60270", "#9B4F96", "#0038A8"],
		["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
		["#FFFFFF"]
	],
	selectedPalette: 0
};

const localStorageKey = "optionMenu";

export function OptionProvider({ children }) {
	const [options, updateOptions] = useStateObject(defaultOptions);

	useEffect(() => {
		const storedOptions = JSON.parse(localStorage.getItem(localStorageKey));
		if (storedOptions !== null) updateOptions(storedOptions);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useUpdateEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(options));
	}, [options]);

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
