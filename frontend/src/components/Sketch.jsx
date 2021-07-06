import React, { useEffect, useRef } from "react";

import style from "./Sketch.module.css";

export default function Sketch() {
	const containerRef = useRef();

	useEffect(() => {
		import("../sketch").then(
			({ createSketch }) => createSketch(700, containerRef.current) // TODO: Get maxNodeCount with react context
		);
	}, []);

	return <div ref={containerRef} className={style.container}></div>;
}
