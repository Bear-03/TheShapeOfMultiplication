import Document, { Html, Head, Main, NextScript } from "next/document";

export default class AppDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charset="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
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
