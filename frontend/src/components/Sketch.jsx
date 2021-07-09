import React, { useRef, useContext } from "react";
import { useUpdateEffect } from "../hooks";
import { OptionContext } from "../contexts/OptionContext";

import style from "./Sketch.module.css";
import { createSketch } from "../sketch";

export default function Sketch() {
	const [options] = useContext(OptionContext);
	const containerRef = useRef();
	const onOptionChange = useRef();

	useUpdateEffect(() => {
		if (onOptionChange.current === undefined) {
			onOptionChange.current = createSketch(
				options,
				containerRef.current
			);
		} else {
			onOptionChange.current(options);
		}
	}, [options]);

	return <div ref={containerRef} className={style.container}></div>;
}
