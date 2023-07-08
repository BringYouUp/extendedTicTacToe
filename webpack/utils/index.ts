exports.getAppropriateFilename = isDevelopment => ext => (
	isDevelopment
		? `[name].${ext}`
		: `[name].[contenthash].${ext}`
)
