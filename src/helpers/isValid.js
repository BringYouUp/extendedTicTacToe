const isValidToRight = (startPoint, SIZE_OF_BOARD) => ![0, 1, 2, 3].includes((startPoint + 4) % SIZE_OF_BOARD)

const isValidToDown = (startPoint, SIZE_OF_BOARD) => startPoint + 4 * SIZE_OF_BOARD < SIZE_OF_BOARD ** 2

const isValidToDiagonal = (startPoint, SIZE_OF_BOARD, diagonal) => {
	const arr = new Array(SIZE_OF_BOARD).fill(null).map((item, index) => index)
	const finalValue = startPoint + 4 * (SIZE_OF_BOARD + diagonal)
	const forbiddenCells = diagonal > 0 ? arr.slice(0, 4) : arr.slice(-4)

	if (!forbiddenCells.includes(finalValue % SIZE_OF_BOARD) && finalValue < SIZE_OF_BOARD ** 2) return true
}

export {isValidToRight, isValidToDown, isValidToDiagonal}