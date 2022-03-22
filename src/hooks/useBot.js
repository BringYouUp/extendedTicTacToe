import React, { useState } from "react";

const useBot = (currentBoard) => {
	const widthOfBoard = Math.sqrt(currentBoard.board.length)
	const [botMove, setBot] = useState()

	function moveOfBot (currentBoard) {

		const enemyPlayer = currentBoard.isXNext ? 'O' : 'X'

		const movesOfEnemyPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === enemyPlayer ? [...acc, indexOfCell] : acc, [])
		const movesOfCurrentPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) => valueOfCell !== null && valueOfCell !== enemyPlayer ? [...acc, indexOfCell] : acc, [])

		let anotherBotMove = Math.trunc(Math.random() * Math.pow(widthOfBoard, 2))

		// while (currentBoard.board.includes(anotherBotMove))
		// 	anotherBotMove = Math.trunc(Math.random() * Math.pow(widthOfBoard, 2))
		// console.log(anotherBotMove)
		setBot(anotherBotMove)
	}
	return [botMove, moveOfBot]
}

export default useBot