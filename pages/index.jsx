import Head from "next/head";
import dynamic from "next/dynamic";

import Header from "components/index/Header";
import Loader from "components/index/Loader";

import { OptionProvider } from "contexts/OptionContext";
import { RequestProvider } from "contexts/RequestContext";

const DynamicSketch = dynamic(() => import("components/index/Sketch"), {
	ssr: false,
	loading: function LoaderComponent() {
		return <Loader />;
	}
});

export default function HomePage() {
	return (
		<>
			<Head>
				<title>The Shape of Multiplication</title>
			</Head>
			<RequestProvider>
				<OptionProvider>
					<Header />
					<DynamicSketch />
				</OptionProvider>
			</RequestProvider>
		</>
	);
}
