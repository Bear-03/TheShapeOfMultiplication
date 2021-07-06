import React, { useState } from "react";

export const OptionMenuContext = React.createContext();

export function OptionMenuProvider({ children }) {
	const [options, setOptions] = useState({});

	return (
		<OptionMenuContext.Provider value={[options, setOptions]}>
			{children}
		</OptionMenuContext.Provider>
	);
}
