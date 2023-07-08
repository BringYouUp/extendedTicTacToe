import { getAppropriateFilename } from "../utils/index"

export const loadFonts = () => ({
	module: {
		rules: [
			{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
					filename: `fonts/${getAppropriateFilename({ isAsset: true })()}`
				}
      },
		]
	},
});

export const loadImages = () => ({
	module: {
		rules: [
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: /node_modules/,
				type: "asset/resource",
				generator: {
					filename: `img/${getAppropriateFilename({ isAsset: true })()}`
				}
			},
		]
	},
});