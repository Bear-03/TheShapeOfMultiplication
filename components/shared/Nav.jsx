import PropTypes from "prop-types";
import Link from "next/link";

import { MenuWrapper, menuExpandDirections } from "./wrappers/MenuWrapper";

import style from "./Nav.module.css";

export default function Nav({ expanded, onExpand }) {
	return (
		<MenuWrapper
			buttonData={{
				image: "/burger_menu.svg",
				alt: "Nav Menu"
			}}
			expanded={expanded}
			onExpand={onExpand}
			expandDirection={menuExpandDirections.RIGHT}
		>
			<NavAside />
		</MenuWrapper>
	);
}

function NavAside() {
	return (
		<aside className={style.container}>
			<Link href="/">
				<a>Home</a>
			</Link>
			<Link href="/how-it-works">
				<a>How It Works</a>
			</Link>
		</aside>
	);
}

Nav.propTypes = {
	expanded: PropTypes.bool,
	onExpand: PropTypes.func
};
