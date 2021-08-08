import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

import Header from "components/index/Header";
import Loader from "components/index/sketch/Loader";

import { OptionProvider } from "contexts/OptionContext";
import { RequestProvider } from "contexts/RequestContext";

const DynamicSketch = dynamic(() => import("components/index/sketch/Sketch"), {
	ssr: false,
	loading: function LoaderComponent() {
		return <Loader />;
	}
});

const description =
	"Visualize the patterns within multiplication that emerge from a simple set of rules";

export default function HomePage() {
	return (
		<>
			<NextSeo
				description={description}
				openGraph={{
					title: "The Shape of Multipliation",
					description: { description }
				}}
			/>
			<RequestProvider>
				<OptionProvider>
					<Header />
					<DynamicSketch />
				</OptionProvider>
			</RequestProvider>
		</>
	);
}
