import { useContext } from "react";
import PropTypes from "prop-types";

import { OptionContext } from "contexts/OptionContext";
import { RequestContext } from "contexts/RequestContext";

import { useToggleSwitchState } from "hooks";

import {
	MenuWrapper,
	menuExpandDirections
} from "components/shared/wrappers/MenuWrapper";
import TooltipWrapper from "../wrappers/TooltipWrapper";
import RangeNumberInput from "./RangeNumberInput";
import PaletteContainer from "./PaletteContainer";

import style from "./OptionMenu.module.css";

export default function OptionMenu({ expanded, onExpand }) {
	return (
		<MenuWrapper
			buttonData={{
				image: "/images/cog.svg",
				alt: "Options Menu"
			}}
			expanded={expanded}
			onExpand={onExpand}
			expandDirection={menuExpandDirections.LEFT}
		>
			<OptionMenuAside />
		</MenuWrapper>
	);
}

function OptionMenuAside() {
	const [options] = useContext(OptionContext);
	const [requestTriggers] = useContext(RequestContext);

	/* Options will use IDs starting from 0 that will identify
	which tooltip is open. null = no tooltip shown */
	const [shownTooltip, setShownTooltip] = useToggleSwitchState(null);

	return (
		<aside className={style.container}>
			<TooltipWrapper
				text={
					"Number by which the node index will be multiplied. " +
					"e.g. With multNumber = 3, node no. 2 would be linked to node no. 6 because 2 x 3 = 6."
				}
				shown={shownTooltip === 0}
				onShow={() => setShownTooltip(0)}
			>
				<RangeNumberInput
					optionName="multNumber"
					label="Multiplication number"
					max={100}
				/>
			</TooltipWrapper>
			<TooltipWrapper
				text="Number of nodes the circle has."
				shown={shownTooltip === 1}
				onShow={() => setShownTooltip(1)}
			>
				<RangeNumberInput
					optionName="nodeCount"
					label="Number of nodes"
					max={options.maxNodeCount}
				/>
			</TooltipWrapper>
			<div className={style.buttonContainer}>
				<button onClick={requestTriggers.requestScreenshot}>
					Take Screenshot of Canvas
				</button>
			</div>
			<TooltipWrapper
				text={
					"Color palette for the lines. The lines will use colors in order (first color " +
					"for the first line, last color for the last line, etc.), creating a gradient."
				}
				shown={shownTooltip === 2}
				onShow={() => setShownTooltip(2)}
			>
				<PaletteContainer palettes={options.palettes} />
			</TooltipWrapper>
		</aside>
	);
}

OptionMenu.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onExpand: PropTypes.func.isRequired
};
