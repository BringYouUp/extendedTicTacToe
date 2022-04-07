import React, { useState, useEffect } from "react";

import {SIZE_OF_BOARD} from './../consts'
import {isValidToRight, isValidToDown, isValidToDiagonal} from './../helpers/isValid'

export default function useWinner (actualHistory) {
	const [winner, setWinner] = useState(null)
	const [winStreak, setWinStreak] = useState([])

	useEffect(() => {
		const prevPlayer = actualHistory.at(-1).isXNext ? 'O' : 'X'  

		const movesOfPrevPlayer = actualHistory.at(-1).board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])

		if (movesOfPrevPlayer.length < 5) {
			setWinner(null)
			setWinStreak([])
		}

		for (let move of movesOfPrevPlayer) {
			let isWinnerThere =
				isValidToRight(move, SIZE_OF_BOARD) && isWinnerWithNextParams(movesOfPrevPlayer, move, 1) ||
				isValidToDown(move, SIZE_OF_BOARD) && isWinnerWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD) ||
				isValidToDiagonal(move, SIZE_OF_BOARD, 1) && isWinnerWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD + 1) ||
				isValidToDiagonal(move, SIZE_OF_BOARD, -1) && isWinnerWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD - 1)
				
			if (isWinnerThere) {
				setWinner(prevPlayer)
				setWinStreak([])
			}
		}		
	}, [actualHistory.at(-1).board])

	return { winner, winStreak }
}

const isWinnerWithNextParams = (movesOfPrevPlayer, startPoint, step) => {
	for (let i = 1; i < 5; i++)
		if (!movesOfPrevPlayer.includes(startPoint + step * i)) 
			return false

	return true
}
