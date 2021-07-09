import React from "react";
import { useStateObject } from "../hooks";

export const OptionContext = React.createContext();

export function OptionProvider({ children }) {
	const [options, updateOptions] = useStateObject();

	return (
		<OptionContext.Provider value={[options, updateOptions]}>
			{children}
		</OptionContext.Provider>
	);
}
