import "./common/styles/tooltip.css";

import "./App.css";

import React from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { OptionProvider } from "./contexts/OptionContext";

const Sketch = React.lazy(() => import("./components/Sketch"));

export default function App() {
	return (
		<OptionProvider>
			<Header />
			<React.Suspense fallback={<Loader />}>
				<Sketch />
			</React.Suspense>
		</OptionProvider>
	);
}
