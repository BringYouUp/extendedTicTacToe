const { resolve } = require('path')
const { path: PROJECT_ROOT } = require('app-root-path')

exports.PROJECT_ROOT = PROJECT_ROOT
exports.SOURCE_DIRECTORY = resolve(PROJECT_ROOT, './src')
exports.BUILD_DIRECTORY = resolve(PROJECT_ROOT, './build')
exports.HOST = "192.168.43.222"
exports.PORT = 9750
exports.DEVELOPMENT = "development"
exports.PRODUCTION = "production"
exports.STAGE = "stage"
exports.HASH_DIGEST_LENGTH = 8
exports.AUTOMATIC_NAME_DELIMITER = "_"
exports.MANUAL_NAME_DELIMITER = "-"
exports.CHECK_FOR_APPROPRIATE_CHUNK_NAME = /[a-zA-Z0-9]+_(tsx|jsx)$/g
exports.EXTRACT_BY_CAPITAL_LETTERS = /[A-Z][a-z0-9]+/g
