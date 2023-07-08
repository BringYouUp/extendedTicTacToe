import { resolve } from 'path'
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import { merge } from "webpack-merge"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

import commonConfig from "./webpack.common"
import { SOURCE_DIRECTORY, BUILD_DIRECTORY, PRODUCTION, HASH_DIGEST_LENGTH } from '../webpack-consts'
import { getAppropriateFilename } from "../utils/index"
import * as modules from "../modules/index";

const webpackProdConfig = merge(
	commonConfig, 
	{
		mode: "none",
		// mode: PRODUCTION,
		entry: {
			app: resolve(SOURCE_DIRECTORY, "./index.tsx"),
			// history: resolve(SOURCE_DIRECTORY, "./components/History/index.tsx"),
		},
		output: {
			path: BUILD_DIRECTORY,
			filename: `js/${getAppropriateFilename({ mode: PRODUCTION })('js')}`,
			chunkFilename: pathData => {
        const chunkName = pathData.chunk.id;
				return `js/${getAppropriateFilename({ mode: PRODUCTION, isChunk: true, chunkName })('js')}`
			},
			hashDigestLength: HASH_DIGEST_LENGTH
		},
		target: "browserslist",
		plugins: [
			new CleanWebpackPlugin({
				verbose: true,
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: "disabled",
				openAnalyzer: false,
				generateStatsFile: true

			})
		],
		optimization : {
	  	// minimize: true,
	  	// minimizer: [ new TerserPlugin() ],
	  	emitOnErrors: true,
	  	removeEmptyChunks: true,
	  	mergeDuplicateChunks: true,
	  	removeAvailableModules: true,
	  	concatenateModules: true,
  		providedExports: true,
  		usedExports: true,
  		sideEffects: true,
  		chunkIds: "named",
      // runtimeChunk: false,
      runtimeChunk: {
	      name: (entrypoint) => `runtime~${entrypoint.name}`,
	    },
	  	splitChunks: {
	      chunks: "all",
	      minSize: 10,
	      minChunks: 1,
	      automaticNameDelimiter: "_",
				cacheGroups: {
	        reactVendor: {
	          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
	          name: 'vendor-react',
	          chunks: 'all',
						priority: -10,
						filename: `js/${getAppropriateFilename({ mode: PRODUCTION, isChunk: true })('js')}`,
	        },
	        corejsVendor: {
					  test: /[\\/]node_modules[\\/](core-js)[\\/]/,
					  name: 'vendor-corejs',
					  chunks: 'all',
						priority: -10,
						filename: `js/${getAppropriateFilename({ mode: PRODUCTION, isChunk: true })('js')}`,
					},
					vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
						filename: `js/${getAppropriateFilename({ mode: PRODUCTION, isChunk: true })('js')}`,
						priority: -10,
          },
					// default: {
					// 	minChunks: 1,
					// 	name: 'default',
					// 	priority: -200,
						// chunks: 'all',
						// reuseExistingChunk: true,
						// filename: `js/${getAppropriateFilename({ mode: PRODUCTION, isChunk: true })('js')}`,
					// }
	      },
	    },
		},
	},
	modules.loadProdCSS()
)

export default webpackProdConfig

