import React, { useState, useEffect } from "react";

import useCurrentBoard from './useCurrentBoard'

import {SIZE_OF_BOARD} from './../consts'

export default function (isGameWithBot, currentHistory) {
	const [moveOfBot, setMoveOfBot] = useState('')
	const {currentBoard} = useCurrentBoard(currentHistory)

	useEffect (() => {
		if (!isGameWithBot) return
	
		const enemyPlayer = currentBoard.isXNext ? 'O' : 'X'

		const movesOfEnemyPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === enemyPlayer ? [...acc, indexOfCell] : acc, [])
		const movesOfCurrentPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) => valueOfCell !== null && valueOfCell !== enemyPlayer ? [...acc, indexOfCell] : acc, [])

		let anotherBotMove = Math.trunc(Math.random() * Math.pow(SIZE_OF_BOARD, 2))

		while (currentBoard.board.includes(anotherBotMove))
			anotherBotMove = Math.trunc(Math.random() * Math.pow(SIZE_OF_BOARD, 2))

		setMoveOfBot(anotherBotMove)

	}, )

	return {moveOfBot}
}