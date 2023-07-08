import MiniCssExtractPlugin from "mini-css-extract-plugin"

const loadByStyleLoader = () => ({
	loader: "style-loader",
})

const loadByCssLoader = ({ sourceMap = false } = { sourceMap: false }) => ({
	loader: "css-loader",
	options: {
   	sourceMap, 
		modules: {
			localIdentName: "[local]"
		}
	}
})

const loadByPostCssLoader = ({ sourceMap = false } = { sourceMap: false }) => ({
	loader: "postcss-loader",
	options: {
		sourceMap
	}
})

const loadBySassLoader = () => ({
	loader: "sass-loader",
})

export const loadDevCSS = () => ({
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
					loadByStyleLoader(),
					loadByCssLoader({sourceMap: true}),
					loadByPostCssLoader({sourceMap: true}),
					loadBySassLoader()
				]
			}
		]
	}
});

export const loadProdCSS = () => ({
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					loadByCssLoader({sourceMap: false}),
					loadByPostCssLoader({sourceMap: false}),
					loadBySassLoader()
				]
			}
		]
	}
});