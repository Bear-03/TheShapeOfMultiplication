import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap"
						rel="stylesheet"
					/>

					<link
						rel="icon"
						href="/favicons/favicon-light.png"
						media="(prefers-color-scheme: no-preference)"
					/>
					<link
						rel="icon"
						href="/favicons/favicon-dark.png"
						media="(prefers-color-scheme: dark)"
					/>
					<link
						rel="icon"
						href="/favicons/favicon-light.png"
						media="(prefers-color-scheme: light)"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
