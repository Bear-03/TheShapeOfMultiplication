import { NextSeo } from "next-seo";

import Header from "components/how-it-works/Header";
import Explanation from "components/how-it-works/Explanation";

export default function HomePage() {
	return (
		<>
			<NextSeo
				title="How It Works"
				description="Explanation on how the page works"
			/>
			<Header />
			<Explanation />
		</>
	);
}
