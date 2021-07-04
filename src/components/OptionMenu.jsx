import RangeNumberInput from "./RangeNumberInput";

export default function OptionMenu() {
	return (
		<div>
			<button>Hi</button>
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
