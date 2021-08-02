import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="description"
						content="The Shape of Multiplication"
					/>
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
					<link rel="icon" href="/favicon.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
