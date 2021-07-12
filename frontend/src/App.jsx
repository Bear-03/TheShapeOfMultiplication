import "./common/styles/menu.css";
import "./common/styles/tooltip.css";

import "./App.css";

import Header from "./components/Header";
import Sketch from "./components/Sketch";
import { OptionProvider } from "./contexts/OptionContext";

export default function App() {
	return (
		<OptionProvider>
			<Header />
			<Sketch />
		</OptionProvider>
	);
}
