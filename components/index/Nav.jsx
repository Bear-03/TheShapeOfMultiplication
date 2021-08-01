import Link from "next/link";

import style from "./Nav.module.css";

export default function Nav() {
	return (
		<aside className={style.container}>
			<Link href="/how-it-works">
				<a>How It Works</a>
			</Link>
		</aside>
	);
}
