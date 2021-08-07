import "shared/styles/globals.scss";

import { DefaultSeo } from "next-seo";
import Head from "next/head";

const baseTitle = "The Shape of Multiplication";

export default function App({ Component, pageProps }) {
	return (
		<>
			<DefaultSeo
				titleTemplate={`%s | ${baseTitle}`}
				defaultTitle={baseTitle}
			/>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
			</Head>
			<Component {...pageProps} />{" "}
		</>
	);
}
