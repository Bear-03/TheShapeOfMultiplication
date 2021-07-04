import "./styles/menu.css";
import { expandMenu } from "./scripts/menu";

export default function Nav() {
	return (
		<nav className="menu menu--expand-right">
			<button onClick={expandMenu}>Soon</button>
			<aside>
				<span>PLACEHOLDER_PLACEHOLDER</span>
			</aside>
		</nav>
	);
}
