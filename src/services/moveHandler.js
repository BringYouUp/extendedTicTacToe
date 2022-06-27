const moveHandler = (anotherMove, currentBoard, winner, updateHistory) => {
	if (!Number.isInteger(anotherMove) || currentBoard.board[anotherMove] || winner) return

	let newIsXNext = !currentBoard.isXNext

	let newBoard = currentBoard.board.map((item, index) => index === anotherMove ? currentBoard.isXNext ? 'X' : 'O' : item)

	updateHistory(prev => [...prev, {board: newBoard, isXNext: newIsXNext}])
}

export default moveHandler
