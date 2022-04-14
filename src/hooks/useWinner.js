import React, { useState, useEffect } from "react";

import {SIZE_OF_BOARD} from './../consts'
import {isValidToRight, isValidToDown, isValidToDiagonal} from './../helpers/isValid'

export default function useWinner (actualHistory) {
	const [winner, setWinner] = useState(null)
	const [winnerStreak, setWinnerStreak] = useState([])

	useEffect(() => {
		const prevPlayer = actualHistory.at(-1).isXNext ? 'O' : 'X'  

		const movesOfPrevPlayer = actualHistory.at(-1).board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])

		if (movesOfPrevPlayer.length < 5) {
			setWinner(null)
			setWinnerStreak([])
		}

		for (let move of movesOfPrevPlayer) {
			let isWinnerThere =
				isValidToRight(move, SIZE_OF_BOARD) && winnerStreakWithNextParams(movesOfPrevPlayer, move, 1) ||
				isValidToDown(move, SIZE_OF_BOARD) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD) ||
				isValidToDiagonal(move, SIZE_OF_BOARD, 1) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD + 1) ||
				isValidToDiagonal(move, SIZE_OF_BOARD, -1) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD - 1)
				
			if (isWinnerThere) {
				setWinner(prevPlayer)
				setWinnerStreak([...isWinnerThere])
				return
			}
		}		
	}, [actualHistory.at(-1).board])

	return { winner, winnerStreak }
}

const winnerStreakWithNextParams = (movesOfPrevPlayer, startPoint, step) => {
	let winnerStreak = [startPoint]

	for (let i = 1; i < 5; i++) {
		if (!movesOfPrevPlayer.includes(startPoint + step * i)) return false
		winnerStreak.push(startPoint + step * i)
	}

	return winnerStreak
}
