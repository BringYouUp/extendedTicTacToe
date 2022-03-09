const checkForWinner = (currentBoard, isXNext) => {
	const currentPlayer = !isXNext ? 'X' : 'O'

	const currentWidthOfBoard = Math.sqrt(currentBoard.length)

	const movesOfCurrentPlayer = currentBoard.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === currentPlayer ? [...acc, indexOfCell] : acc, [])

	if (movesOfCurrentPlayer.length < 5) return

	let isWinnerThere = false

	for (let anotherMove of movesOfCurrentPlayer) {

		isWinnerThere = isWinnerThere
			|| isValidToRight(anotherMove, currentWidthOfBoard) && checkForNeighborCells(movesOfCurrentPlayer, anotherMove, 1)
			|| isValidToDown(anotherMove, currentWidthOfBoard) && checkForNeighborCells(movesOfCurrentPlayer, anotherMove, currentWidthOfBoard)
			|| isValidToDiagonal(anotherMove, currentWidthOfBoard) && checkForNeighborCells(movesOfCurrentPlayer, anotherMove, currentWidthOfBoard + 1)

		if (isWinnerThere) return "there is WINNER"
	}
}

const checkForNeighborCells = (movesOfCurrentPlayer, initValue, step) => {
	for (let i = 1; i < 5; i++)
		if (!movesOfCurrentPlayer.includes(initValue + step * i)) return false

	return true
}

const isValidToRight = (initValue, currentWidthOfBoard) => ![0, 1, 2, 3].includes((initValue + 4) % currentWidthOfBoard)

const isValidToDown = (initValue, currentWidthOfBoard) => initValue + 4 * currentWidthOfBoard < currentWidthOfBoard ** 2

const isValidToDiagonal = (initValue, currentWidthOfBoard) => {
	let finalValue = initValue + 4 * (currentWidthOfBoard + 1)
	if (![0, 1, 2, 3].includes(finalValue % currentWidthOfBoard) && finalValue < currentWidthOfBoard ** 2) return true
}

export {checkForWinner}