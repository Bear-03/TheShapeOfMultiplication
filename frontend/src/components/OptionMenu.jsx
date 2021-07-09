import { useContext, useEffect } from "react";
import { OptionContext } from "../contexts/OptionContext";

import RangeNumberInput from "./RangeNumberInput";

import "./common/styles/menu.css";
import { expandMenu } from "./common/scripts/menu";

export default function OptionMenu() {
	const [, updateOptions] = useContext(OptionContext);

	const defaultOptions = {
		multNumber: 2,
		nodeCount: 10,
		maxNodeCount: 700
	};

	useEffect(() => {
		updateOptions(defaultOptions, true);
	}, []);

	return (
		<div className="menu menu--expand-left">
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
			</aside>
		</div>
	);
}
