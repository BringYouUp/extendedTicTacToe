import { resolve } from 'path'

import webpack, { DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import WebpackBar from "webpackbar"

import { PROJECT_ROOT, DEVELOPMENT, PRODUCTION, STAGE } from '../webpack-consts'
import { getAppropriateFilename } from "../utils/index"

const { NODE_ENV } = process.env

export const connectCommonPlugins = () => ({
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(PROJECT_ROOT, "index.html"),
			favicon: resolve(PROJECT_ROOT, "./src/img/title-icon.png"),
			title: 'webpack-config',
			minify: {
				collapseWhitespace: true
			},
		}),
		new DefinePlugin({
			__ENV__: JSON.stringify(NODE_ENV),
			__DEV__: NODE_ENV === DEVELOPMENT,
			__PROD__: NODE_ENV === PRODUCTION,
			_STAGE__: NODE_ENV === STAGE
		}),
    new WebpackBar({
    	profile: "true"
    }),
    new MiniCssExtractPlugin({
			filename: `css/${getAppropriateFilename({ mode: NODE_ENV })('css')}`,
			chunkFilename: `css/${getAppropriateFilename({mode: NODE_ENV, isChunk: true })('css')}`,
		}),
		new webpack.ProvidePlugin({
		  process: 'process/browser',
		  React: "react"
		})
	],
})