import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

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
	const router = useRouter();
	const asideRef = useRef();

	useEffect(() => {
		const currentAnchor = asideRef.current.querySelector(
			`[href='${router.pathname}']`
		);
		currentAnchor.classList.add(style.current);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<aside ref={asideRef} className={style.container}>
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
