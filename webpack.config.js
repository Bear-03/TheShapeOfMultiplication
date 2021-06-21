const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");
const DynamicHtmlWebpackPlugin = require("dynamic-html-webpack-plugin");
const DeleteGhostScriptsPlugin = require("delete-ghost-scripts-plugin");

module.exports = (_, options) => {
	const devmode = options.mode === "development";
	return {
		devtool: devmode ? "inline-source-map" : false,
		// Entries for specific html files must be named as the html file.
		entry: {
			common: "styles/common.css",
			rangeNumberInput: "scripts/components/range-number-input.js",

			index: [
				"scripts/index/sketch.js",
				"scripts/index/option-menu.js",
				"styles/index/index.css",
				"styles/index/option-menu.css",
				"styles/index/sketch.css"
			],
		},
		output: {
			publicPath: "", // Start all paths from the base dir ("dist/", set by express)
			path: path.resolve(__dirname, "dist"),
			filename: `scripts/[name].bundle${!devmode ? ".[contenthash]" : ""}.js`
		},
		resolve: {
			alias: {
				pages: path.resolve(__dirname, "src/pages"),
				scripts: path.resolve(__dirname, "src/scripts"),
				styles: path.resolve(__dirname, "src/styles")
			}
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					loader: "html-loader"
				},
				{
					test: /\.css$/,
					exclude: path.resolve(__dirname, "src/styles/components"),
					loader: MiniCssExtractPlugin.loader
				},
				{
					test: /\.css$/,
					loader: "css-loader",
					options: {
						url: false,
						sourceMap: devmode
					}
				},
			]
		},
		plugins: [
			new DynamicHtmlWebpackPlugin({
				dir: "src/pages",
				additionalChunks: {
					all: "common",
					index: "rangeNumberInput"
				},
				commonOptions: {
					scriptLoading: "defer",
					cache: false,
					meta: {
						viewport: "width=device-width, initial-scale=1.0, shrink-to-fit=yes",
						copyright: "Bear_03",
						language: "English"
					}
				}
			}),
			new CleanWebpackPlugin({
				cleanOnceBeforeBuildPatterns: ["**/*", "!assets", "!assets/**/*"]
			}),
			new MiniCssExtractPlugin({
				filename: `styles/[name]${!devmode ? ".[contenthash]" : ""}.css`
			}),
			// Only executes if using the --watch flag
			new NodemonPlugin({
				script: "index.js"
			}),
			new DeleteGhostScriptsPlugin()
		],
		optimization: {
			minimize: !devmode,
			minimizer: [
				new CssMinimizerPlugin(),
				new TerserPlugin()
			],
			runtimeChunk: "single",
			splitChunks: {
				chunks: "all",
				maxSize: 244000
			}
		}
	};
};
