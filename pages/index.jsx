import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Header from "components/index/Header";
import Loader from "components/index/Loader";

import { OptionProvider } from "contexts/OptionContext";

import style from "page-styles/home.module.css";

const DynamicSketch = dynamic(() => import("components/index/Sketch"), {
	ssr: false,
	loading: function LoaderComponent() {
		return <Loader />;
	}
});

export default function HomePage() {
	useEffect(() => {
		document.body.classList.add(style.body);

		return () => document.body.classList.remove(style.body);
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
