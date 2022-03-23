import React, { useState, useEffect } from "react";

import {SIZE_OF_BOARD} from './../consts'

export default function useWinner (currentBoard) {
	const [winner, setWinner] = useState(null)
	const [winStreak, setWinStreak] = useState([])

	useEffect(() => {
		const prevPlayer = currentBoard.isXNext ? 'O' : 'X'  

		const movesOfPrevPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])

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
	}, [currentBoard])

	return { winner, winStreak }
}

const isWinnerWithNextParams = (movesOfPrevPlayer, startPoint, step) => {
	for (let i = 1; i < 5; i++)
		if (!movesOfPrevPlayer.includes(startPoint + step * i)) 
			return false

	return true
}

const isValidToRight = (startPoint, SIZE_OF_BOARD) => ![0, 1, 2, 3].includes((startPoint + 4) % SIZE_OF_BOARD)

const isValidToDown = (startPoint, SIZE_OF_BOARD) => startPoint + 4 * SIZE_OF_BOARD < SIZE_OF_BOARD ** 2

const isValidToDiagonal = (startPoint, SIZE_OF_BOARD, diagonal) => {
	const arr = new Array(SIZE_OF_BOARD).fill(null).map((item, index) => index)
	const finalValue = startPoint + 4 * (SIZE_OF_BOARD + diagonal)
	const forbiddenCells = diagonal > 0 ? arr.slice(0, 4) : arr.slice(-4)

	if (!forbiddenCells.includes(finalValue % SIZE_OF_BOARD) && finalValue < SIZE_OF_BOARD ** 2) return true
}

