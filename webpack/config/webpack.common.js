import { resolve } from 'path'
import { merge } from "webpack-merge"

import { PROJECT_ROOT, SOURCE_DIRECTORY, DEVELOPMENT, PRODUCTION, STAGE } from '../webpack-consts'
import * as modules from "../modules/index"

const webpackCommonConfig = merge(
	{
		entry: {
			app: resolve(SOURCE_DIRECTORY, "./index.tsx"),
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
			alias: {
				"@":SOURCE_DIRECTORY,
				"@assets": resolve(PROJECT_ROOT, "./src/assets/"),
				"@components": resolve(PROJECT_ROOT, "./src/components/"),
				"@consts": resolve(PROJECT_ROOT, "./src/consts/"),
				"@hooks": resolve(PROJECT_ROOT, "./src/hooks/"),
				"@pages": resolve(PROJECT_ROOT, "./src/components/pages/"),
				"@providers": resolve(PROJECT_ROOT, "./src/providers/"),
				"@reducers": resolve(PROJECT_ROOT, "./src/redux/"),
				"@services": resolve(PROJECT_ROOT, "./src/services/"),
				"@store": resolve(PROJECT_ROOT, "./src/store/"),
				"@styles": resolve(PROJECT_ROOT, "./src/styles/"),
				"@types": resolve(PROJECT_ROOT, "./src/types/"),
				"@utils": resolve(PROJECT_ROOT, "./src/utils/"),
			},
			modules: ["node_modules"]
		},
		stats: {
			children: true,
		},
	},
	modules.loadFonts(),
	modules.loadJavaScript(),
	modules.loadImages(),
	modules.connectCommonPlugins()
) 

export default webpackCommonConfig 
