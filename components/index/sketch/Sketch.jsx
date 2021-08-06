import { useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useUpdateEffect } from "hooks";

import { OptionContext } from "contexts/OptionContext";
import { RequestContext } from "contexts/RequestContext";

import style from "./Sketch.module.scss";
import { createSketch } from "sketch";

export default function Sketch() {
	const [options] = useContext(OptionContext);
	const [, setRequestTriggers] = useContext(RequestContext);

	const router = useRouter();
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

	useUpdateEffect(() => {
		// Recalculates component sizes after a route change
		if (sketch.current !== undefined) sketch.windowResized();
	}, [router.pathname]);

	return <div ref={containerRef} className={style.container}></div>;
}
