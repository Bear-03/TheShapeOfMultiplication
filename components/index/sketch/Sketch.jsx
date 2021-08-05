import { useRef, useEffect, useContext } from "react";
import { OptionContext } from "contexts/OptionContext";
import { RequestContext } from "contexts/RequestContext";

import style from "./Sketch.module.scss";
import { createSketch } from "sketch";

export default function Sketch() {
	const [options] = useContext(OptionContext);
	const [, setRequestTriggers] = useContext(RequestContext);

	const containerRef = useRef();
	const sketch = useRef();

	useEffect(() => {
		if (sketch.current === undefined) {
			sketch.current = createSketch(options, containerRef.current);
			setRequestTriggers({
				requestScreenshot: sketch.current.requestScreenshot
			});
		} else {
			sketch.current.onOptionChange(options);
		}
	}, [options]); // eslint-disable-line react-hooks/exhaustive-deps

	return <div ref={containerRef} className={style.container}></div>;
}
