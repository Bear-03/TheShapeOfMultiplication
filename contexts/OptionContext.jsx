import { useEffect, useState, createContext } from "react";
import { deletePropertiesInArray } from "shared/scripts/util";

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
	timelinePosition: 1,
	/* version must be increased by 1 if the structure
	of the option object structure is updated.*/
	version: 0
};

// Options that won't be saved to localStorage
const unsavedOptionNames = ["timelinePosition"];

function loadOptions() {
	let savedOptions = JSON.parse(localStorage.getItem(storageKey));

	if (savedOptions !== null) {
		const optionsAreOutdated =
			savedOptions.version < defaultOptions.version;

		/* Already saved options won't be removed, they simply will never be
		loaded. If the user changes anything, they will be overwritten */
		if (optionsAreOutdated) savedOptions = null;
	}

	return savedOptions;
}

export const OptionContext = createContext();

export function OptionProvider({ children }) {
	const [options, setOptions] = useState(defaultOptions);

	useEffect(() => {
		const savedOptions = loadOptions();

		if (savedOptions !== null)
			setOptions((prevOptions) => ({
				...prevOptions,
				...savedOptions
			}));
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function updateOptions(optionName, value) {
		setOptions((prevOptions) => {
			const newOptions = { ...prevOptions, [optionName]: value };

			if (!unsavedOptionNames.includes(optionName)) {
				// Unsaved options have to be removed
				const optionsToSave = deletePropertiesInArray(
					newOptions,
					unsavedOptionNames
				);

				localStorage.setItem(storageKey, JSON.stringify(optionsToSave));
			}

			return newOptions;
		});
	}

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
