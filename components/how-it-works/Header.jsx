import Link from "next/link";

import { useToggleState } from "hooks";

import style from "./Header.module.css";
import headerTextStyle from "shared/styles/header-text.module.css";

export default function Header() {
	const expandState = useToggleState(null);

	return (
		<header className={`${style.container} ${headerTextStyle.container}`}>
			<h1>How It Works</h1>
			<Link href="/">
				<a>Go back</a>
			</Link>
		</header>
	);
}
