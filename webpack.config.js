const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: {
		app: path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist/'),
		filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
	},
	target: isDevelopment ? "web" : "browserslist",
	watchOptions: {
		ignored: /node_modules/,
	},
	devServer: {
		historyApiFallback: true,
		port: 8081,
		open: true,
	},
	module: {
		rules: [{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							"presets": [
								[
									'@babel/preset-react'
								],
								[
									"@babel/preset-env",
									{
										"useBuiltIns": "usage",
										"corejs": "3"
									}
								],
							],
						}
					},
				]
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:4]'
							}
						}
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader'
					},

				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: /node_modules/,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]'
				}
			}
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			favicon: "./src/img/title-icon.png",
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
		}),
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	stats: {
		children: true,
	},
}