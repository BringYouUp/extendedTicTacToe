import path from "path"
import webpack from "webpack"
import { merge } from "webpack-merge"

import commonConfig from "./webpack.common"
import { DEVELOPMENT, PROJECT_ROOT, SOURCE_DIRECTORY, BUILD_DIRECTORY} from '../webpack-consts'
import * as modules from "../modules/index";

const webpackDevConfig = merge(
	commonConfig,
	{
		mode: DEVELOPMENT,
		target: "web",
		watchOptions: {
			ignored: /node_modules/,
		},
		devServer: {
			static: {
				directory: path.join(__dirname, "/public/"),
			},
			// static: true,
			// historyApiFallback: true,
			// open: true,
			// client: {
			// 	overlay: true,
			// },
		},
		cache: {
			type: "filesystem"
		},
		devtool: 'eval-cheap-module-source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],
	},
	modules.loadDevCSS()
 )

export default webpackDevConfig

