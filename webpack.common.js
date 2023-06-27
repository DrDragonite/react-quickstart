const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');

const isProdMode = process.env.NODE_ENV != "development";

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	target: "web",
	externals: {
		'react': 'react',
		'react-dom': 'reactDOM'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "react app",
			filename: "index.html",
			favicon: "",
			minify: isProdMode,
			template: "static/index.html"
		}),
		!isProdMode && new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin()
	].filter(Boolean),
};
