import { useToggleSwitchState } from "hooks";
import dynamic from "next/dynamic";
import Link from "next/link";

import Nav from "../shared/Nav";

import headerTextStyle from "shared/styles/header-text.module.css";

const DynamicOptionMenu = dynamic(() => import("./option-menu/OptionMenu"));

export default function Header() {
	const [expandedMenu, setExpandedMenu] = useToggleSwitchState(null);

	return (
		<header className={headerTextStyle.container}>
			<Nav
				expanded={expandedMenu === 0}
				onExpand={() => setExpandedMenu(0)}
			/>
			<div className={headerTextStyle.textWrapper}>
				<h1>The Shape of Multiplication</h1>
				<Link href="/how-it-works">
					<a>How it works</a>
				</Link>
			</div>
			<DynamicOptionMenu
				expanded={expandedMenu === 1}
				onExpand={() => setExpandedMenu(1)}
			/>
		</header>
	);
}
