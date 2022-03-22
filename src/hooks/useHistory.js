import React, { useState, useEffect } from "react";

import useLocalStorage from './useLocalStorage'

import {SIZE_OF_BOARD, START_GAME} from './../consts'

export default function useHistory (key) {
	const [storedData, setDataIntoLocalStorage] = useLocalStorage(key, START_GAME)

	const [history, setHistory] = useState(storedData)
	const [currentBoard, setCurrentBoard] = useState(history.at(-1))

	const updateHistory = anotherMove => {
		if (currentBoard.board[anotherMove]) return

		let newIsXNext = !history.at(-1).isXNext
		let newBoard = history.at(-1).board.map((item, index) => index === anotherMove ? history.at(-1).isXNext ? 'X' : 'O' : item)
		let newHistory = [...history.slice(), {board: newBoard, isXNext: newIsXNext}]

		setHistory(newHistory)
		setCurrentBoard(newHistory.at(-1))
	}

	useEffect(() => setDataIntoLocalStorage('EXTENDED_TIC_TAC_TOE', history), [history])

	return {history, currentBoard, updateHistory}
}