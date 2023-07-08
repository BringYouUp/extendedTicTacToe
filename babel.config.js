const { DEVELOPMENT} = require('./webpack/webpack-consts.js')

module.exports = api => {
	// const env = api.env()
	// api.cache.using(() => env === DEVELOPMENT)

	api.cache.never()


	return {
		presets: [
			[ '@babel/preset-react',
				{
					runtime: "automatic"
				}
			],
			[
				"@babel/preset-env",
				{
					debug: false,
					spec: true,
					loose: false,
					useBuiltIns: "usage",
					corejs: "3",
				}
			],
			[ "@babel/preset-typescript" ]
		],
	}
}