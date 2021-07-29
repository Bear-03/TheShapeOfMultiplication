import { useState } from "react";

import { MenuWrapper, menuExpandDirections } from "./wrappers/MenuWrapper";
import Nav from "./Nav";
import OptionMenu from "./option_menu/OptionMenu";

export default function Header() {
	const expandState = useState(null);

	return (
		<header>
			<MenuWrapper
				menuId={0}
				buttonText="Soon"
				expandedState={expandState}
				expandDirection={menuExpandDirections.RIGHT}
			>
				<Nav />
			</MenuWrapper>
			<h1>The Shape of Multiplication</h1>
			<MenuWrapper
				menuId={1}
				buttonText="Hi"
				expandedState={expandState}
				expandDirection={menuExpandDirections.LEFT}
			>
				<OptionMenu />
			</MenuWrapper>
		</header>
	);
}
