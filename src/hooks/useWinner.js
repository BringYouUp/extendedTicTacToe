import React, { useState, useLayoutEffect } from "react";

const useWinner = (currentBoard, widthOfBoard) => {
	const noWinner = {winner: null, winStreak: []}
	let [winner, setWinner] = useState({winner: null, winStreak: []})

	const updateWinner = (currentBoard, widthOfBoard) => {
		const prevPlayer = currentBoard.isXNext ? 'O' : 'X'
		const currentWinner = { winner: null, winStreak: [] }

		const movesOfCurrentPlayer = currentBoard.board.reduce((acc, valueOfCell, indexOfCell) =>  valueOfCell === prevPlayer ? [...acc, indexOfCell] : acc, [])
		if (movesOfCurrentPlayer.length < 5) return setWinner(noWinner)

		for (let move of movesOfCurrentPlayer) {
			let isWinnerThere =
				isValidToRight(move, widthOfBoard) && isWinnerWithNextParams(movesOfCurrentPlayer, move, 1) ||
				isValidToDown(move, widthOfBoard) && isWinnerWithNextParams(movesOfCurrentPlayer, move, widthOfBoard) ||
				isValidToDiagonal(move, widthOfBoard, 1) && isWinnerWithNextParams(movesOfCurrentPlayer, move, widthOfBoard + 1) ||
				isValidToDiagonal(move, widthOfBoard, -1) && isWinnerWithNextParams(movesOfCurrentPlayer, move, widthOfBoard - 1)
				
			if (isWinnerThere)
				return setWinner({winner: prevPlayer, winStreak: []})
		}
		return setWinner(noWinner)
	}
	return [winner, updateWinner]
}

const isWinnerWithNextParams = (movesOfCurrentPlayer, startPoint, step) => {
	for (let i = 1; i < 5; i++)
		if (!movesOfCurrentPlayer.includes(startPoint + step * i)) return false

	return true
}

const isValidToRight = (startPoint, widthOfBoard) => ![0, 1, 2, 3].includes((startPoint + 4) % widthOfBoard)

const isValidToDown = (startPoint, widthOfBoard) => startPoint + 4 * widthOfBoard < widthOfBoard ** 2

const isValidToDiagonal = (startPoint, widthOfBoard, diagonal) => {
	let arr = new Array(widthOfBoard).fill(null).map((item, index) => index)
	let finalValue = startPoint + 4 * (widthOfBoard + diagonal)

	const forbiddenCells = diagonal > 0 ? arr.slice(0, 4) : arr.slice(-4)

	if (!forbiddenCells.includes(finalValue % widthOfBoard) && finalValue < widthOfBoard ** 2) return true
}

export default useWinner