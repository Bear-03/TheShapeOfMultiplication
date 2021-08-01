import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Loader from "../components/Loader";

import { OptionProvider } from "../contexts/OptionContext";

import style from "../styles/home.module.css";

const DynamicSketch = dynamic(() => import("../components/Sketch"), {
	ssr: false,
	loading: function LoaderComponent() {
		return <Loader />;
	}
});

export default function HomePage() {
	useEffect(() => {
		document.body.classList.add(style.body);
	}, []);

	return (
		<>
			<Head>
				<title>The Shape of Multiplication</title>
			</Head>
			<OptionProvider>
				<Header />
				<DynamicSketch />
			</OptionProvider>
		</>
	);
}

const globalStyle = `
body {
    background-color: green !important;
}
`;
