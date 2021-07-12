import { useToggleState } from "../hooks";

export default function Nav() {
	const [menuExpanded, toggleMenuExpanded] = useToggleState(false);

	return (
		<nav
			className={`${
				menuExpanded ? "menu--expanded" : ""
			} menu menu--expand-right`}
		>
			<button onClick={toggleMenuExpanded}>Soon</button>
			<aside>
				<span>PLACEHOLDER_PLACEHOLDER</span>
			</aside>
		</nav>
	);
}
