import { useEffect, useRef, createContext } from "react";
import { useStateObject, useUpdateEffect } from "../hooks";

const storageKey = "options";

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
	selectedPalette: 0,
	/* version must be increased by 1 if the structure
	of the option object structure is updated.*/
	version: 0
};

function loadOptions() {
	let storedOptions = JSON.parse(localStorage.getItem(storageKey));

	if (storedOptions !== null) {
		const optionsAreOutdated =
			storedOptions.version < defaultOptions.version;

		/* Already stored options won't be removed, they simply will never be
		loaded. If the user changes anything, they will be overwritten */
		if (optionsAreOutdated) storedOptions = null;
	}

	return storedOptions;
}

export const OptionContext = createContext();

export function OptionProvider({ children }) {
	const optionsHaveLoaded = useRef(false);
	const [options, updateOptions] = useStateObject(defaultOptions);

	useEffect(() => {
		const storedOptions = loadOptions();
		if (storedOptions !== null) updateOptions(storedOptions);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useUpdateEffect(() => {
		if (!optionsHaveLoaded.current) {
			optionsHaveLoaded.current = true;
			return;
		}

		localStorage.setItem(storageKey, JSON.stringify(options));
	}, [options]);

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
