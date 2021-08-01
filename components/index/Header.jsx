import { useToggleSwitchState } from "hooks";
import dynamic from "next/dynamic";
import Link from "next/link";

import { MenuWrapper, menuExpandDirections } from "./wrappers/MenuWrapper";
import Nav from "./Nav";

import style from "./Header.module.css";
import headerTextStyle from "shared/styles/header-text.module.css";

const DynamicOptionMenu = dynamic(() => import("./option-menu/OptionMenu"));

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
			<div
				className={`${style.textWrapper} ${headerTextStyle.container}`}
			>
				<h1>The Shape of Multiplication</h1>
				<Link href="/how-it-works">
					<a>How it works</a>
				</Link>
			</div>
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
