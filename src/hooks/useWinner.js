import React, { useState, useEffect } from "react";

export default function useWinner (currentBoard) {
	const widthOfBoard = Math.sqrt(currentBoard.board.length) 
	const [winner, setWinner] = useState(null)
	const [winStreak, setWinStreak] = useState([])

	useEffect(() => {
		const prevPlayer = currentBoard.isXNext ? 'O' : 'X'  

		const movesOfPrevPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])
		if (movesOfPrevPlayer.length < 5) return

		for (let move of movesOfPrevPlayer) {
			let isWinnerThere =
				isValidToRight(move, widthOfBoard) && isWinnerWithNextParams(movesOfPrevPlayer, move, 1) ||
				isValidToDown(move, widthOfBoard) && isWinnerWithNextParams(movesOfPrevPlayer, move, widthOfBoard) ||
				isValidToDiagonal(move, widthOfBoard, 1) && isWinnerWithNextParams(movesOfPrevPlayer, move, widthOfBoard + 1) ||
				isValidToDiagonal(move, widthOfBoard, -1) && isWinnerWithNextParams(movesOfPrevPlayer, move, widthOfBoard - 1)
				
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
		if (!movesOfPrevPlayer.includes(startPoint + step * i)) return false
	return true
}

const isValidToRight = (startPoint, widthOfBoard) => ![0, 1, 2, 3].includes((startPoint + 4) % widthOfBoard)
const isValidToDown = (startPoint, widthOfBoard) => startPoint + 4 * widthOfBoard < widthOfBoard ** 2
const isValidToDiagonal = (startPoint, widthOfBoard, diagonal) => {
	const arr = new Array(widthOfBoard).fill(null).map((item, index) => index)
	const finalValue = startPoint + 4 * (widthOfBoard + diagonal)
	const forbiddenCells = diagonal > 0 ? arr.slice(0, 4) : arr.slice(-4)

	if (!forbiddenCells.includes(finalValue % widthOfBoard) && finalValue < widthOfBoard ** 2) return true
}

