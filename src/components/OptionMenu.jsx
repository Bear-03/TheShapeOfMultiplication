import RangeNumberInput from "./RangeNumberInput";
import { expandMenu } from "./scripts/menu";

import "./styles/menu.css";

export default function OptionMenu() {
	return (
		<div className="menu menu--expand-left">
			<button onClick={expandMenu}>Hi</button>
			<aside>
				<RangeNumberInput
					label="Multiplication number"
					max={100}
					defaultValue={2}
				/>
				<RangeNumberInput
					label="Number of nodes"
					max={700}
					defaultValue={10}
				/>
			</aside>
		</div>
	);
}
