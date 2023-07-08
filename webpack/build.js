import webpack from "webpack"
import chalk from "chalk"

import config from "./config/webpack.prod"
const compiler = webpack(config);

compiler.run((error, stats) => {
	if (error) {
		console.error(error.stack || error)
		if (error.details) {
			console.error(error.details)
		}

		return null;
	}

	const info = stats.toString({
		hash: true,
		colors: true,
		version: true,
		// env: true,
		modules: true,
		entrypoints: true,
	})

	console.log(chalk.greenBright("BUILD COMPLETED"))
	console.log(info)

	if (stats?.hasError) {
		console.log(chalk.chalk.bold.red("ERROR !!!"))
		console.log(info)
	}

	if (stats?.hasWarnings) {
		console.log(chalk.hex('#FFA500')("WARNING !!!"))
		console.log(info)
	}
})