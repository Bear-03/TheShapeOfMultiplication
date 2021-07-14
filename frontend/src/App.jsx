import "./common/styles/menu.css";
import "./common/styles/tooltip.css";

import "./App.css";

import React from "react";
import Header from "./components/Header";
import { OptionProvider } from "./contexts/OptionContext";

const Sketch = React.lazy(() => import("./components/Sketch"));

export default function App() {
	return (
		<OptionProvider>
			<Header />
			<React.Suspense fallback={<p>Loading...</p>}>
				<Sketch />
			</React.Suspense>
		</OptionProvider>
	);
}
