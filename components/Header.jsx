import dynamic from "next/dynamic";
import { useToggleSwitchState } from "hooks";

import { MenuWrapper, menuExpandDirections } from "./wrappers/MenuWrapper";
import Nav from "./Nav";

import style from "./Header.module.css";

const DynamicOptionMenu = dynamic(() => import("./option_menu/OptionMenu"));

export default function Header() {
	const expandState = useToggleSwitchState(null);

	return (
		<header className={style.container}>
			<MenuWrapper
				menuIndex={0}
				buttonData={{
					image: "/burger_menu.svg",
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
					image: "/cog.svg",
					alt: "Options Menu"
				}}
				expandedState={expandState}
				expandDirection={menuExpandDirections.LEFT}
			>
				<DynamicOptionMenu />
			</MenuWrapper>
		</header>
	);
}
