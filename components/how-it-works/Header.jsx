import Link from "next/link";
import { useToggleState } from "hooks";
import Nav from "../shared/nav/Nav";

import headerTextStyle from "shared/styles/header-text.module.css";

export default function Header() {
	const [expanded, toggleExpanded] = useToggleState(false);

	return (
		<header className={headerTextStyle.container}>
			<Nav expanded={expanded} onExpand={toggleExpanded} />
			<div className={headerTextStyle.textWrapper}>
				<h1>How It Works</h1>
				<Link href="/">
					<a>Go back</a>
				</Link>
			</div>
		</header>
	);
}
