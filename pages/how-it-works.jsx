import Head from "next/head";

import Header from "components/how-it-works/Header";
import Explanation from "components/how-it-works/Explanation";

export default function HomePage() {
	return (
		<>
			<Head>
				<title>How It Works | The Shape of Multiplication</title>
			</Head>
			<Header />
			<Explanation />
		</>
	);
}
