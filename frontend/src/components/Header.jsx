import Nav from "./Nav";
import OptionMenu from "./option_menu/OptionMenu";

export default function Header() {
	return (
		<header>
			<Nav />
			<h1>The Shape of Multiplication</h1>
			<OptionMenu />
		</header>
	);
}
