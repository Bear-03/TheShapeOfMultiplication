import { useToggleSwitchState } from "../hooks";

import { MenuWrapper, menuExpandDirections } from "./wrappers/MenuWrapper";
import Nav from "./Nav";
import OptionMenu from "./option_menu/OptionMenu";

import burgerMenuIcon from "../assets/burger_menu.svg";
import cogIcon from "../assets/cog.svg";

export default function Header() {
	const expandState = useToggleSwitchState(null);

	return (
		<header>
			<MenuWrapper
				menuIndex={0}
				buttonData={{
					image: burgerMenuIcon,
					alt: "Nav Menu"
				}}
				expandedState={expandState}
				expandDirection={menuExpandDirections.RIGHT}
			>
				<Nav />
			</MenuWrapper>
			<h1>The Shape of Multiplication</h1>
			<MenuWrapper
				menuIndex={1}
				buttonData={{
					image: cogIcon,
					alt: "Options Menu"
				}}
				expandedState={expandState}
				expandDirection={menuExpandDirections.LEFT}
			>
				<OptionMenu />
			</MenuWrapper>
		</header>
	);
}
