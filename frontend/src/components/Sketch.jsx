import React, { useEffect, useRef } from "react";

import style from "./Sketch.module.css";

export default function Sketch(s) {
	const containerRef = useRef();

	useEffect(() => {
		import("../sketch/sketch").then(({ createSketch }) =>
			createSketch(700, containerRef.current)
		);
	}, []);

	return <div ref={containerRef} className={style.container}></div>;
}
