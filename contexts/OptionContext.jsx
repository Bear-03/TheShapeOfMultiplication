import { useEffect, createContext } from "react";
import { useEvent, useStateObject } from "hooks";
import { deletePropertiesInArray } from "shared/scripts/util";

const storageKey = "options";

const defaultOptions = {
	multNumber: 2,
	nodeCount: 100,
	maxNodeCount: 1000,
	palettes: [
		["#F72585", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"],
		["#820933", "#D84797", "#D2FDFF", "#3ABEFF", "#26FFE6"],
		["#FFFFFF", "#00A7E1", "#00171F", "#003459", "#007EA7"],
		["#61210F", "#EA2B1F", "#EDAE49", "#F9DF74", "#F9EDCC"],
		["#FFFFFF"]
	],
	selectedPalette: 0,
	timelinePosition: 1,
	/* version must be increased by 1 if the structure
	of the option object structure is updated.*/
	version: 0
};

// Options that won't be saved to localStorage
const unsavedOptionNames = ["maxNodeCount", "timelinePosition"];

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
	const [options, updateOptions] = useStateObject(defaultOptions);

	useEffect(() => {
		const savedOptions = loadOptions();
		if (savedOptions !== null) updateOptions(savedOptions);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEvent(
		"beforeunload",
		false,
		() => {
			const optionsToSave = deletePropertiesInArray(
				options,
				unsavedOptionNames
			);

			localStorage.setItem(storageKey, JSON.stringify(optionsToSave));
		},
		[options]
	);

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
