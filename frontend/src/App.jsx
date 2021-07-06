import "./App.css";

import Header from "./components/Header";
import Sketch from "./components/Sketch";
import { OptionMenuProvider } from "./contexts/OptionMenuContext";

export default function App() {
	return (
		<OptionMenuProvider>
			<Header />
			<Sketch />
		</OptionMenuProvider>
	);
}
