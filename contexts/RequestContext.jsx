import { createContext } from "react";
import { useStateObject } from "hooks";

export const RequestContext = createContext();

export function RequestProvider({ children }) {
	const [requestTriggers, setRequestTriggers] = useStateObject({
		requestScreenshot: () => {}
	});

	return (
		<RequestContext.Provider value={[requestTriggers, setRequestTriggers]}>
			{children}
		</RequestContext.Provider>
	);
}
