export const loadJavaScript = () => ({
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
		]
	},
});