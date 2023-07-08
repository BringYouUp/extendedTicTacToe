import {SIZE_OF_BOARD, WIN_STREAK} from '@/consts'

const isValidToRight = startPoint => ![0, 1, 2, 3].includes((startPoint + WIN_STREAK - 1) % SIZE_OF_BOARD)

const isValidToDown = startPoint => startPoint + (WIN_STREAK - 1) * SIZE_OF_BOARD < SIZE_OF_BOARD ** 2

const isValidToDiagonal = (startPoint, diagonal) => {
	const arr = new Array(SIZE_OF_BOARD).fill(null).map((item, index) => index)

	const finalValue = startPoint + (WIN_STREAK - 1) * (SIZE_OF_BOARD + diagonal)
	
	const forbiddenCells = diagonal > 0 ? arr.slice(0, WIN_STREAK - 1) : arr.slice(- WIN_STREAK + 1)

	if (!forbiddenCells.includes(finalValue % SIZE_OF_BOARD) && finalValue < SIZE_OF_BOARD ** 2) return true
}

export { isValidToRight, isValidToDown, isValidToDiagonal }