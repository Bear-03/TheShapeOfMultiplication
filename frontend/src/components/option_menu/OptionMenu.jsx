import { useContext, useEffect, useRef } from "react";
import { OptionContext } from "../../contexts/OptionContext";
import { useUpdateEffect } from "../../hooks";

import style from "./OptionMenu.module.css";

import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./palettes/PaletteContainer";

import "../common/styles/menu.css";
import { expandMenu } from "../common/scripts/menu";

const localStorageKey = "optionMenu";

export default function OptionMenu() {
	const [options, updateOptions] = useContext(OptionContext);
	const optionsAreLoaded = useRef(false);

	useEffect(() => {
		const storedOptions = JSON.parse(localStorage.getItem(localStorageKey));
		if (storedOptions !== null) updateOptions(storedOptions);
	}, []);

	useUpdateEffect(() => {
		/* Avoids re-saving the options when they are first loaded, as the
		options object would be updated and this useEffect would be called */
		if (!optionsAreLoaded.current) {
			optionsAreLoaded.current = true;
			return;
		}

		localStorage.setItem(localStorageKey, JSON.stringify(options));
	}, [options]);

	return (
		<div className={`${style.container} menu menu--expand-left`}>
			<button onClick={expandMenu}>Hi</button>
			<aside>
				<RangeNumberInput
					id="multNumber"
					label="Multiplication number"
					max={100}
					defaultValue={options.multNumber}
				/>
				<RangeNumberInput
					id="nodeCount"
					label="Number of nodes"
					max={options.maxNodeCount}
					defaultValue={options.nodeCount}
				/>
				<PaletteContainer palettes={options.palettes} />
			</aside>
		</div>
	);
}
