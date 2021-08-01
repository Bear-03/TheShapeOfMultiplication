import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta
						name="description"
						content="Web site created using create-react-app"
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
