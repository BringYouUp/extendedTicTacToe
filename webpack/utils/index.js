import {
	DEVELOPMENT,
	AUTOMATIC_NAME_DELIMITER,
	MANUAL_NAME_DELIMITER,
	CHECK_FOR_APPROPRIATE_CHUNK_NAME,
	EXTRACT_BY_CAPITAL_LETTERS
} from "../webpack-consts";

const parseChunkName = chunkName => {
	return chunkName
		.match(CHECK_FOR_APPROPRIATE_CHUNK_NAME)[0]
    .split(AUTOMATIC_NAME_DELIMITER)[0]
    .match(EXTRACT_BY_CAPITAL_LETTERS)
    .map(item => item.toLowerCase())
    .join(MANUAL_NAME_DELIMITER)
}

export const getAppropriateFilename = ({
	mode = "",
	isChunk = false,
	isAsset = false,
	chunkName = ""
}) => ext => {
	if (mode === DEVELOPMENT) {
		return `[name].${ext}`
	}

	let newName = ""

	if (isChunk) {
		if (!chunkName || chunkName && !CHECK_FOR_APPROPRIATE_CHUNK_NAME.test(chunkName)) {
			newName += `chunk.[name].[chunkhash:8]`
		} else {
			const parsedName = parseChunkName(chunkName)
			newName += `chunk.${parsedName}.[chunkhash:8]`
		}
	}

	if (isAsset) {
		newName += `[name].[hash:8]`
	}

	if (!newName) {
		newName += `[name].[contenthash:8]`
	}

	if (ext) {
		return newName + `.${ext}`
	} else {
		return newName + `[ext]`
	}
}
