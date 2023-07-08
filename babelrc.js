module.exports = api => {
	const env = api.env();
	api.cache.using(() => env === 'development')


	api.cache.never() 

	return {

	}
}

// {
// 	presets: [
// 		[ '@babel/preset-react',
// 			{
// 				"runtime": "automatic"
// 			}
// 		],
// 		[
// 			"@babel/preset-env",
// 			{
// 				"useBuiltIns": "usage",
// 				"corejs": "3",
// 				"targets": {
// 					ie: "11"
// 				}
// 			}
// 		],
// 		[ "@babel/preset-typescript" ]
// 	],
// }