import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { MenuWrapper, menuExpandDirections } from "../wrappers/MenuWrapper";

import style from "./Nav.module.css";

export default function Nav({ expanded, onExpand }) {
	return (
		<MenuWrapper
			buttonData={{
				image: "/images/burger_menu.svg",
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
			<div className={style.pages}>
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/how-it-works">
					<a>How It Works</a>
				</Link>
			</div>
			<Link href="https://github.com/Bear-03/TheShapeOfMultiplication">
				<a className={style.footer}>
					<Image
						src="/images/github.svg"
						alt="Github repository"
						height={25}
						width={25}
					/>
					<span>Made by Bear_03</span>
				</a>
			</Link>
		</aside>
	);
}

Nav.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onExpand: PropTypes.func.isRequired
};
