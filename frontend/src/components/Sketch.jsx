import React, { useEffect, useRef } from "react";

import style from "./Sketch.module.css";
import { createSketch } from "../sketch";

export default function Sketch() {
	const containerRef = useRef();

	useEffect(() => {
		const sketch = createSketch(700, containerRef.current);

		return () => {
			sketch.remove();
		};
	}, []);

	return <div ref={containerRef} className={style.container}></div>;
}
