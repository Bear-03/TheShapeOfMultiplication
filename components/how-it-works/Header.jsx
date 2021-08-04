import Link from "next/link";
import { useToggleState } from "hooks";
import Nav from "../shared/Nav";

import headerStyle from "shared/styles/header.module.css";

export default function Header() {
	const [expanded, toggleExpanded] = useToggleState(false);

	return (
		<header className={headerStyle.container}>
			<Nav expanded={expanded} onExpand={toggleExpanded} />
			<div className={headerStyle.textWrapper}>
				<h1>How It Works</h1>
				<Link href="/">
					<a>Go back</a>
				</Link>
			</div>
			{/* As there isn't another menu icon to compensate the centered
			flexbox, a dummy div is needed with the same width as the button */}
			<div style={{ width: 40, height: 40 }} />
		</header>
	);
}
