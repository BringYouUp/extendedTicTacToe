import React, { useState, useEffect } from "react";

import { SIZE_OF_BOARD, WIN_STREAK } from './../consts'
import { isValidToRight, isValidToDown, isValidToDiagonal } from './../helpers/isValid'

export default function useWinner (actualHistory) {
	const [winner, setWinner] = useState(null)
	const [winnerStreak, setWinnerStreak] = useState([])

	useEffect(() => {
		const prevPlayer = actualHistory[actualHistory.length - 1].isXNext ? 'O' : 'X'  

		const movesOfPrevPlayer = actualHistory[actualHistory.length - 1].board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])

		if (movesOfPrevPlayer.length < WIN_STREAK) {
			setWinner(null)
			setWinnerStreak([])
		}

		for (let move of movesOfPrevPlayer) {
			let isWinnerThere =
				isValidToRight(move) && winnerStreakWithNextParams(movesOfPrevPlayer, move, 1) ||
				isValidToDown(move) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD) ||
				isValidToDiagonal(move, 1) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD + 1) ||
				isValidToDiagonal(move, -1) && winnerStreakWithNextParams(movesOfPrevPlayer, move, SIZE_OF_BOARD - 1)
				
			if (isWinnerThere) {
				setWinner(prevPlayer)
				setWinnerStreak([...isWinnerThere])
				return
			}
		}		
	}, [actualHistory[actualHistory.length - 1].board])

	return { winner, winnerStreak }
}

const winnerStreakWithNextParams = (movesOfPrevPlayer, startPoint, step) => {
	let winnerStreak = [startPoint]

	for (let i = 1; i < 15; i++) {
		if (!movesOfPrevPlayer.includes(startPoint + step * i)) {
			if (winnerStreak.length < WIN_STREAK) return false
			return winnerStreak
		}
		winnerStreak.push(startPoint + step * i)
	}

	return winnerStreak
}
